/**
 * Re-export wallet types for external consumption.
 */
export type {
    WalletAdapter,
    WalletAccount,
    ConnectionStatus,
    WalletConnectionState,
    TransactionStatus,
    TransactionResult,
    TransactionRequest,
    WalletSession,
} from '@/lib/wallet/types'

export {
    WalletProvider,
    StellarNetwork,
} from '@/lib/wallet/types'
