import { WalletAdapter, WalletProvider } from './types'
import { FreighterAdapter } from './adapters/freighter'
import { XummAdapter } from './adapters/xumm'

// ── Adapter Factories ────────────────────────────────────────────────────────

type AdapterFactory = () => WalletAdapter

const adapterFactories: Record<WalletProvider, AdapterFactory> = {
    [WalletProvider.FREIGHTER]: () => new FreighterAdapter(),
    [WalletProvider.XUMM]: () => new XummAdapter(),
}

// ── Singleton cache so we don't create multiple instances ────────────────────

const adapterCache = new Map<WalletProvider, WalletAdapter>()

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Get (or create) the adapter for the given wallet provider.
 */
export function getAdapter(provider: WalletProvider): WalletAdapter {
    let adapter = adapterCache.get(provider)
    if (!adapter) {
        const factory = adapterFactories[provider]
        if (!factory) {
            throw new Error(`Unknown wallet provider: ${provider}`)
        }
        adapter = factory()
        adapterCache.set(provider, adapter)
    }
    return adapter
}

/**
 * Return metadata about all registered wallet providers.
 */
export function getSupportedWallets(): WalletAdapter[] {
    return Object.values(WalletProvider).map((p) => getAdapter(p))
}

/**
 * Return only the wallets that are currently installed / available.
 */
export async function getInstalledWallets(): Promise<WalletAdapter[]> {
    const all = getSupportedWallets()
    const checks = await Promise.all(
        all.map(async (a) => ({ adapter: a, installed: await a.isInstalled() }))
    )
    return checks.filter((c) => c.installed).map((c) => c.adapter)
}
