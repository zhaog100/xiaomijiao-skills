'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Wallet, ChevronDown, LogOut, Copy, Check, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useWallet } from '@/hooks/useWallet'
import { useWalletModal } from '@/hooks/useWalletModal'
import { WalletProvider } from '@/lib/wallet/types'

const PROVIDER_LABELS: Record<WalletProvider, string> = {
    [WalletProvider.FREIGHTER]: 'Freighter',
    [WalletProvider.XUMM]: 'XUMM',
}

export function WalletConnectButton() {
    const {
        isConnected,
        isConnecting,
        shortenedAddress,
        publicKey,
        provider,
        accounts,
        disconnect,
        switchAccount,
    } = useWallet()
    const { open: openModal } = useWalletModal()

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleCopy = async () => {
        if (!publicKey) return
        await navigator.clipboard.writeText(publicKey)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // ── Disconnected state ───────────────────────────────────────────────────
    if (!isConnected) {
        return (
            <button
                onClick={openModal}
                disabled={isConnecting}
                className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    'bg-gradient-to-r from-gold-500 to-gold-600 text-stellar-navy',
                    'hover:from-gold-400 hover:to-gold-500 hover:shadow-lg hover:shadow-gold-500/20',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stellar-darkNavy',
                    'disabled:opacity-60 disabled:cursor-not-allowed'
                )}
            >
                {isConnecting ? (
                    <>
                        <RefreshCw size={16} className="animate-spin" />
                        Connecting...
                    </>
                ) : (
                    <>
                        <Wallet size={16} />
                        Connect Wallet
                    </>
                )}
            </button>
        )
    }

    // ── Connected state ──────────────────────────────────────────────────────
    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={cn(
                    'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    'bg-stellar-lightNavy/80 border border-stellar-lightNavy',
                    'hover:bg-stellar-lightNavy hover:border-gold-500/30',
                    'text-stellar-white'
                )}
            >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline text-stellar-slate text-xs">
                    {provider ? PROVIDER_LABELS[provider] : ''}
                </span>
                <span className="font-mono">{shortenedAddress}</span>
                <ChevronDown
                    size={14}
                    className={cn(
                        'text-stellar-slate transition-transform duration-200',
                        dropdownOpen && 'rotate-180'
                    )}
                />
            </button>

            <AnimatePresence>
                {dropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className={cn(
                            'absolute right-0 top-full mt-2 w-72 z-50',
                            'rounded-xl border border-stellar-lightNavy',
                            'bg-stellar-darkNavy/95 backdrop-blur-xl shadow-2xl shadow-black/40'
                        )}
                    >
                        {/* Current account */}
                        <div className="p-4 border-b border-stellar-lightNavy">
                            <p className="text-xs text-stellar-slate mb-1">Connected Account</p>
                            <div className="flex items-center justify-between">
                                <p className="font-mono text-sm text-stellar-white truncate pr-2">
                                    {publicKey}
                                </p>
                                <button
                                    onClick={handleCopy}
                                    className="p-1.5 rounded-md hover:bg-stellar-lightNavy transition-colors flex-shrink-0"
                                    title="Copy address"
                                >
                                    {copied ? (
                                        <Check size={14} className="text-emerald-400" />
                                    ) : (
                                        <Copy size={14} className="text-stellar-slate" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Other accounts */}
                        {accounts.length > 1 && (
                            <div className="p-2 border-b border-stellar-lightNavy">
                                <p className="text-xs text-stellar-slate px-2 py-1">Switch Account</p>
                                {accounts
                                    .filter((a) => a.publicKey !== publicKey)
                                    .map((account) => (
                                        <button
                                            key={account.publicKey}
                                            onClick={() => {
                                                switchAccount(account.publicKey)
                                                setDropdownOpen(false)
                                            }}
                                            className={cn(
                                                'w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm',
                                                'hover:bg-stellar-lightNavy transition-colors text-left'
                                            )}
                                        >
                                            <div className="w-2 h-2 rounded-full bg-stellar-slate" />
                                            <span className="font-mono text-xs text-stellar-lightSlate truncate">
                                                {account.publicKey.slice(0, 8)}...{account.publicKey.slice(-8)}
                                            </span>
                                            <span className="text-xs text-stellar-slate ml-auto">
                                                {PROVIDER_LABELS[account.provider]}
                                            </span>
                                        </button>
                                    ))}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="p-2">
                            <button
                                onClick={() => {
                                    openModal()
                                    setDropdownOpen(false)
                                }}
                                className={cn(
                                    'w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm',
                                    'hover:bg-stellar-lightNavy transition-colors text-stellar-lightSlate'
                                )}
                            >
                                <Wallet size={14} />
                                Connect Another Wallet
                            </button>
                            <button
                                onClick={() => {
                                    disconnect()
                                    setDropdownOpen(false)
                                }}
                                className={cn(
                                    'w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm',
                                    'hover:bg-red-500/10 transition-colors text-red-400'
                                )}
                            >
                                <LogOut size={14} />
                                Disconnect
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
