'use client'

import { useEffect, useCallback, useRef } from 'react'
import { useWalletStore } from '@/store/walletStore'
import {
    WalletProvider,
    StellarNetwork,
} from '@/lib/wallet/types'
import { getAdapter } from '@/lib/wallet/registry'
import { shortenAddress, signAndSubmit } from '@/lib/wallet/transaction'

/**
 * Primary wallet hook — wraps the Zustand store and adds lifecycle behaviour
 * (auto-reconnect on mount, address shortening, sign helpers).
 */
export function useWallet() {
    const store = useWalletStore()
    const hasRestored = useRef(false)

    // ── Auto-reconnect on mount ──────────────────────────────────────────────

    useEffect(() => {
        if (!hasRestored.current) {
            hasRestored.current = true
            store.restoreSession()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // ── Derived values ───────────────────────────────────────────────────────

    const isConnected = store.status === 'connected'
    const isConnecting = store.status === 'connecting'
    const hasError = store.status === 'error'

    const shortened = store.publicKey
        ? shortenAddress(store.publicKey)
        : null

    // ── Actions ──────────────────────────────────────────────────────────────

    const connect = useCallback(
        (provider: WalletProvider) => store.connect(provider),
        [store]
    )

    const disconnect = useCallback(
        () => store.disconnect(),
        [store]
    )

    const switchAccount = useCallback(
        (publicKey: string) => store.switchAccount(publicKey),
        [store]
    )

    const switchNetwork = useCallback(
        (network: StellarNetwork) => store.switchNetwork(network),
        [store]
    )

    /**
     * Sign and submit a transaction XDR.
     */
    const sign = useCallback(
        async (xdr: string) => {
            if (!store.provider) {
                throw new Error('No wallet connected')
            }
            const adapter = getAdapter(store.provider)
            return signAndSubmit(adapter, xdr, store.network)
        },
        [store.provider, store.network]
    )

    /**
     * Check whether a specific wallet provider is installed.
     */
    const isInstalled = useCallback(async (provider: WalletProvider) => {
        const adapter = getAdapter(provider)
        return adapter.isInstalled()
    }, [])

    return {
        // State
        status: store.status,
        provider: store.provider,
        publicKey: store.publicKey,
        network: store.network,
        error: store.error,
        accounts: store.accounts,

        // Derived
        isConnected,
        isConnecting,
        hasError,
        shortenedAddress: shortened,

        // Actions
        connect,
        disconnect,
        switchAccount,
        switchNetwork,
        sign,
        isInstalled,
        clearError: store.clearError,
    }
}
