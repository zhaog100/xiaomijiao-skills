// Wallet types
export {
    WalletProvider,
    StellarNetwork,
    type WalletAdapter,
    type WalletAccount,
    type ConnectionStatus,
    type WalletConnectionState,
    type TransactionStatus,
    type TransactionResult,
    type TransactionRequest,
    type WalletSession,
} from './types'

// Network config
export {
    NETWORK_PASSPHRASE,
    HORIZON_URL,
    SOROBAN_RPC_URL,
    DEFAULT_NETWORK,
    getNetworkConfig,
    type NetworkConfig,
} from './network'

// Adapters
export { FreighterAdapter } from './adapters/freighter'
export { XummAdapter } from './adapters/xumm'

// Registry
export { getAdapter, getSupportedWallets, getInstalledWallets } from './registry'

// Session
export { saveSession, loadSession, clearSession, hasSession } from './session'

// Transaction utilities
export { signAndSubmit, shortenAddress } from './transaction'
