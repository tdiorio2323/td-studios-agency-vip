'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Monitor,
  Smartphone,
  Tablet,
  Palette,
  Sliders,
  Code,
  Eye,
  Download,
  Share2,
  Maximize,
  Grid3X3,
  Layers
} from 'lucide-react'
import { FrostButton } from './ui/Button'
import { GlassCard } from './ui/GlassCard'

interface DemoControlsProps {
  className?: string
}

type ViewportSize = 'desktop' | 'tablet' | 'mobile'
type ThemeMode = 'light' | 'dark' | 'auto'
type DemoState = 'playing' | 'paused' | 'stopped'

const viewportSizes = {
  desktop: { width: '100%', height: '100%', icon: Monitor },
  tablet: { width: '768px', height: '1024px', icon: Tablet },
  mobile: { width: '375px', height: '812px', icon: Smartphone }
}

const colorPresets = [
  { name: 'Ocean', primary: '#0ea5e9', accent: '#06b6d4' },
  { name: 'Sunset', primary: '#f59e0b', accent: '#ef4444' },
  { name: 'Forest', primary: '#10b981', accent: '#059669' },
  { name: 'Purple', primary: '#8b5cf6', accent: '#a855f7' },
  { name: 'Rose', primary: '#f43f5e', accent: '#ec4899' }
]

export function DemoControls({ className = '' }: DemoControlsProps) {
  const [demoState, setDemoState] = useState<DemoState>('stopped')
  const [viewport, setViewport] = useState<ViewportSize>('desktop')
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [selectedPreset, setSelectedPreset] = useState(0)
  const [showGrid, setShowGrid] = useState(false)
  const [showLayers, setShowLayers] = useState(false)
  const [opacity, setOpacity] = useState(100)

  const handlePlayPause = () => {
    setDemoState(prev => prev === 'playing' ? 'paused' : 'playing')
  }

  const handleReset = () => {
    setDemoState('stopped')
    setViewport('desktop')
    setOpacity(100)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Demo Controls</h2>
          <p className="text-neutral-400">Customize and preview your agency experience</p>
        </div>
        <div className="flex items-center space-x-2">
          <FrostButton>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </FrostButton>
          <FrostButton>
            <Download className="w-4 h-4 mr-2" />
            Export
          </FrostButton>
        </div>
      </div>

      {/* Main Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Playback Controls */}
        <GlassCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Play className="w-5 h-5 mr-2 text-primary-400" />
              Playback
            </h3>

            <div className="flex items-center space-x-3 mb-4">
              <FrostButton
               
               
                onClick={handlePlayPause}
              >
                {demoState === 'playing' ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </FrostButton>

              <FrostButton onClick={handleReset}>
                <RotateCcw className="w-4 h-4" />
              </FrostButton>

              <div className="flex-1 bg-neutral-700 rounded-full h-2 relative">
                <motion.div
                  className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                  animate={{ width: demoState === 'playing' ? '100%' : '0%' }}
                  transition={{ duration: 10, ease: 'linear' }}
                />
              </div>
            </div>

            <div className="text-sm text-neutral-400">
              Status: <span className={`capitalize ${
                demoState === 'playing' ? 'text-green-400' :
                demoState === 'paused' ? 'text-yellow-400' :
                'text-neutral-300'
              }`}>
                {demoState}
              </span>
            </div>
          </div>
        </GlassCard>

        {/* Viewport Controls */}
        <GlassCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Monitor className="w-5 h-5 mr-2 text-primary-400" />
              Viewport
            </h3>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {Object.entries(viewportSizes).map(([size, config]) => {
                const Icon = config.icon
                return (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewport(size as ViewportSize)}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      viewport === size
                        ? 'border-primary-500 bg-primary-500/20 text-primary-400'
                        : 'border-neutral-700 bg-neutral-800/50 text-neutral-400 hover:border-neutral-600'
                    }`}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-xs capitalize">{size}</div>
                  </motion.button>
                )
              })}
            </div>

            <div className="text-sm text-neutral-400">
              Size: {viewportSizes[viewport].width} × {viewportSizes[viewport].height}
            </div>
          </div>
        </GlassCard>

        {/* Display Options */}
        <GlassCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-primary-400" />
              Display
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Grid Overlay</span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowGrid(!showGrid)}
                  className={`w-10 h-6 rounded-full border-2 transition-all duration-300 ${
                    showGrid
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-neutral-600 bg-neutral-800'
                  }`}
                >
                  <motion.div
                    className="w-4 h-4 bg-white rounded-full"
                    animate={{ x: showGrid ? 16 : 2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Show Layers</span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLayers(!showLayers)}
                  className={`w-10 h-6 rounded-full border-2 transition-all duration-300 ${
                    showLayers
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-neutral-600 bg-neutral-800'
                  }`}
                >
                  <motion.div
                    className="w-4 h-4 bg-white rounded-full"
                    animate={{ x: showLayers ? 16 : 2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </motion.button>
              </div>

              <div>
                <label className="text-sm text-neutral-300 block mb-2">
                  Opacity: {opacity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${opacity}%, #374151 ${opacity}%, #374151 100%)`
                  }}
                />
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Theme and Color Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Color Presets */}
        <GlassCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2 text-primary-400" />
              Color Themes
            </h3>

            <div className="grid grid-cols-5 gap-3 mb-4">
              {colorPresets.map((preset, index) => (
                <motion.button
                  key={preset.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedPreset(index)}
                  className={`aspect-square rounded-lg border-2 transition-all duration-300 ${
                    selectedPreset === index
                      ? 'border-white scale-110'
                      : 'border-transparent hover:border-neutral-600'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${preset.primary}, ${preset.accent})`
                  }}
                >
                  <span className="sr-only">{preset.name}</span>
                </motion.button>
              ))}
            </div>

            <div className="text-sm text-neutral-400">
              Selected: {colorPresets[selectedPreset].name}
            </div>
          </div>
        </GlassCard>

        {/* Advanced Settings */}
        <GlassCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-primary-400" />
              Advanced
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Animation Speed</label>
                <input
                  type="number"
                  min="0.5"
                  max="3"
                  step="0.1"
                  defaultValue="1"
                  className="w-full h-12 px-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur"
                />
              </div>

              <div className="flex items-center space-x-3">
                <FrostButton>
                  <Code className="w-4 h-4 mr-2" />
                  Export Code
                </FrostButton>

                <FrostButton>
                  <Maximize className="w-4 h-4 mr-2" />
                  Fullscreen
                </FrostButton>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Quick Actions */}
      <GlassCard>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>

          <div className="flex flex-wrap gap-3">
            <FrostButton>
              Reset to Default
            </FrostButton>
            <FrostButton>
              Save Configuration
            </FrostButton>
            <FrostButton>
              Load Preset
            </FrostButton>
            <FrostButton>
              Apply Changes
            </FrostButton>
          </div>
        </div>
      </GlassCard>

      {/* Grid and Layers Overlay */}
      {showGrid && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="fixed inset-0 pointer-events-none z-40"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
      )}

      {showLayers && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-6 right-6 z-50"
        >
          <GlassCard>
            <div className="p-4 w-64">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                <Layers className="w-4 h-4 mr-2" />
                Layer Stack
              </h4>
              <div className="space-y-2">
                {['Header', 'Hero Section', 'Services', 'Testimonials', 'Footer'].map((layer, index) => (
                  <div key={layer} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-sm text-neutral-300">{layer}</span>
                    <div className="w-4 h-4 bg-primary-500 rounded opacity-60" />
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  )
}