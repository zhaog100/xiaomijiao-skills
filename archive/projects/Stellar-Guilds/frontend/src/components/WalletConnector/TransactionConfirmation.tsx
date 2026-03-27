'use client'

import React from 'react'
import { X, CheckCircle2, XCircle, Loader2, FileCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TransactionResult, TransactionStatus } from '@/lib/wallet/types'

interface TransactionConfirmationProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    onReject: () => void
    /** Human-readable summary of what this transaction does */
    description: string
    /** Current status of the transaction lifecycle */
    status: TransactionStatus
    /** Result after submission */
    result?: TransactionResult | null
}

const STATUS_CONFIG: Record<TransactionStatus, { label: string; color: string }> = {
    idle: { label: 'Review Transaction', color: 'text-stellar-white' },
    building: { label: 'Preparing...', color: 'text-gold-400' },
    awaiting_signature: { label: 'Waiting for Signature...', color: 'text-gold-400' },
    submitting: { label: 'Submitting to Network...', color: 'text-gold-400' },
    success: { label: 'Transaction Confirmed', color: 'text-emerald-400' },
    error: { label: 'Transaction Failed', color: 'text-red-400' },
}

export function TransactionConfirmation({
    isOpen,
    onClose,
    onConfirm,
    onReject,
    description,
    status,
    result,
}: TransactionConfirmationProps) {
    const config = STATUS_CONFIG[status]
    const isProcessing = ['building', 'awaiting_signature', 'submitting'].includes(status)
    const isDone = status === 'success' || status === 'error'

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={isDone ? onClose : undefined}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                                'relative w-full max-w-sm rounded-2xl',
                                'bg-gradient-to-b from-stellar-lightNavy to-stellar-darkNavy',
                                'border border-stellar-lightNavy shadow-2xl shadow-black/50'
                            )}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-5 border-b border-stellar-lightNavy/50">
                                <h3 className={cn('text-lg font-semibold', config.color)}>
                                    {config.label}
                                </h3>
                                {(status === 'idle' || isDone) && (
                                    <button
                                        onClick={onClose}
                                        className="p-1.5 rounded-lg hover:bg-stellar-navy transition-colors"
                                    >
                                        <X size={18} className="text-stellar-slate" />
                                    </button>
                                )}
                            </div>

                            {/* Body */}
                            <div className="p-5">
                                {/* Description */}
                                <div className="p-3 rounded-lg bg-stellar-navy/50 border border-stellar-lightNavy/30 mb-4">
                                    <div className="flex items-start gap-2">
                                        <FileCheck size={16} className="text-stellar-slate mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-stellar-lightSlate leading-relaxed">
                                            {description}
                                        </p>
                                    </div>
                                </div>

                                {/* Processing spinner */}
                                {isProcessing && (
                                    <div className="flex flex-col items-center py-4">
                                        <Loader2 size={32} className="text-gold-500 animate-spin mb-3" />
                                        <p className="text-sm text-stellar-slate">
                                            {status === 'awaiting_signature'
                                                ? 'Please confirm in your wallet...'
                                                : 'Processing...'}
                                        </p>
                                    </div>
                                )}

                                {/* Success */}
                                {status === 'success' && result && (
                                    <div className="flex flex-col items-center py-4">
                                        <CheckCircle2 size={40} className="text-emerald-400 mb-3" />
                                        {result.hash && (
                                            <p className="text-xs text-stellar-slate font-mono break-all text-center">
                                                TX: {result.hash}
                                            </p>
                                        )}
                                        {result.ledger && (
                                            <p className="text-xs text-stellar-slate mt-1">
                                                Ledger #{result.ledger}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Error */}
                                {status === 'error' && result && (
                                    <div className="flex flex-col items-center py-4">
                                        <XCircle size={40} className="text-red-400 mb-3" />
                                        <p className="text-sm text-red-300 text-center">
                                            {result.error || 'An unknown error occurred'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="p-5 pt-0">
                                {status === 'idle' && (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={onReject}
                                            className={cn(
                                                'flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors',
                                                'bg-stellar-navy border border-stellar-lightNavy',
                                                'text-stellar-slate hover:text-stellar-white hover:bg-stellar-lightNavy'
                                            )}
                                        >
                                            Reject
                                        </button>
                                        <button
                                            onClick={onConfirm}
                                            className={cn(
                                                'flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors',
                                                'bg-gradient-to-r from-gold-500 to-gold-600 text-stellar-navy',
                                                'hover:from-gold-400 hover:to-gold-500'
                                            )}
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                )}

                                {isDone && (
                                    <button
                                        onClick={onClose}
                                        className={cn(
                                            'w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors',
                                            'bg-stellar-navy border border-stellar-lightNavy',
                                            'text-stellar-lightSlate hover:text-stellar-white hover:bg-stellar-lightNavy'
                                        )}
                                    >
                                        Close
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    )
}
