'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
  border?: boolean
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  'aria-label'?: string
}

const blurVariants = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl'
}

const sizeVariants = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}

export function GlassCard({
  children,
  className,
  hover = true,
  gradient = false,
  border = true,
  blur = 'md',
  size = 'md',
  onClick,
  'aria-label': ariaLabel
}: GlassCardProps) {
  const Component = onClick ? motion.button : motion.div

  return (
    <Component
      whileHover={hover ? { y: -2, scale: 1.005 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl',
        blurVariants[blur],
        sizeVariants[size],
        // Enhanced glass effect with better layering
        'bg-gradient-to-br from-white/[0.12] to-white/[0.06]',
        // Gradient border effect
        border && 'before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-white/25 before:via-white/10 before:to-white/5 before:-z-10',
        // Inner shadow for depth
        'shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15),0_8px_32px_0_rgba(0,0,0,0.4)]',
        hover && 'hover:shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.2),0_12px_48px_0_rgba(0,0,0,0.5)]',
        'transition-all duration-500 ease-out',
        gradient && 'after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/[0.08] after:to-transparent after:pointer-events-none after:opacity-0 after:group-hover:opacity-100 after:transition-opacity after:duration-500',
        onClick && 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black/50',
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {/* Refined shimmer - only on hover, more subtle */}
      {hover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  )
}