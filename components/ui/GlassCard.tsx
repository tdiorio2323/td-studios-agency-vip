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
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        blurVariants[blur],
        sizeVariants[size],
        'bg-white/10',
        border && 'border border-white/20',
        'shadow-glass',
        hover && 'hover:bg-white/15 hover:border-white/30',
        'transition-all duration-300',
        gradient && 'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none',
        onClick && 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black',
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  )
}