import Link from 'next/link'

export default function ContactSuccessPage() {
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

      {/* Success Content */}
      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur">
            <svg className="size-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
            Message Sent!
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
            Thank you for reaching out to TD Studios Agency. We've received your message and will reply within 24 hours.
          </p>

          {/* Next Steps */}
          <div className="max-w-2xl mx-auto">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl mb-8">
              <h2 className="text-2xl font-semibold mb-6">What Happens Next?</h2>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-4">
                  <div className="flex size-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur shrink-0 mt-1">
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Message Review</h3>
                    <p className="text-white/70 text-sm">Our team will review your project details and requirements carefully.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur shrink-0 mt-1">
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Initial Response</h3>
                    <p className="text-white/70 text-sm">You'll receive a personal response from Tyler within 24 hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur shrink-0 mt-1">
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Discovery Call</h3>
                    <p className="text-white/70 text-sm">We'll schedule a call to discuss your vision and create a custom proposal.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur mb-8">
              <h3 className="font-semibold mb-4">Need Immediate Assistance?</h3>
              <div className="flex items-center justify-center gap-6 text-sm">
                <a href="mailto:tyler@tdstudiosny.com" className="text-white/70 hover:text-white transition-colors">
                  tyler@tdstudiosny.com
                </a>
                <span className="text-white/40">|</span>
                <span className="text-white/70">Based in New York, NY</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-white/20 to-white/10 border border-white/20 backdrop-blur-sm text-white font-medium hover:from-white/25 hover:to-white/15 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all duration-200"
              >
                Return to Home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur text-white/90 font-medium hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all duration-200"
              >
                Send Another Message
              </Link>
            </div>
          </div>
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