import { create } from 'zustand'
import {
    WalletProvider,
    StellarNetwork,
    ConnectionStatus,
    WalletAccount,
} from '@/lib/wallet/types'
import { DEFAULT_NETWORK } from '@/lib/wallet/network'
import { getAdapter } from '@/lib/wallet/registry'
import { saveSession, loadSession, clearSession } from '@/lib/wallet/session'

// ── Store Interface ──────────────────────────────────────────────────────────

interface WalletState {
    // Connection state
    status: ConnectionStatus
    provider: WalletProvider | null
    publicKey: string | null
    network: StellarNetwork
    error: string | null

    // Multi-account support
    accounts: WalletAccount[]

    // Actions
    connect: (provider: WalletProvider) => Promise<void>
    disconnect: () => Promise<void>
    switchAccount: (publicKey: string) => void
    switchNetwork: (network: StellarNetwork) => void
    setError: (error: string) => void
    clearError: () => void

    // Auto-reconnect from persisted session
    restoreSession: () => Promise<void>
}

// ── Store ────────────────────────────────────────────────────────────────────

export const useWalletStore = create<WalletState>((set, get) => ({
    status: 'disconnected',
    provider: null,
    publicKey: null,
    network: DEFAULT_NETWORK,
    error: null,
    accounts: [],

    connect: async (provider: WalletProvider) => {
        set({ status: 'connecting', error: null, provider })

        try {
            const adapter = getAdapter(provider)

            const installed = await adapter.isInstalled()
            if (!installed) {
                set({
                    status: 'error',
                    error: `${adapter.name} is not installed. Please install it from ${adapter.installUrl}`,
                })
                return
            }

            const network = get().network
            const publicKey = await adapter.connect(network)

            // Build account entry
            const newAccount: WalletAccount = { publicKey, provider }
            const existingAccounts = get().accounts
            const accountExists = existingAccounts.some(
                (a) => a.publicKey === publicKey && a.provider === provider
            )

            set({
                status: 'connected',
                publicKey,
                accounts: accountExists
                    ? existingAccounts
                    : [...existingAccounts, newAccount],
            })

            // Persist for auto-reconnect
            saveSession(provider, publicKey, network)
        } catch (err) {
            set({
                status: 'error',
                error:
                    err instanceof Error ? err.message : 'Failed to connect wallet',
            })
        }
    },

    disconnect: async () => {
        const { provider } = get()

        if (provider) {
            try {
                const adapter = getAdapter(provider)
                await adapter.disconnect()
            } catch {
                // Swallow — we still clear local state
            }
        }

        clearSession()
        set({
            status: 'disconnected',
            provider: null,
            publicKey: null,
            error: null,
        })
    },

    switchAccount: (publicKey: string) => {
        const account = get().accounts.find((a) => a.publicKey === publicKey)
        if (!account) return

        set({
            publicKey: account.publicKey,
            provider: account.provider,
        })

        saveSession(account.provider, account.publicKey, get().network)
    },

    switchNetwork: (network: StellarNetwork) => {
        set({ network })
        const { provider, publicKey } = get()
        if (provider && publicKey) {
            saveSession(provider, publicKey, network)
        }
    },

    setError: (error: string) => set({ error, status: 'error' }),

    clearError: () => set({ error: null, status: get().publicKey ? 'connected' : 'disconnected' }),

    restoreSession: async () => {
        const session = loadSession()
        if (!session) return

        // Restore network immediately
        set({ network: session.network })

        // Attempt reconnection silently
        try {
            await get().connect(session.provider)
        } catch {
            // Auto-reconnect failure is not an error worth showing
            clearSession()
        }
    },
}))
