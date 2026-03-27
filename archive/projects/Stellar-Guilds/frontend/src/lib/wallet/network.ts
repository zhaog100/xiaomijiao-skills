import { StellarNetwork } from './types'

// ── Network Passphrases ──────────────────────────────────────────────────────

export const NETWORK_PASSPHRASE: Record<StellarNetwork, string> = {
    [StellarNetwork.TESTNET]: 'Test SDF Network ; September 2015',
    [StellarNetwork.MAINNET]: 'Public Global Stellar Network ; September 2015',
    [StellarNetwork.FUTURENET]: 'Test SDF Future Network ; October 2022',
}

// ── Horizon Endpoints ────────────────────────────────────────────────────────

export const HORIZON_URL: Record<StellarNetwork, string> = {
    [StellarNetwork.TESTNET]: 'https://horizon-testnet.stellar.org',
    [StellarNetwork.MAINNET]: 'https://horizon.stellar.org',
    [StellarNetwork.FUTURENET]: 'https://horizon-futurenet.stellar.org',
}

// ── Soroban RPC Endpoints ────────────────────────────────────────────────────

export const SOROBAN_RPC_URL: Record<StellarNetwork, string> = {
    [StellarNetwork.TESTNET]: 'https://soroban-testnet.stellar.org',
    [StellarNetwork.MAINNET]: 'https://soroban-rpc.mainnet.stellar.gateway.fm',
    [StellarNetwork.FUTURENET]: 'https://rpc-futurenet.stellar.org',
}

// ── Config Helper ────────────────────────────────────────────────────────────

export interface NetworkConfig {
    network: StellarNetwork
    passphrase: string
    horizonUrl: string
    sorobanRpcUrl: string
}

export function getNetworkConfig(network: StellarNetwork): NetworkConfig {
    return {
        network,
        passphrase: NETWORK_PASSPHRASE[network],
        horizonUrl: HORIZON_URL[network],
        sorobanRpcUrl: SOROBAN_RPC_URL[network],
    }
}

/** Default network for the application */
export const DEFAULT_NETWORK = StellarNetwork.TESTNET
