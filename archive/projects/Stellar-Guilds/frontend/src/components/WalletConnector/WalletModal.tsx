'use client'

import React, { useEffect, useState } from 'react'
import { X, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useWallet } from '@/hooks/useWallet'
import { useWalletModal } from '@/hooks/useWalletModal'
import { WalletProvider } from '@/lib/wallet/types'
import { getSupportedWallets } from '@/lib/wallet/registry'

interface WalletInfo {
    provider: WalletProvider
    name: string
    icon: string
    installUrl: string
    description: string
}

const WALLET_INFO: WalletInfo[] = [
    {
        provider: WalletProvider.FREIGHTER,
        name: 'Freighter',
        icon: '🚀',
        installUrl: 'https://www.freighter.app/',
        description: 'Browser extension for Stellar',
    },
    {
        provider: WalletProvider.XUMM,
        name: 'XUMM',
        icon: '📱',
        installUrl: 'https://xumm.app/',
        description: 'Mobile wallet with QR login',
    },
]

export function WalletModal() {
    const { isOpen, close } = useWalletModal()
    const { connect, isConnecting, hasError, error, clearError, provider: activeProvider } = useWallet()
    const [installedMap, setInstalledMap] = useState<Record<string, boolean>>({})
    const [connectingProvider, setConnectingProvider] = useState<WalletProvider | null>(null)

    // Check which wallets are installed when modal opens
    useEffect(() => {
        if (!isOpen) return

        async function checkInstalled() {
            const wallets = getSupportedWallets()
            const checks = await Promise.all(
                wallets.map(async (w) => ({
                    provider: w.provider,
                    installed: await w.isInstalled(),
                }))
            )
            const map: Record<string, boolean> = {}
            checks.forEach((c) => {
                map[c.provider] = c.installed
            })
            setInstalledMap(map)
        }
        checkInstalled()
    }, [isOpen])

    // Close on successful connection
    useEffect(() => {
        if (activeProvider && !isConnecting && !hasError) {
            close()
            setConnectingProvider(null)
        }
    }, [activeProvider, isConnecting, hasError, close])

    // Reset error when closing
    useEffect(() => {
        if (!isOpen) {
            clearError()
            setConnectingProvider(null)
        }
    }, [isOpen, clearError])

    const handleConnect = async (provider: WalletProvider) => {
        setConnectingProvider(provider)
        clearError()
        await connect(provider)
    }

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, close])

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={close}
                        />

                        {/* Modal panel */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className={cn(
                                'relative w-full max-w-md rounded-2xl',
                                'bg-gradient-to-b from-stellar-lightNavy to-stellar-darkNavy',
                                'border border-stellar-lightNavy shadow-2xl shadow-black/50'
                            )}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-stellar-lightNavy/50">
                                <div>
                                    <h2 className="text-xl font-semibold text-stellar-white">
                                        Connect Wallet
                                    </h2>
                                    <p className="text-sm text-stellar-slate mt-1">
                                        Choose your preferred Stellar wallet
                                    </p>
                                </div>
                                <button
                                    onClick={close}
                                    className="p-2 rounded-lg hover:bg-stellar-navy transition-colors"
                                    aria-label="Close wallet modal"
                                >
                                    <X size={20} className="text-stellar-slate" />
                                </button>
                            </div>

                            {/* Error banner */}
                            <AnimatePresence>
                                {hasError && error && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mx-6 mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2">
                                            <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="text-sm text-red-300">{error}</p>
                                                <button
                                                    onClick={clearError}
                                                    className="text-xs text-red-400 hover:text-red-300 mt-1 underline"
                                                >
                                                    Dismiss
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Wallet list */}
                            <div className="p-6 space-y-3">
                                {WALLET_INFO.map((wallet) => {
                                    const installed = installedMap[wallet.provider] ?? false
                                    const isThisConnecting =
                                        isConnecting && connectingProvider === wallet.provider

                                    return (
                                        <button
                                            key={wallet.provider}
                                            onClick={() =>
                                                installed
                                                    ? handleConnect(wallet.provider)
                                                    : window.open(wallet.installUrl, '_blank')
                                            }
                                            disabled={isConnecting}
                                            className={cn(
                                                'w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200',
                                                'border text-left',
                                                installed
                                                    ? 'border-stellar-lightNavy/50 hover:border-gold-500/40 hover:bg-stellar-lightNavy/50 cursor-pointer'
                                                    : 'border-stellar-lightNavy/30 opacity-70 cursor-pointer hover:opacity-90',
                                                isThisConnecting && 'border-gold-500/50 bg-stellar-lightNavy/50',
                                                'disabled:opacity-50 disabled:cursor-not-allowed'
                                            )}
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-stellar-navy flex items-center justify-center text-2xl flex-shrink-0">
                                                {wallet.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-stellar-white">
                                                        {wallet.name}
                                                    </span>
                                                    {installed && (
                                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                            Detected
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-stellar-slate mt-0.5">
                                                    {wallet.description}
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                {isThisConnecting ? (
                                                    <RefreshCw size={18} className="text-gold-500 animate-spin" />
                                                ) : installed ? (
                                                    <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center">
                                                        <span className="text-gold-500 text-lg">→</span>
                                                    </div>
                                                ) : (
                                                    <ExternalLink size={16} className="text-stellar-slate" />
                                                )}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Footer */}
                            <div className="px-6 pb-6">
                                <p className="text-xs text-stellar-slate text-center leading-relaxed">
                                    By connecting, you agree to the platform&apos;s terms of service.
                                    Your keys never leave your wallet.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    )
}
