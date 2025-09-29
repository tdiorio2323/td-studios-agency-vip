"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FrostButton, GhostButton, MiniFrost, MiniGhost } from './ui/Button';
import { GlassCard } from './ui/GlassCard';

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
        <div className="absolute -top-40 -left-32 h-[48rem] w-[48rem] rounded-full bg-gradient-to-br from-white/10 via-white/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-[42rem] w-[42rem] rounded-full bg-gradient-to-tr from-white/10 via-white/5 to-transparent blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-white/5 blur-2xl" />
      </div>

      {/* Shimmer layer */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
        <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.15)_30%,rgba(255,255,255,0)_60%)] bg-[length:200%_100%]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-20 w-full backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-white/10 p-[2px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.2)]">
              <div className="h-full w-full rounded-lg bg-gradient-to-br from-white/30 to-white/0" />
            </div>
            <span className="font-semibold tracking-wide">TD STUDIOS <span className="text-text-secondary">Agency</span></span>
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
              className="md:hidden p-2 rounded-lg border border-white/15 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileNavOpen}
            >
              <div className="w-5 h-5 relative">
                <span className={`absolute h-0.5 w-full bg-white transition-all duration-300 ${isMobileNavOpen ? 'rotate-45 top-2' : 'top-1'}`} />
                <span className={`absolute h-0.5 w-full bg-white transition-all duration-300 top-2 ${isMobileNavOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute h-0.5 w-full bg-white transition-all duration-300 ${isMobileNavOpen ? '-rotate-45 top-2' : 'top-3'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMobileNavOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden z-30">
            <nav className="space-y-4 mb-6">
              <button className="block text-text-secondary hover:text-text-primary transition-colors py-2 focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-2 will-change-transform" onClick={() => {}}>Features</button>
              <button className="block text-text-secondary hover:text-text-primary transition-colors py-2 focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-2 will-change-transform" onClick={() => {}}>Showcase</button>
              <button className="block text-text-secondary hover:text-text-primary transition-colors py-2 focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-2 will-change-transform" onClick={() => {}}>Pricing</button>
              <button className="block text-text-secondary hover:text-text-primary transition-colors py-2 focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-2 will-change-transform" onClick={handleContactClick}>Contact</button>
            </nav>
            <div className="flex flex-col gap-3">
              <GhostButton aria-label="Sign into your account">Sign in</GhostButton>
              <FrostButton aria-label="Request access to the platform">Request Access</FrostButton>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-20 pt-16 md:grid-cols-2">
        <div className="space-y-6">
          <Badge>Luxury · Transparent · Creator‑Owned</Badge>
          <h1 className="font-display text-4xl leading-tight md:text-6xl text-text-primary">
            Serious Inquiries Only —
            <span className="text-text-secondary"> Automated, Filtered, & In Your Control.</span>
          </h1>
          <p className="max-w-xl text-text-secondary">
            Branded email, AI filtering, contracts, and deal flow — built for top female creators and models.
            Keep ownership. Keep clarity. We handle the noise.
          </p>
          <div className="flex flex-wrap gap-3">
            <FrostButton aria-label="Get early access to TD Studios Agency platform">Get Early Access</FrostButton>
            <GhostButton aria-label="View demo of platform features">View Demo</GhostButton>
          </div>
          <div className="flex items-center gap-6 pt-2 text-xs text-text-tertiary">
            <div className="flex items-center gap-2"><Dot /> No lock‑ins</div>
            <div className="flex items-center gap-2"><Dot /> Transparent terms</div>
            <div className="flex items-center gap-2"><Dot /> Concierge optional</div>
          </div>
        </div>

        <div className="relative">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-text-tertiary">Inbox · Jessica@tdstudiosagency.com</div>
                <div className="mt-1 text-lg font-medium text-text-primary">3 Serious Offers</div>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-secondary">24h</span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { title: "BeautyCo x Jessica — UGC + Reel", meta: "$3,500 · 2 weeks · Paid Net 15" },
                { title: "Luxury Swim · Story + Link", meta: "$1,200 · 3 posts · Affiliate bonus" },
                { title: "Wellness App Ambassador", meta: "$5,000/mo retainer · 3 months" },
              ].map((i, idx) => (
                <div key={idx} className="group flex items-start justify-between rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
                  <div>
                    <div className="font-medium text-text-primary">{i.title}</div>
                    <div className="text-xs text-text-tertiary">{i.meta}</div>
                  </div>
                  <div className="flex gap-2 opacity-80">
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
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
          <span className="text-sm text-white/60">© TD Studios Agency. Your agency, your control.</span>
          <div className="flex gap-6 text-sm text-white/60">
            <a>Privacy</a>
            <a>Terms</a>
            <a>Contact</a>
          </div>
        </div>
      </footer>

      {/* Local styles for shimmer + glass tokens */}
      <style jsx global>{`
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .animate-shimmer { animation: shimmer 6s linear infinite; }
        .nav-link {
          position: relative;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0;
          height: 1px;
          background: rgba(255,255,255,.6);
          transition: width 0.2s ease-out;
          will-change: width;
        }
        .nav-link:hover::after { width: 100%; }
      `}</style>
    </div>
  );
}



function Dot() {
  return <span className="inline-block size-1.5 rounded-full bg-white/60" />;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-wide text-text-secondary backdrop-blur">
      <span className="size-1.5 rounded-full bg-gold-400" />
      {children}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-secondary backdrop-blur">
      {children}
    </span>
  );
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <GlassCard className="p-6" hover>
      <div className="mb-2 text-text-primary font-medium">{title}</div>
      <p className="text-sm text-text-secondary">{body}</p>
    </GlassCard>
  );
}

function PlanCard({ tier, price, bullets, cta, highlight = false }: { tier: string; price: string; bullets: string[]; cta: string; highlight?: boolean }) {
  return (
    <GlassCard className={`p-6 ${highlight ? "ring-1 ring-gold-400/30" : ""}`} hover>
      <div className="mb-1 text-sm text-text-tertiary">{tier}</div>
      <div className="mb-4 font-display text-3xl text-text-primary">{price}</div>
      <ul className="mb-6 space-y-2 text-sm text-text-secondary">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2"><span className="mt-1 size-1.5 rounded-full bg-gold-400" />{b}</li>
        ))}
      </ul>
      <FrostButton aria-label={`Choose ${tier} plan`}>{cta}</FrostButton>
    </GlassCard>
  );
}
