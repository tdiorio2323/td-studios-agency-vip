'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Users,
  BarChart3,
  MessageSquare,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  User,
  LogOut,
  Shield,
  CreditCard,
  HelpCircle
} from 'lucide-react'
import { GlassCard } from './GlassCard'
import { FrostButton } from './Button'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: number
  subItems?: NavItem[]
}

interface LuxuryNavigationProps {
  currentPath?: string
  onNavigate?: (path: string) => void
  className?: string
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home className="w-5 h-5" />,
    href: '/dashboard'
  },
  {
    id: 'creators',
    label: 'Creators',
    icon: <Users className="w-5 h-5" />,
    href: '/creators',
    badge: 3,
    subItems: [
      { id: 'all-creators', label: 'All Creators', icon: <Users className="w-4 h-4" />, href: '/creators' },
      { id: 'applications', label: 'Applications', icon: <User className="w-4 h-4" />, href: '/creators/applications' },
      { id: 'performance', label: 'Performance', icon: <BarChart3 className="w-4 h-4" />, href: '/creators/performance' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    href: '/analytics'
  },
  {
    id: 'inquiries',
    label: 'Inquiries',
    icon: <MessageSquare className="w-5 h-5" />,
    href: '/inquiries',
    badge: 12
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    href: '/settings',
    subItems: [
      { id: 'account', label: 'Account', icon: <User className="w-4 h-4" />, href: '/settings/account' },
      { id: 'billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" />, href: '/settings/billing' },
      { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" />, href: '/settings/security' }
    ]
  }
]

export function LuxuryNavigation({
  currentPath = '/dashboard',
  onNavigate,
  className = ''
}: LuxuryNavigationProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [notifications] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  useEffect(() => {
    // Auto-expand parent items based on current path
    navItems.forEach(item => {
      if (item.subItems?.some(subItem => currentPath.startsWith(subItem.href))) {
        setExpandedItems(prev => {
          const newSet = new Set(prev)
          newSet.add(item.id)
          return newSet
        })
      }
    })
  }, [currentPath])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const handleNavigate = (href: string) => {
    onNavigate?.(href)
    setIsMobileOpen(false)
  }

  const isActive = (href: string) => {
    return currentPath === href || currentPath.startsWith(href + '/')
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-6 left-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-3 glass-morphism border border-white/20 rounded-xl text-white"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Navigation Sidebar */}
      <AnimatePresence>
        {(isMobileOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed lg:sticky top-0 left-0 h-screen w-80 z-40 ${className}`}
          >
            <GlassCard className="h-full flex flex-col">
              <div className="p-6">
                {/* Logo */}
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-display font-bold text-white">TD Studios</h1>
                    <p className="text-xs text-neutral-400">Creator Agency</p>
                  </div>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                  <motion.div
                    animate={{
                      scale: isSearchFocused ? 1.02 : 1
                    }}
                    className="relative"
                  >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className="w-full h-10 pl-10 pr-4 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-400 focus:border-primary-500 focus:outline-none transition-colors"
                    />
                  </motion.div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1">
                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <div key={item.id}>
                        <motion.button
                          whileHover={{ x: 4 }}
                          onClick={() => {
                            if (item.subItems) {
                              toggleExpanded(item.id)
                            } else {
                              handleNavigate(item.href)
                            }
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                            isActive(item.href)
                              ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 text-white'
                              : 'text-neutral-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={isActive(item.href) ? 'text-primary-400' : ''}>
                              {item.icon}
                            </div>
                            <span className="font-medium">{item.label}</span>
                            {item.badge && (
                              <span className="px-2 py-1 text-xs bg-primary-500 text-white rounded-full min-w-[20px] text-center">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          {item.subItems && (
                            <motion.div
                              animate={{
                                rotate: expandedItems.has(item.id) ? 180 : 0
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          )}
                        </motion.button>

                        {/* Sub Items */}
                        <AnimatePresence>
                          {item.subItems && expandedItems.has(item.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="ml-4 mt-2 space-y-1 overflow-hidden"
                            >
                              {item.subItems.map((subItem) => (
                                <motion.button
                                  key={subItem.id}
                                  whileHover={{ x: 4 }}
                                  onClick={() => handleNavigate(subItem.href)}
                                  className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
                                    isActive(subItem.href)
                                      ? 'bg-primary-500/20 text-primary-300 border-l-2 border-primary-500'
                                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                  }`}
                                >
                                  {subItem.icon}
                                  <span className="text-sm">{subItem.label}</span>
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </nav>
              </div>

              {/* Bottom Section */}
              <div className="p-6 border-t border-white/10">
                {/* Notifications */}
                <div className="flex items-center justify-between mb-4">
                  <FrostButton className="flex-1 mr-2">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                    {notifications > 0 && (
                      <span className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                        {notifications}
                      </span>
                    )}
                  </FrostButton>
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">John Doe</div>
                    <div className="text-xs text-neutral-400">Agency Manager</div>
                  </div>
                  <button className="text-neutral-400 hover:text-white transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                {/* Help */}
                <div className="mt-4 text-center">
                  <FrostButton>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help & Support
                  </FrostButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  )
}