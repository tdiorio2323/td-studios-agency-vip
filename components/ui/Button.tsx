"use client";

import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'frost' | 'ghost' | 'mini-frost' | 'mini-ghost';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}

export function Button({
  children,
  variant = 'frost',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    "relative inline-flex items-center justify-center font-medium",
    "focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black/90",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
  );

  const variants = {
    frost: cn(
      "rounded-xl px-6 py-3 text-sm text-text-primary font-medium",
      // Base glass effect
      "bg-gradient-to-br from-white/[0.15] to-white/[0.08]",
      "border border-white/20",
      "backdrop-blur-md",
      // Shadows for depth
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.3)]",
      // Hover states - layered
      "hover:from-white/[0.22] hover:to-white/[0.12]",
      "hover:border-white/35",
      "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_24px_rgba(255,255,255,0.08),0_4px_12px_rgba(0,0,0,0.4)]",
      // Subtle scale on active
      "active:scale-[0.995]",
      "transition-all duration-300 ease-out"
    ),
    ghost: cn(
      "rounded-xl px-6 py-3 text-sm text-text-secondary font-medium",
      "border border-white/12",
      "hover:bg-gradient-to-br hover:from-white/[0.08] hover:to-white/[0.04]",
      "hover:text-text-primary",
      "hover:border-white/20",
      "hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]",
      "active:scale-[0.995]",
      "transition-all duration-300 ease-out"
    ),
    'mini-frost': cn(
      "rounded-lg px-4 py-2 text-xs text-text-primary font-medium",
      "bg-white/10 border border-white/20 backdrop-blur",
      "hover:bg-white/[0.15] hover:border-white/30",
      "shadow-[0_2px_8px_rgba(0,0,0,0.2)]",
      "hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
      "transition-all duration-200 ease-out"
    ),
    'mini-ghost': cn(
      "rounded-lg px-4 py-2 text-xs text-text-secondary font-medium",
      "border border-white/12",
      "hover:bg-white/[0.06] hover:text-text-primary hover:border-white/20",
      "transition-all duration-200 ease-out"
    )
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      <span className={loading ? "opacity-0" : "opacity-100 transition-opacity"}>
        {children}
      </span>
    </button>
  );
}

// Legacy component wrappers for existing code
export function FrostButton({ children, ...props }: Omit<ButtonProps, 'variant'>) {
  return <Button variant="frost" {...props}>{children}</Button>;
}

export function GhostButton({ children, ...props }: Omit<ButtonProps, 'variant'>) {
  return <Button variant="ghost" {...props}>{children}</Button>;
}

export function MiniFrost({ children, ...props }: Omit<ButtonProps, 'variant'>) {
  return <Button variant="mini-frost" {...props}>{children}</Button>;
}

export function MiniGhost({ children, ...props }: Omit<ButtonProps, 'variant'>) {
  return <Button variant="mini-ghost" {...props}>{children}</Button>;
}