'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Wifi,
  Database,
  Server,
  Zap,
  Eye,
  EyeOff
} from 'lucide-react'
import { GlassCard } from './ui/GlassCard'

type SystemStatus = 'online' | 'warning' | 'error' | 'maintenance'
type MetricType = 'performance' | 'uptime' | 'users' | 'storage'

interface SystemMetric {
  type: MetricType
  label: string
  value: string
  status: SystemStatus
  trend: 'up' | 'down' | 'stable'
  icon: React.ReactNode
}

interface SystemBadgeProps {
  className?: string
  showDetails?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

const statusConfig = {
  online: {
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    icon: CheckCircle,
    label: 'All Systems Operational'
  },
  warning: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    icon: AlertCircle,
    label: 'Minor Issues Detected'
  },
  error: {
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    icon: XCircle,
    label: 'Service Disruption'
  },
  maintenance: {
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    icon: Clock,
    label: 'Scheduled Maintenance'
  }
}

const positionClasses = {
  'top-left': 'top-6 left-6',
  'top-right': 'top-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'bottom-right': 'bottom-6 right-6'
}

export function SystemBadge({
  className = '',
  showDetails = false,
  position = 'top-right'
}: SystemBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentStatus, setCurrentStatus] = useState<SystemStatus>('online')
  const [isVisible, setIsVisible] = useState(true)

  // Simulate real-time metrics
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      type: 'performance',
      label: 'Response Time',
      value: '45ms',
      status: 'online',
      trend: 'down',
      icon: <Zap className="w-4 h-4" />
    },
    {
      type: 'uptime',
      label: 'Uptime',
      value: '99.9%',
      status: 'online',
      trend: 'stable',
      icon: <Activity className="w-4 h-4" />
    },
    {
      type: 'users',
      label: 'Active Users',
      value: '1,247',
      status: 'online',
      trend: 'up',
      icon: <Wifi className="w-4 h-4" />
    },
    {
      type: 'storage',
      label: 'Storage Used',
      value: '67%',
      status: 'warning',
      trend: 'up',
      icon: <Database className="w-4 h-4" />
    }
  ])

  useEffect(() => {
    // Simulate status updates
    const interval = setInterval(() => {
      // Randomly update metrics
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.type === 'performance'
          ? `${Math.floor(Math.random() * 50 + 30)}ms`
          : metric.type === 'users'
          ? `${Math.floor(Math.random() * 500 + 1000).toLocaleString()}`
          : metric.value
      })))

      // Occasionally change overall status
      if (Math.random() < 0.1) {
        const statuses: SystemStatus[] = ['online', 'warning', 'error', 'maintenance']
        setCurrentStatus(statuses[Math.floor(Math.random() * statuses.length)])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const StatusIcon = statusConfig[currentStatus].icon

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`fixed ${positionClasses[position]} z-50 ${className}`}
    >
      <GlassCard className="relative">
        <motion.div
          layout
          className="p-3"
        >
          {/* Compact View */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <StatusIcon className={`w-5 h-5 ${statusConfig[currentStatus].color}`} />
              <motion.div
                className={`absolute -inset-1 rounded-full ${statusConfig[currentStatus].bgColor} opacity-50`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                TD Studios
              </p>
              <p className={`text-xs ${statusConfig[currentStatus].color} truncate`}>
                {statusConfig[currentStatus].label}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              {showDetails && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 rounded-md hover:bg-white/10 transition-colors"
                >
                  <Server className="w-4 h-4 text-neutral-400" />
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVisible(false)}
                className="p-1 rounded-md hover:bg-white/10 transition-colors"
              >
                {isVisible ? (
                  <EyeOff className="w-4 h-4 text-neutral-400" />
                ) : (
                  <Eye className="w-4 h-4 text-neutral-400" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Expanded View */}
          <AnimatePresence>
            {isExpanded && showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <div className="space-y-3">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.type}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <div className={statusConfig[metric.status].color}>
                          {metric.icon}
                        </div>
                        <span className="text-sm text-neutral-300">{metric.label}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-white">
                          {metric.value}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          metric.trend === 'up' ? 'bg-green-400' :
                          metric.trend === 'down' ? 'bg-red-400' :
                          'bg-gray-400'
                        }`} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-xs text-neutral-400 text-center">
                    Last updated: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Status indicator pulse */}
        <motion.div
          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${statusConfig[currentStatus].bgColor} ${statusConfig[currentStatus].borderColor} border`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </GlassCard>

      {/* Toggle visibility button when hidden */}
      <AnimatePresence>
        {!isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsVisible(true)}
            className="mt-2 p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
          >
            <Eye className="w-4 h-4 text-neutral-400" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}