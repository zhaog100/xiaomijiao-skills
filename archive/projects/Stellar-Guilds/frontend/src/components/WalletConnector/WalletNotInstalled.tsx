'use client'

import React from 'react'
import { Download, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WalletNotInstalledProps {
    walletName: string
    installUrl: string
    className?: string
}

export function WalletNotInstalled({
    walletName,
    installUrl,
    className,
}: WalletNotInstalledProps) {
    return (
        <div
            className={cn(
                'flex items-center gap-3 p-4 rounded-xl',
                'bg-gold-500/5 border border-gold-500/20',
                className
            )}
        >
            <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                <Download size={20} className="text-gold-500" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stellar-white">
                    {walletName} not detected
                </p>
                <p className="text-xs text-stellar-slate mt-0.5">
                    Install the extension to continue
                </p>
            </div>
            <a
                href={installUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    'inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                    'bg-gold-500/10 text-gold-400 hover:bg-gold-500/20'
                )}
            >
                Install
                <ExternalLink size={12} />
            </a>
        </div>
    )
}
