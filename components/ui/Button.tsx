"use client";

import React from 'react';

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
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    frost: "rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm text-text-primary backdrop-blur hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10 active:scale-[0.98]",
    ghost: "rounded-xl border border-white/15 px-6 py-3 text-sm text-text-secondary hover:bg-white/8 hover:text-text-primary hover:border-white/25 active:scale-[0.98]",
    'mini-frost': "rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-xs text-text-primary backdrop-blur hover:bg-white/20 hover:border-white/30",
    'mini-ghost': "rounded-lg border border-white/15 px-4 py-2 text-xs text-text-secondary hover:bg-white/8 hover:text-text-primary hover:border-white/25"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
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