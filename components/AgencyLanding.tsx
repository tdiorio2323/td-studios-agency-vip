"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { FrostButton, GhostButton, MiniFrost, MiniGhost } from './ui/Button';
import { GlassCard } from './ui/GlassCard';
import { cn } from '../lib/utils';

export default function AgencyLanding() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/contact');
  };
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Backdrop gradient / liquid glass blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Top-left blob - warmer gold tones */}
        <div className="absolute -top-48 -left-40 h-[52rem] w-[52rem] rounded-full bg-gradient-to-br from-gold-400/8 via-white/6 to-transparent blur-[96px] opacity-60" />
        {/* Bottom-right blob - cooler tones */}
        <div className="absolute -bottom-48 -right-32 h-[48rem] w-[48rem] rounded-full bg-gradient-to-tr from-white/12 via-white/6 to-transparent blur-[80px] opacity-70" />
        {/* Center accent blob */}
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-radial from-gold-400/10 to-transparent blur-[64px]" />
      </div>

      {/* Shimmer layer */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
        <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.15)_30%,rgba(255,255,255,0)_60%)] bg-[length:200%_100%]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-20 w-full">
        {/* Glass effect background */}
        <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-b from-black/80 via-black/70 to-black/60 border-b border-white/10 shadow-[0_1px_0_0_rgba(255,255,255,0.05),0_8px_32px_-8px_rgba(0,0,0,0.4)]" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            {/* Enhanced logo with better glass effect */}
            <div className="relative size-9 rounded-xl bg-gradient-to-br from-white/15 to-white/5 p-[1px] shadow-[0_0_24px_rgba(200,169,106,0.15)]">
              <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-br from-gold-400/30 via-white/10 to-transparent backdrop-blur" />
              <div className="relative h-full w-full rounded-[10px] bg-gradient-to-br from-white/20 to-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
            </div>
            <span className="font-semibold tracking-wide text-text-primary">
              TD STUDIOS <span className="text-text-secondary font-normal">Agency</span>
            </span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-text-secondary md:flex">
            <button className="nav-link focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-2 py-1 will-change-transform" onClick={() => {}}>Features</button>
            <button className="nav-link focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-2 py-1 will-change-transform" onClick={() => {}}>Showcase</button>
            <button className="nav-link focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-2 py-1 will-change-transform" onClick={() => {}}>Pricing</button>
            <button className="nav-link focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-2 py-1 will-change-transform" onClick={handleContactClick}>Contact</button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-3">
              <GhostButton aria-label="Sign into your account">Sign in</GhostButton>
              <FrostButton aria-label="Request access to the platform">Request Access</FrostButton>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="group md:hidden p-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileNavOpen}
            >
              <div className="w-5 h-4 relative">
                <span className={cn(
                  "absolute h-[2px] w-full bg-white rounded-full transition-all duration-300",
                  isMobileNavOpen ? 'rotate-45 top-[7px]' : 'top-0'
                )} />
                <span className={cn(
                  "absolute h-[2px] w-full bg-white rounded-full transition-all duration-300 top-[7px]",
                  isMobileNavOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                )} />
                <span className={cn(
                  "absolute h-[2px] w-full bg-white rounded-full transition-all duration-300",
                  isMobileNavOpen ? '-rotate-45 top-[7px]' : 'top-[14px]'
                )} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 md:hidden z-30 overflow-hidden"
            >
              <div className="p-6">
                <nav className="space-y-1 mb-6">
                  {['Features', 'Showcase', 'Pricing', 'Contact'].map((item, idx) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      className="block w-full text-left text-text-secondary hover:text-text-primary transition-colors py-3 px-4 rounded-lg hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-white/30"
                      onClick={item === 'Contact' ? handleContactClick : () => {}}
                    >
                      {item}
                    </motion.button>
                  ))}
                </nav>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="flex flex-col gap-3"
                >
                  <GhostButton aria-label="Sign into your account">Sign in</GhostButton>
                  <FrostButton aria-label="Request access to the platform">Request Access</FrostButton>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-20 pt-16 md:grid-cols-2">
        <div className="space-y-6">
          <Badge>Luxury · Transparent · Creator‑Owned</Badge>
          <h1 className="font-display text-4xl leading-luxury-tight tracking-tight md:text-6xl md:leading-luxury-tight text-text-primary font-semibold">
            Serious Inquiries Only —
            <span className="block mt-2 text-text-secondary font-normal"> Automated, Filtered, & In Your Control.</span>
          </h1>
          <p className="max-w-xl text-text-secondary leading-relaxed">
            Branded email, AI filtering, contracts, and deal flow — built for top female creators and models.
            Keep ownership. Keep clarity. We handle the noise.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <FrostButton aria-label="Get early access to TD Studios Agency platform">
              Get Early Access
            </FrostButton>
            <GhostButton aria-label="View demo of platform features">
              View Demo
            </GhostButton>
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-text-tertiary">
            <div className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 shadow-[0_0_6px_rgba(200,169,106,0.5)]" />
              <span className="tracking-wide">No lock‑ins</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 shadow-[0_0_6px_rgba(200,169,106,0.5)]" />
              <span className="tracking-wide">Transparent terms</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 shadow-[0_0_6px_rgba(200,169,106,0.5)]" />
              <span className="tracking-wide">Concierge optional</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-text-tertiary">Inbox · Jessica@tdstudiosagency.com</div>
                <div className="mt-1 text-lg font-medium text-text-primary">3 Serious Offers</div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.04] px-3 py-1 text-xs font-medium text-text-secondary shadow-[inset_0_0.5px_0_rgba(255,255,255,0.2)]">
                24h
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { title: "BeautyCo x Jessica — UGC + Reel", meta: "$3,500 · 2 weeks · Paid Net 15", priority: "high" },
                { title: "Luxury Swim · Story + Link", meta: "$1,200 · 3 posts · Affiliate bonus", priority: "medium" },
                { title: "Wellness App Ambassador", meta: "$5,000/mo retainer · 3 months", priority: "high" },
              ].map((i, idx) => (
                <div
                  key={idx}
                  className="group relative flex items-start justify-between rounded-xl border border-white/12 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-4 transition-all duration-300 hover:border-white/20 hover:from-white/[0.10] hover:to-white/[0.05] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_24px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
                >
                  {/* Priority indicator */}
                  <div className={cn(
                    "absolute left-3 top-3 size-2 rounded-full",
                    i.priority === "high"
                      ? "bg-gold-400 shadow-[0_0_8px_rgba(200,169,106,0.6)]"
                      : "bg-white/30"
                  )} />

                  <div className="pl-4">
                    <div className="font-medium text-text-primary group-hover:text-white transition-colors">{i.title}</div>
                    <div className="mt-1 text-xs text-text-tertiary">{i.meta}</div>
                  </div>
                  <div className="flex gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                    <MiniGhost>Hold</MiniGhost>
                    <MiniFrost>Open</MiniFrost>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="mt-4 p-5">
            <div className="mb-2 text-sm text-text-secondary">Filters</div>
            <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
              <Pill>Min Budget · $1,000+</Pill>
              <Pill>Categories · Beauty, Fashion</Pill>
              <Pill>Auto‑reject · Gmail/Yahoo</Pill>
              <Pill>Keywords · budget, timeline</Pill>
              <Pill>Notify · Daily digest</Pill>
              <Pill>Concierge · Off</Pill>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard title="Branded Email" body="Own your presence with name@tdstudiosagency.com — elevate beyond ‘gmail in bio’." />
          <FeatureCard title="Serious‑Only Inbox" body="AI filters spam and unserious pitches. See the best deals, fast." />
          <FeatureCard title="Contracts & Deals" body="Templates + e‑sign + tracking. Transparent terms. Optional concierge negotiation." />
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl">Simple, flexible tiers</h2>
          <p className="mt-2 text-white/60">Start lean — add concierge when you’re ready.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <PlanCard tier="Essential" price="$49/mo" bullets={["Branded email","AI filtering","Daily digest"]} cta="Start" />
          <PlanCard tier="Pro" price="$149/mo" bullets={["Everything in Essential","Contract templates","Priority support"]} cta="Upgrade" highlight />
          <PlanCard tier="Concierge" price="10% of deals" bullets={["Brand pitching","Negotiation","White‑glove management"]} cta="Talk to us" />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-gradient-to-b from-transparent to-black/40">
        {/* Top gradient border accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-sm text-text-secondary tracking-wide">
              © 2024 TD Studios Agency
            </span>
            <span className="text-xs text-text-tertiary">
              Your agency, your control.
            </span>
          </div>

          <nav className="flex gap-8 text-sm">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                className="relative text-text-secondary hover:text-text-primary transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-gold-400/60 after:to-white/40 hover:after:w-full after:transition-all after:duration-300"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </footer>

      {/* Local styles for shimmer + glass tokens */}
      <style jsx global>{`
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .animate-shimmer {
          animation: shimmer 14s ease-in-out infinite;
          will-change: background-position;
          transform: translateZ(0);
        }
        .nav-link {
          position: relative;
          transform: translateZ(0);
          backface-visibility: hidden;
          transition: color 0.3s ease-out;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0;
          height: 1.5px;
          background: linear-gradient(90deg, rgba(200,169,106,0.8), rgba(255,255,255,0.6));
          box-shadow: 0 0 8px rgba(200,169,106,0.4);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: width;
        }
        .nav-link:hover {
          color: rgba(255, 255, 255, 0.95);
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </div>
  );
}



function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.04] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-text-secondary backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
      <span className="relative size-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(200,169,106,0.6),0_0_2px_rgba(200,169,106,1)]">
        <span className="absolute inset-0 rounded-full bg-gold-400 animate-ping opacity-40" />
      </span>
      {children}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/12 bg-gradient-to-br from-white/[0.06] to-white/[0.03] px-3.5 py-1.5 text-xs text-text-secondary backdrop-blur shadow-[inset_0_0.5px_0_rgba(255,255,255,0.12)] transition-all duration-200 hover:border-white/20 hover:from-white/[0.08] hover:to-white/[0.04]">
      {children}
    </span>
  );
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <GlassCard
      className="group p-7 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_12px_40px_rgba(0,0,0,0.5)]"
      hover
      gradient
    >
      <div className="mb-3 text-lg font-semibold text-text-primary group-hover:text-white transition-colors tracking-tight">
        {title}
      </div>
      <p className="text-sm leading-relaxed text-text-secondary">
        {body}
      </p>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </GlassCard>
  );
}

function PlanCard({
  tier,
  price,
  bullets,
  cta,
  highlight = false
}: {
  tier: string;
  price: string;
  bullets: string[];
  cta: string;
  highlight?: boolean;
}) {
  return (
    <GlassCard
      className={cn(
        "relative p-8 transition-all duration-500",
        highlight && [
          // Enhanced highlight treatment
          "ring-2 ring-gold-400/40",
          "shadow-[0_0_32px_rgba(200,169,106,0.15),inset_0_1px_2px_rgba(255,255,255,0.2)]",
          "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-gold-400/10 before:to-transparent before:-z-10"
        ]
      )}
      hover
    >
      {/* "Most Popular" badge for highlighted plan */}
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-[10px] font-semibold uppercase tracking-wider text-black shadow-[0_4px_16px_rgba(200,169,106,0.4)]">
          Most Popular
        </div>
      )}

      <div className="mb-2 text-sm font-medium text-text-tertiary uppercase tracking-wider">
        {tier}
      </div>

      {/* Enhanced price display */}
      <div className="mb-6">
        <div className="font-display text-4xl font-semibold text-text-primary tracking-tight">
          {price}
        </div>
        {tier === "Concierge" && (
          <div className="mt-1 text-xs text-text-tertiary">negotiated per partnership</div>
        )}
      </div>

      {/* Refined bullet list */}
      <ul className="mb-8 space-y-3 text-sm text-text-secondary">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1.5 size-1.5 rounded-full bg-gold-400 shadow-[0_0_6px_rgba(200,169,106,0.6)] flex-shrink-0" />
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>

      <FrostButton
        aria-label={`Choose ${tier} plan`}
        className="w-full justify-center"
      >
        {cta}
      </FrostButton>
    </GlassCard>
  );
}
