'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  Mail,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  MessageSquare,
  Star,
  Archive,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { FrostButton } from './ui/Button'
import { GlassCard } from './ui/GlassCard'

interface Inquiry {
  id: string
  name: string
  email: string
  company?: string
  subject: string
  message: string
  status: 'new' | 'in-progress' | 'completed' | 'archived'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  createdAt: string
  estimatedValue?: number
  tags: string[]
  avatar?: string
}

const mockInquiries: Inquiry[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@techstartup.com',
    company: 'TechStartup Inc.',
    subject: 'Brand Partnership Opportunity',
    message: 'Looking to partner with creators for our new product launch...',
    status: 'new',
    priority: 'high',
    createdAt: '2024-01-15T10:30:00Z',
    estimatedValue: 50000,
    tags: ['Partnership', 'Tech', 'Product Launch']
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    email: 'marcus@contentcreator.co',
    subject: 'Creator Management Services',
    message: 'Interested in your premium creator management services...',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2024-01-14T15:45:00Z',
    estimatedValue: 25000,
    tags: ['Creator', 'Management', 'Services']
  },
  {
    id: '3',
    name: 'Elena Vasquez',
    email: 'elena@fashionbrand.com',
    company: 'Fashion Forward',
    subject: 'Influencer Campaign',
    message: 'Planning a major influencer campaign for summer collection...',
    status: 'completed',
    priority: 'urgent',
    createdAt: '2024-01-13T09:15:00Z',
    estimatedValue: 75000,
    tags: ['Fashion', 'Campaign', 'Influencer']
  }
]

const statusConfig = {
  new: { color: 'text-blue-400', bg: 'bg-blue-500/20', icon: Plus },
  'in-progress': { color: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: Clock },
  completed: { color: 'text-green-400', bg: 'bg-green-500/20', icon: CheckCircle },
  archived: { color: 'text-gray-400', bg: 'bg-gray-500/20', icon: Archive }
}

const priorityConfig = {
  low: { color: 'text-green-400', bg: 'bg-green-500/20' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  high: { color: 'text-orange-400', bg: 'bg-orange-500/20' },
  urgent: { color: 'text-red-400', bg: 'bg-red-500/20' }
}

export function InquiriesDashboard() {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [inquiries] = useState<Inquiry[]>(mockInquiries)

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || inquiry.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    inProgress: inquiries.filter(i => i.status === 'in-progress').length,
    completed: inquiries.filter(i => i.status === 'completed').length,
    totalValue: inquiries.reduce((sum, i) => sum + (i.estimatedValue || 0), 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              Inquiries Dashboard
            </h1>
            <p className="text-neutral-400">
              Manage client inquiries and partnership opportunities
            </p>
          </div>

          <FrostButton>
            <Plus className="w-4 h-4 mr-2" />
            New Inquiry
          </FrostButton>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <GlassCard className="text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
              <div className="text-neutral-400 text-sm">Total Inquiries</div>
            </div>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-400 mb-1">{stats.new}</div>
              <div className="text-neutral-400 text-sm">New</div>
            </div>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.inProgress}</div>
              <div className="text-neutral-400 text-sm">In Progress</div>
            </div>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">{stats.completed}</div>
              <div className="text-neutral-400 text-sm">Completed</div>
            </div>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-primary-400 mb-1">
                ${(stats.totalValue / 1000).toFixed(0)}K
              </div>
              <div className="text-neutral-400 text-sm">Total Value</div>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inquiries List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filters */}
            <GlassCard>
              <div className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                      <input
                        placeholder="Search inquiries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 pl-10 pr-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur placeholder-white/60"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    >
                      <option value="all">All Status</option>
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="archived">Archived</option>
                    </select>

                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                    >
                      <option value="all">All Priority</option>
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Inquiries List */}
            <div className="space-y-3">
              <AnimatePresence>
                {filteredInquiries.map((inquiry) => {
                  const StatusIcon = statusConfig[inquiry.status].icon

                  return (
                    <motion.div
                      key={inquiry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GlassCard
                        className="cursor-pointer"
                        onClick={() => setSelectedInquiry(inquiry)}
                        hover={true}
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {inquiry.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <h3 className="font-semibold text-white">{inquiry.name}</h3>
                                <p className="text-sm text-neutral-400">{inquiry.email}</p>
                                {inquiry.company && (
                                  <p className="text-xs text-neutral-500">{inquiry.company}</p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <div className={`px-2 py-1 rounded-full text-xs ${priorityConfig[inquiry.priority].bg} ${priorityConfig[inquiry.priority].color}`}>
                                {inquiry.priority}
                              </div>
                              <div className={`px-2 py-1 rounded-full text-xs flex items-center ${statusConfig[inquiry.status].bg} ${statusConfig[inquiry.status].color}`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {inquiry.status}
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <h4 className="font-medium text-white mb-1">{inquiry.subject}</h4>
                            <p className="text-sm text-neutral-400 line-clamp-2">{inquiry.message}</p>
                          </div>

                          <div className="flex items-center justify-between text-xs text-neutral-500">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(inquiry.createdAt).toLocaleDateString()}
                              </div>
                              {inquiry.estimatedValue && (
                                <div className="flex items-center">
                                  <DollarSign className="w-3 h-3 mr-1" />
                                  ${inquiry.estimatedValue.toLocaleString()}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center space-x-1">
                              {inquiry.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="px-2 py-1 bg-neutral-700 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                              {inquiry.tags.length > 2 && (
                                <span className="text-neutral-400">+{inquiry.tags.length - 2}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Inquiry Details */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {selectedInquiry ? (
                <motion.div
                  key={selectedInquiry.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Inquiry Details</h3>
                        <button className="text-neutral-400 hover:text-white transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Contact Info */}
                      <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {selectedInquiry.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{selectedInquiry.name}</h4>
                            <p className="text-sm text-neutral-400">{selectedInquiry.email}</p>
                            {selectedInquiry.company && (
                              <p className="text-xs text-neutral-500">{selectedInquiry.company}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className={`px-3 py-2 rounded-lg text-center ${statusConfig[selectedInquiry.status].bg}`}>
                            <div className={`text-sm font-medium ${statusConfig[selectedInquiry.status].color}`}>
                              {selectedInquiry.status}
                            </div>
                            <div className="text-xs text-neutral-400">Status</div>
                          </div>
                          <div className={`px-3 py-2 rounded-lg text-center ${priorityConfig[selectedInquiry.priority].bg}`}>
                            <div className={`text-sm font-medium ${priorityConfig[selectedInquiry.priority].color}`}>
                              {selectedInquiry.priority}
                            </div>
                            <div className="text-xs text-neutral-400">Priority</div>
                          </div>
                        </div>
                      </div>

                      {/* Subject & Message */}
                      <div className="mb-6">
                        <h5 className="font-medium text-white mb-2">Subject</h5>
                        <p className="text-neutral-300 mb-4">{selectedInquiry.subject}</p>

                        <h5 className="font-medium text-white mb-2">Message</h5>
                        <p className="text-neutral-300 text-sm leading-relaxed">
                          {selectedInquiry.message}
                        </p>
                      </div>

                      {/* Estimated Value */}
                      {selectedInquiry.estimatedValue && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg border border-primary-500/30">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm text-neutral-300">Estimated Value</div>
                              <div className="text-2xl font-bold text-white">
                                ${selectedInquiry.estimatedValue.toLocaleString()}
                              </div>
                            </div>
                            <TrendingUp className="w-8 h-8 text-primary-400" />
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="mb-6">
                        <h5 className="font-medium text-white mb-2">Tags</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedInquiry.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-neutral-700 text-neutral-300 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <FrostButton className="w-full">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Reply
                        </FrostButton>

                        <div className="grid grid-cols-2 gap-3">
                          <FrostButton>
                            <Eye className="w-4 h-4 mr-2" />
                            View Full
                          </FrostButton>
                          <FrostButton>
                            <Star className="w-4 h-4 mr-2" />
                            Star
                          </FrostButton>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-96 flex items-center justify-center"
                >
                  <GlassCard>
                    <div className="p-8 text-center">
                      <MessageSquare className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">No Inquiry Selected</h3>
                      <p className="text-neutral-400">Select an inquiry to view details</p>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}