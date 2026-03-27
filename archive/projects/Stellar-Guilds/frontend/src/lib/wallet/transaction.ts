import { StellarNetwork, TransactionResult, WalletAdapter } from './types'
import { getNetworkConfig } from './network'

/**
 * Sign a transaction XDR using the provided adapter, then submit to Horizon.
 *
 * Returns a TransactionResult with the hash on success, or an error message on
 * failure. This is a high-level helper — individual components can also call
 * `adapter.signTransaction()` directly for more control.
 */
export async function signAndSubmit(
    adapter: WalletAdapter,
    xdr: string,
    network: StellarNetwork
): Promise<TransactionResult> {
    const config = getNetworkConfig(network)

    try {
        // 1. Sign
        const signedXdr = await adapter.signTransaction(xdr, network)

        // 2. Submit to Horizon
        const response = await fetch(`${config.horizonUrl}/transactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `tx=${encodeURIComponent(signedXdr)}`,
        })

        const result = await response.json()

        if (!response.ok) {
            const errorDetail =
                result?.extras?.result_codes?.transaction ||
                result?.detail ||
                'Transaction submission failed'

            return {
                status: 'error',
                error: String(errorDetail),
            }
        }

        return {
            status: 'success',
            hash: result.hash,
            ledger: result.ledger,
        }
    } catch (err) {
        return {
            status: 'error',
            error: err instanceof Error ? err.message : 'Unknown error',
        }
    }
}

/**
 * Shorten a Stellar public key for display.
 * e.g. "GABCD...WXYZ"
 */
export function shortenAddress(publicKey: string, chars = 4): string {
    if (!publicKey || publicKey.length < chars * 2 + 3) return publicKey
    return `${publicKey.slice(0, chars)}...${publicKey.slice(-chars)}`
}
