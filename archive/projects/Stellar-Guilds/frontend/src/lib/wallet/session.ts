import { WalletSession, WalletProvider, StellarNetwork } from './types'

const STORAGE_KEY = 'stellar-guilds-wallet-session'

/**
 * Persist the current wallet session to localStorage.
 */
export function saveSession(
    provider: WalletProvider,
    publicKey: string,
    network: StellarNetwork
): void {
    try {
        const session: WalletSession = {
            provider,
            publicKey,
            network,
            connectedAt: new Date().toISOString(),
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } catch {
        // localStorage may be unavailable (SSR, privacy mode)
        console.warn('Failed to persist wallet session')
    }
}

/**
 * Retrieve a previously stored session, or null if none exists.
 */
export function loadSession(): WalletSession | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return null
        return JSON.parse(raw) as WalletSession
    } catch {
        return null
    }
}

/**
 * Clear the stored session (on disconnect).
 */
export function clearSession(): void {
    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch {
        // no-op
    }
}

/**
 * Check whether a stored session exists.
 */
export function hasSession(): boolean {
    return loadSession() !== null
}
