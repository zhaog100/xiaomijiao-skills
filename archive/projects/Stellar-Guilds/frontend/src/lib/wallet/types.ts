// ── Wallet Provider & Network Enums ──────────────────────────────────────────

export enum WalletProvider {
  FREIGHTER = 'freighter',
  XUMM = 'xumm',
}

export enum StellarNetwork {
  TESTNET = 'testnet',
  MAINNET = 'mainnet',
  FUTURENET = 'futurenet',
}

// ── Wallet Adapter Interface ─────────────────────────────────────────────────

export interface WalletAdapter {
  /** Human-readable name for UI display */
  readonly name: string
  /** Provider identifier */
  readonly provider: WalletProvider
  /** Icon URL or import path */
  readonly icon: string
  /** Install URL for extension store */
  readonly installUrl: string

  /** Check if the wallet extension/app is available in the current environment */
  isInstalled(): Promise<boolean>

  /** Initiate connection and return the public key */
  connect(network: StellarNetwork): Promise<string>

  /** Disconnect and clean up resources */
  disconnect(): Promise<void>

  /** Retrieve the current public key (throws if not connected) */
  getPublicKey(): Promise<string>

  /** Sign an XDR-encoded transaction, return signed XDR */
  signTransaction(
    xdr: string,
    network: StellarNetwork
  ): Promise<string>
}

// ── Account & Connection State ───────────────────────────────────────────────

export interface WalletAccount {
  publicKey: string
  provider: WalletProvider
  /** User-assigned label, e.g. "My Main Wallet" */
  label?: string
}

export type ConnectionStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'error'

export interface WalletConnectionState {
  status: ConnectionStatus
  provider: WalletProvider | null
  publicKey: string | null
  network: StellarNetwork
  accounts: WalletAccount[]
  error: string | null
}

// ── Transaction Types ────────────────────────────────────────────────────────

export type TransactionStatus =
  | 'idle'
  | 'building'
  | 'awaiting_signature'
  | 'submitting'
  | 'success'
  | 'error'

export interface TransactionResult {
  status: TransactionStatus
  hash?: string
  error?: string
  /** Ledger number the tx was included in */
  ledger?: number
}

export interface TransactionRequest {
  /** Human-readable description shown in the confirmation dialog */
  description: string
  /** XDR-encoded transaction envelope */
  xdr: string
  /** Network to submit to */
  network: StellarNetwork
}

// ── Session Persistence ──────────────────────────────────────────────────────

export interface WalletSession {
  provider: WalletProvider
  publicKey: string
  network: StellarNetwork
  /** ISO timestamp of last successful connection */
  connectedAt: string
}
