'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const formData = new FormData(e.currentTarget)

      const response = await fetch('https://formspree.io/f/mwprljle', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        e.currentTarget.reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative z-40 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur">
              <div className="size-3 rounded-sm bg-gradient-to-br from-white to-white/60" />
            </div>
            <span className="font-semibold tracking-wide">TD STUDIOS <span className="text-white/75">Agency</span></span>
          </Link>

          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white/90 transition-colors px-4 py-2 rounded-md hover:bg-white/5"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Contact Form */}
      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Ready to transform your vision into reality? Let's discuss your project and explore how we can help you achieve extraordinary results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <h2 className="text-2xl font-semibold mb-6">Let's Connect</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur shrink-0">
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-white/70">tyler@tdstudiosny.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur shrink-0">
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Location</h3>
                    <p className="text-white/70">New York, NY</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur shrink-0">
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Response Time</h3>
                    <p className="text-white/70">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur">
              <h3 className="font-semibold mb-3">What to Expect</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-white/60" />
                  Detailed project consultation
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-white/60" />
                  Custom solution proposal
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-white/60" />
                  Transparent pricing
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-white/60" />
                  Ongoing support
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full border border-green-500/30 bg-green-500/20">
                      <svg className="size-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-green-400">Message Sent!</h3>
                      <p className="text-sm text-green-300/80">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/10 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full border border-red-500/30 bg-red-500/20">
                      <svg className="size-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-red-400">Message Failed</h3>
                      <p className="text-sm text-red-300/80">Sorry, there was an error sending your message. Please try again or email us directly.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company <span className="text-white/50">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-colors"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur text-white focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-colors"
                  >
                    <option value="">Select a project type</option>
                    <option value="web-development">Web Development</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="branding">Branding & Identity</option>
                    <option value="consulting">Strategy & Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur text-white focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-colors"
                  >
                    <option value="">Select your budget</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="over-100k">$100,000+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-colors resize-vertical"
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-white/20 to-white/10 border border-white/20 backdrop-blur-sm text-white font-medium hover:from-white/25 hover:to-white/15 focus:outline-none focus:ring-1 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>

                <p className="text-xs text-white/60 text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="text-center">
            <p className="text-sm text-white/60">
              © 2025 TD Studios Agency. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}