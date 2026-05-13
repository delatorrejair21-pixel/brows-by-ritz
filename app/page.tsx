"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const BeforeAfterSlider = dynamic(() => import("@/components/BeforeAfterSlider"), { ssr: false });

// ─── SHARED STYLE HELPERS ────────────────────────────────────────────────────

const GOLD = { background: "linear-gradient(135deg,#C9A84C,#E8C97A,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } as const;

function GoldText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span style={GOLD} className={className}>{children}</span>;
}

// ─── ICONS ──────────────────────────────────────────────────────────────────

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronDown({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Services & Pricing", href: "#services" },
    { label: "Reviews", href: "#reviews" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg border-b border-black/6 shadow-sm shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand */}
          <a href="#home" className="flex flex-col leading-tight group">
            <span
              className="text-base md:text-lg font-bold tracking-wider"
              style={{ fontFamily: "var(--font-cormorant)", ...GOLD }}
            >
              Brows by Ritz
            </span>
            <span className="text-[9px] text-[#AAA] tracking-[0.3em] uppercase font-medium mt-0.5">
              Luxury Brow &amp; Lip Artist
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#666] hover:text-[#C9A84C] transition-colors tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Book CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#book"
              className="hidden sm:inline-flex items-center gap-2 text-[#0A0A0A] font-bold text-sm px-5 py-2.5 rounded-full transition-all hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)", boxShadow: "0 4px 20px rgba(201,168,76,0.30)" }}
            >
              Book Appointment
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-[#666] hover:text-[#111] hover:bg-black/5 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-black/6 bg-white/98 backdrop-blur-xl">
            <div className="py-5 px-2 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-[#555] hover:text-[#C9A84C] hover:bg-black/3 rounded-xl transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#book"
                onClick={() => setMenuOpen(false)}
                className="mt-3 flex items-center justify-center font-bold text-sm px-5 py-3.5 rounded-full text-[#0A0A0A]"
                style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}
              >
                Book Appointment
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  const badges = [
    { label: "Luxury Brow Artist" },
    { label: "Ombré & Nano Brows" },
    { label: "Lip Blush" },
    { label: "$50 Deposit Required" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F7F5F2]">
      {/*
        HERO BACKGROUND PHOTO
        To add a background image, uncomment and set path:
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      */}
      {/* <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} /> */}

      {/* Light overlay to keep text legible over a photo */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #F7F5F2 0%, rgba(247,245,242,0.15) 40%, rgba(247,245,242,0.55) 80%, #F7F5F2 100%)", zIndex: 1 }}
      />

      {/* Warm gold radial glow */}
      <div
        className="absolute animate-warm-pulse pointer-events-none"
        style={{
          zIndex: 2,
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          height: "70%",
          background: "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.22) 0%, rgba(200,130,60,0.07) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Very subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage:
            "linear-gradient(rgba(180,140,60,1) 1px, transparent 1px), linear-gradient(90deg, rgba(180,140,60,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center py-36 pt-44" style={{ zIndex: 3 }}>

        <p
          className="text-[#C9A84C] text-xs sm:text-sm tracking-[0.35em] uppercase font-semibold mb-5 animate-fade-up"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          Brows by Ritz
        </p>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-7 tracking-tight text-[#111] animate-fade-up-d1"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Luxury Brows &amp; Lip Blush{" "}
          <br className="hidden sm:block" />
          <em className="font-medium not-italic" style={GOLD}>
            Designed to Enhance
          </em>
          <br className="hidden sm:block" />
          Your Natural Beauty
        </h1>

        <p className="text-base sm:text-lg text-[#666] max-w-2xl mx-auto mb-11 leading-relaxed animate-fade-up-d2">
          Specializing in ombré brows, nano brows, combo brows, touchups, and lip blush
          services with a soft, elegant, customized finish.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-fade-up-d3">
          <a
            href="#book"
            className="inline-flex items-center justify-center gap-2 font-bold text-base px-9 py-4 rounded-full text-[#0A0A0A] transition-all hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)", boxShadow: "0 6px 30px rgba(201,168,76,0.32)" }}
          >
            Book Appointment
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 font-bold text-base px-9 py-4 rounded-full border border-black/12 text-[#333] hover:border-[#C9A84C]/60 hover:text-[#C9A84C] transition-all bg-white/60 backdrop-blur-sm"
          >
            View Services
          </a>
        </div>

        {/* Premium badges */}
        <div className="flex flex-wrap gap-2.5 justify-center animate-fade-up-d4">
          {badges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-[#C9A84C]/25 text-[#555] text-[11px] sm:text-xs font-medium px-4 py-2 rounded-full shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0" />
              {b.label}
            </span>
          ))}
        </div>

        {/* Scroll nudge */}
        <div className="mt-20 flex flex-col items-center gap-2 opacity-25">
          <span className="text-[10px] text-[#888] tracking-[0.3em] uppercase">Scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ─── BEFORE / AFTER SECTION ──────────────────────────────────────────────────

function BeforeAfterSection() {
  return (
    <section id="before-after" className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-semibold mb-4">
            Transformations
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-light mb-5 leading-tight text-[#111]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            See the <GoldText>Transformation</GoldText>
          </h2>
          <p className="text-[#777] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Preview the difference a custom brow or lip enhancement can make.
          </p>
        </div>

        {/*
          REPLACE IMAGES BELOW:
          beforeImage="/images/brows-before.jpg"
          afterImage="/images/brows-after.jpg"
        */}
        <BeforeAfterSlider
          beforeImage="/images/eyebefore.png"
          afterImage="/images/eyeafter.png"
          beforeAlt="Brows before treatment"
          afterAlt="Brows after ombré enhancement"
          initialPosition={42}
        />
        <p className="text-center text-[#BBB] text-xs mt-5 tracking-wide">
          Ombré brow transformation — drag the handle to reveal
        </p>

        {/* Lip Blush Slider */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-semibold mb-2">Lip Blush</p>
            <p className="text-[#AAA] text-sm">See the soft definition a lip blush creates</p>
          </div>

          {/*
            REPLACE IMAGES BELOW:
            beforeImage="/images/lip-before.jpg"
            afterImage="/images/lip-after.jpg"
          */}
          <BeforeAfterSlider
            beforeImage="/images/lipbefore.png"
            afterImage="/images/lipafter.png"
            beforeAlt="Lips before lip blush treatment"
            afterAlt="Lips after lip blush treatment"
            initialPosition={50}
          />
          <p className="text-center text-[#BBB] text-xs mt-5 tracking-wide">
            Lip blush transformation — natural tint &amp; definition
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES & PRICING ──────────────────────────────────────────────────────

function Services() {
  const services = [
    {
      name: "Microshading / Ombré Brows",
      price: "$400",
      category: "Brows",
      desc: "Soft shaded brows with a polished ombré finish for a filled-in but natural look.",
      badge: "Most Requested",
    },
    {
      name: "Nano Brows",
      price: "$600",
      category: "Brows",
      desc: "Fine hair-like strokes designed for a realistic, natural brow appearance.",
      badge: "Premium",
    },
    {
      name: "Combo Brows",
      price: "$500",
      category: "Brows",
      desc: "A blend of nano strokes and microshading for definition, texture, and softness.",
      badge: "Nano + Shading",
    },
    {
      name: "Brow Touchups",
      price: "$120",
      category: "Brows",
      desc: "Refresh and perfect your brows after the initial healing period or as maintenance.",
      badge: null,
    },
    {
      name: "Lip Blush",
      price: "$500",
      category: "Lips",
      desc: "A soft lip tint enhancement designed to improve shape, color, and natural definition.",
      badge: "Client Favorite",
    },
    {
      name: "Lip Refresh",
      price: "$250",
      category: "Lips",
      desc: "Refresh existing lip blush color and restore softness and vibrance.",
      badge: null,
    },
    {
      name: "Black Face Doll",
      price: "$500",
      category: "Advanced",
      desc: "A full-face permanent makeup look designed to enhance and define your features with a bold, flawless finish.",
      badge: null,
    },
    {
      name: "Tattoo Removal",
      price: "$80 / 3 sq in",
      category: "Removal",
      desc: "Safe and effective tattoo removal priced per 3 square inches per session.",
      badge: null,
    },
    {
      name: "Brow Removal",
      price: "$150 / session",
      category: "Removal",
      desc: "Professional removal of previous brow work to restore your natural brows or prepare for a fresh enhancement.",
      badge: null,
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#F7F5F2]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-semibold mb-4">
            Services &amp; Pricing
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-light mb-5 leading-tight text-[#111]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Crafted for <GoldText>Your Unique Beauty</GoldText>
          </h2>
          <p className="text-[#777] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Every service is tailored to your face shape, skin tone, and desired finish — nothing generic, nothing rushed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.name}
              className="group relative flex flex-col bg-white rounded-2xl p-7 transition-all duration-300 gold-card hover:shadow-xl"
            >
              {/* Category tag */}
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#BBB] mb-5">
                {s.category}
              </span>

              {/* Badge */}
              {s.badge && (
                <span
                  className="absolute top-6 right-6 text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                  style={{ color: "#C9A84C", background: "rgba(201,168,76,0.10)", border: "1px solid rgba(201,168,76,0.28)" }}
                >
                  {s.badge}
                </span>
              )}

              {/* Service name */}
              <h3
                className="text-xl sm:text-2xl font-light leading-snug mb-3 text-[#111] group-hover:text-[#9A7A2E] transition-colors"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {s.name}
              </h3>

              {/* Price */}
              <p
                className="text-3xl font-semibold mb-4"
                style={{ fontFamily: "var(--font-cormorant)", ...GOLD }}
              >
                {s.price}
              </p>

              {/* Description */}
              <p className="text-[#777] text-sm leading-relaxed flex-1 mb-7">{s.desc}</p>

              {/* Gold bottom accent on hover */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

              {/* Book button */}
              <a
                href="#book"
                className="inline-flex items-center justify-center text-sm font-semibold py-3 px-6 rounded-full border border-[#C9A84C]/40 text-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-200 mt-auto"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg,#C9A84C,#E8C97A)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#0A0A0A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "";
                  (e.currentTarget as HTMLAnchorElement).style.color = "";
                }}
              >
                Book This Service
              </a>
            </div>
          ))}
        </div>

        {/* Deposit notice */}
        <div className="mt-12 flex items-start sm:items-center gap-3 max-w-xl mx-auto bg-white rounded-2xl px-6 py-5 border border-[#C9A84C]/20 shadow-sm">
          <span className="text-[#C9A84C] text-lg shrink-0">✦</span>
          <p className="text-[#777] text-sm leading-relaxed">
            A <span className="text-[#C9A84C] font-semibold">$50 deposit</span> is required at the time of booking to secure your appointment. Remaining balance is due at your appointment.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── REVIEWS ─────────────────────────────────────────────────────────────────

function Reviews() {
  const reviews = [
    {
      quote: "My brows look so soft and natural. Exactly what I wanted. I get compliments every single day.",
      service: "Ombré Brows",
      initials: "AM",
    },
    {
      quote: "The whole experience felt professional, clean, and luxurious. She made me feel so at ease.",
      service: "Nano Brows",
      initials: "JR",
    },
    {
      quote: "I finally wake up with brows that look done but still natural. It's completely changed my morning routine.",
      service: "Combo Brows",
      initials: "KT",
    },
    {
      quote: "My lip blush came out so perfect. The shape and color she chose for me is just flawless.",
      service: "Lip Blush",
      initials: "SD",
    },
    {
      quote: "She listened to exactly what I wanted and delivered beyond my expectations. Will be back for my touchup.",
      service: "Brow Touchup",
      initials: "LM",
    },
    {
      quote: "The attention to detail is unmatched. My brows frame my face in a way I've always dreamed of.",
      service: "Nano Brows",
      initials: "NB",
    },
  ];

  return (
    <section id="reviews" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-semibold mb-4">
            Client Love
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-light mb-5 leading-tight text-[#111]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Words from <GoldText>Our Clients</GoldText>
          </h2>
          <p className="text-[#777] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Real experiences from real clients who trusted Brows by Ritz with their look.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="group relative flex flex-col bg-[#FDFCFA] rounded-2xl p-7 gold-card transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, si) => (
                  <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="#C9A84C">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              {/* Opening quote mark */}
              <div
                className="text-5xl leading-none mb-2 -mt-1 select-none"
                style={{ color: "rgba(201,168,76,0.25)", fontFamily: "var(--font-cormorant)" }}
              >
                &ldquo;
              </div>

              {/* Quote */}
              <blockquote
                className="text-[#222] font-light text-lg leading-relaxed flex-1 mb-6"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {r.quote}
              </blockquote>

              {/* Client info */}
              <div className="flex items-center gap-3 pt-5 border-t border-[#F0EDE6]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#C9A84C] font-bold text-xs shrink-0"
                  style={{ background: "rgba(201,168,76,0.10)", border: "1px solid rgba(201,168,76,0.28)" }}
                >
                  {r.initials}
                </div>
                <div>
                  <p className="text-[#444] text-xs font-semibold tracking-wide">Verified Client</p>
                  <p className="text-[#AAA] text-xs">{r.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-[#AAA] text-sm mb-6">Ready to write your own story?</p>
          <a
            href="#book"
            className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full text-[#0A0A0A] transition-all hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)", boxShadow: "0 6px 24px rgba(201,168,76,0.28)" }}
          >
            Book Your Appointment
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── BOOKING SECTION ─────────────────────────────────────────────────────────

const SERVICES_LIST = [
  "Microshading / Ombré Brows — $400",
  "Nano Brows — $600",
  "Combo Brows — $500",
  "Brow Touchup — $120",
  "Lip Blush — $500",
  "Lip Refresh — $250",
  "Black Face Doll — $500",
  "Tattoo Removal — $80 / 3 sq in",
  "Brow Removal — $150 / session",
];

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Card",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: "apple",
    label: "Apple Pay",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.18 1.27-2.16 3.79.03 3 2.66 4 2.69 4.01l-.08.27zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
  {
    id: "cashapp",
    label: "Cash App",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.5 2C6.71 2 2 6.71 2 12.5S6.71 23 12.5 23 23 18.29 23 12.5 18.29 2 12.5 2zm1.02 13.98c-.22.74-.84 1.27-1.6 1.44v.58a.5.5 0 01-1 0v-.58c-.9-.2-1.62-.83-1.87-1.67a.5.5 0 01.96-.28c.16.55.65.93 1.24.96V14.5c-1.11-.26-2-.98-2-2 0-1.1.98-1.85 2-2.02v-.48a.5.5 0 011 0v.48c.76.15 1.38.67 1.61 1.38a.5.5 0 01-.96.28c-.13-.42-.5-.7-.95-.75v1.86c1.06.24 1.96.94 1.96 2.01 0 .25-.04.5-.12.72h-.27zm-.41-3.45c-.26-.08-.53-.14-.81-.18v-1.78c.43.1.78.42.81.9v1.06zm-1.81 2.68v1.82c-.48-.11-.84-.47-.84-.97 0-.43.33-.76.84-.85z" />
      </svg>
    ),
  },
  {
    id: "zelle",
    label: "Zelle",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6l9 6-9 6V6z" fill="currentColor" stroke="none" />
        <path d="M21 6l-9 6 9 6V6z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

function getMonthMatrix(year: number, month: number): (number | null)[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(firstDay).fill(null);

  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

function isDayAvailable(year: number, month: number, day: number): boolean {
  const dow = new Date(year, month, day).getDay();
  return (dow >= 1 && dow <= 5) || dow === 0;
}

function getSlotsForDay(year: number, month: number, day: number): string[] {
  const dow = new Date(year, month, day).getDay();
  if (dow >= 1 && dow <= 5) return ["10:00 AM – 12:00 PM", "12:00 PM – 2:00 PM", "2:00 PM – 4:00 PM"];
  if (dow === 0) return ["4:00 PM – 6:00 PM"];
  return [];
}

function Booking() {
  const TODAY = new Date(2026, 4, 12);
  const [selectedService, setSelectedService] = useState(SERVICES_LIST[0]);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [calYear, setCalYear] = useState(TODAY.getFullYear());
  const [calMonth, setCalMonth] = useState(TODAY.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });

  const weeks = getMonthMatrix(calYear, calMonth);
  const monthLabel = new Date(calYear, calMonth, 1).toLocaleString("default", { month: "long", year: "numeric" });
  const slots = selectedDate ? getSlotsForDay(calYear, calMonth, selectedDate) : [];

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
    setSelectedDate(null); setSelectedSlot(null);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
    setSelectedDate(null); setSelectedSlot(null);
  };

  return (
    <section id="book" className="py-24 md:py-32 bg-[#F7F5F2] relative overflow-hidden">
      {/* Subtle warm glow at top */}
      <div
        className="absolute inset-x-0 top-0 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-semibold mb-4">
            Book Online
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-light mb-4 leading-tight text-[#111]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Reserve Your <GoldText>Appointment</GoldText>
          </h2>
          <p className="text-[#777] text-sm max-w-lg mx-auto leading-relaxed mb-3">
            Select your service, choose a date and time, and complete your details below.
          </p>
          <span
            className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
            style={{ color: "#C9A84C", border: "1px solid rgba(201,168,76,0.30)", background: "rgba(201,168,76,0.07)" }}
          >
            ✦ Prototype — Not Yet Live
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT: Service + Calendar */}
          <div className="space-y-6">
            {/* Service selector */}
            <div className="bg-white rounded-2xl p-6 border border-[#EAE7E0] shadow-sm">
              <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-[#AAA] mb-3">
                Select Service
              </label>
              <div className="relative">
                <button
                  onClick={() => setServiceOpen(!serviceOpen)}
                  className="w-full flex items-center justify-between bg-[#F7F5F2] border border-[#E5E2DA] hover:border-[#C9A84C]/50 text-[#111] text-sm font-medium px-4 py-3.5 rounded-xl transition-colors text-left"
                >
                  <span>{selectedService}</span>
                  <ChevronDown />
                </button>
                {serviceOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E5E2DA] rounded-xl overflow-hidden z-30 shadow-xl shadow-black/8">
                    {SERVICES_LIST.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setSelectedService(s); setServiceOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between ${
                          selectedService === s
                            ? "text-[#C9A84C] bg-[#C9A84C]/5"
                            : "text-[#555] hover:text-[#111] hover:bg-[#F7F5F2]"
                        }`}
                      >
                        {s}
                        {selectedService === s && <CheckIcon />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-2xl p-6 border border-[#EAE7E0] shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full text-[#BBB] hover:text-[#111] hover:bg-black/5 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <p className="text-sm font-semibold text-[#111] tracking-wide">{monthLabel}</p>
                <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full text-[#BBB] hover:text-[#111] hover:bg-black/5 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-7 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-center text-[9px] font-bold tracking-widest uppercase text-[#BBB] py-1">{d}</div>
                ))}
              </div>

              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7">
                  {week.map((day, di) => {
                    if (!day) return <div key={di} />;
                    const available = isDayAvailable(calYear, calMonth, day);
                    const isPast = calYear === TODAY.getFullYear() && calMonth === TODAY.getMonth() && day < TODAY.getDate();
                    const isSelected = selectedDate === day;
                    const isToday = calYear === TODAY.getFullYear() && calMonth === TODAY.getMonth() && day === TODAY.getDate();

                    return (
                      <button
                        key={di}
                        disabled={!available || isPast}
                        onClick={() => { setSelectedDate(day); setSelectedSlot(null); }}
                        className={`relative aspect-square flex items-center justify-center text-xs font-medium rounded-lg m-0.5 transition-all ${
                          isSelected
                            ? "text-[#0A0A0A] font-bold"
                            : !available || isPast
                            ? "text-[#DDD] cursor-not-allowed"
                            : "text-[#333] hover:bg-black/5"
                        }`}
                        style={isSelected ? { background: "linear-gradient(135deg,#C9A84C,#E8C97A)" } : undefined}
                      >
                        {day}
                        {isToday && !isSelected && (
                          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C9A84C]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}

              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#F0EDE6]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }} />
                  <span className="text-[10px] text-[#AAA]">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                  <span className="text-[10px] text-[#AAA]">Today</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-black/6 border border-[#E8E4DC]" />
                  <span className="text-[10px] text-[#AAA]">Available</span>
                </div>
              </div>
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div className="bg-white rounded-2xl p-6 border border-[#EAE7E0] shadow-sm">
                <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-[#AAA] mb-4">
                  Available Time Slots
                </label>
                <div className="flex flex-col gap-2.5">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                        selectedSlot === slot
                          ? "text-[#0A0A0A] font-bold"
                          : "text-[#444] bg-[#F7F5F2] border border-[#E5E2DA] hover:border-[#C9A84C]/40 hover:text-[#111]"
                      }`}
                      style={selectedSlot === slot ? { background: "linear-gradient(135deg,#C9A84C,#E8C97A)", border: "1px solid transparent" } : undefined}
                    >
                      {slot}
                      {selectedSlot === slot && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-[#AAA] text-xs mt-4 leading-relaxed">
                  Each appointment is a <span className="text-[#888]">2-hour session</span>. Please arrive 5 minutes early.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: Client info + payment */}
          <div className="space-y-6">
            {/* Client info form */}
            <div className="bg-white rounded-2xl p-6 border border-[#EAE7E0] shadow-sm">
              <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-[#AAA] mb-5">
                Your Information
              </label>
              <div className="space-y-4">
                {[
                  { key: "name", label: "Full Name", placeholder: "Your name", type: "text" },
                  { key: "phone", label: "Phone Number", placeholder: "(555) 000-0000", type: "tel" },
                  { key: "email", label: "Email Address", placeholder: "you@email.com", type: "email" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-[11px] text-[#888] font-medium tracking-wide mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full bg-[#F7F5F2] border border-[#E5E2DA] focus:border-[#C9A84C]/50 outline-none text-[#111] text-sm px-4 py-3 rounded-xl placeholder-[#CCC] transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[11px] text-[#888] font-medium tracking-wide mb-1.5">Notes / Special Requests</label>
                  <textarea
                    rows={3}
                    placeholder="Any allergies, skin concerns, or preferences..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-[#F7F5F2] border border-[#E5E2DA] focus:border-[#C9A84C]/50 outline-none text-[#111] text-sm px-4 py-3 rounded-xl placeholder-[#CCC] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl p-6 border border-[#EAE7E0] shadow-sm">
              <label className="block text-[10px] font-bold tracking-[0.25em] uppercase text-[#AAA] mb-4">
                Preferred Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setSelectedPayment(pm.id)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${
                      selectedPayment === pm.id
                        ? "border-[#C9A84C]/60 text-[#C9A84C] bg-[#C9A84C]/6"
                        : "border-[#E5E2DA] text-[#888] hover:text-[#444] hover:border-[#D8D4CC]"
                    }`}
                  >
                    <span className={selectedPayment === pm.id ? "text-[#C9A84C]" : "text-[#CCC]"}>{pm.icon}</span>
                    {pm.label}
                  </button>
                ))}
              </div>
              <p className="text-[#AAA] text-xs mt-3 leading-relaxed">
                Deposit is collected to confirm your booking. Full details shared after submission.
              </p>
            </div>

            {/* Deposit notice */}
            <div
              className="rounded-2xl p-5 border"
              style={{ background: "rgba(201,168,76,0.04)", borderColor: "rgba(201,168,76,0.28)" }}
            >
              <div className="flex items-start gap-3">
                <span className="text-[#C9A84C] text-base shrink-0 mt-0.5">✦</span>
                <div>
                  <p className="text-[#C9A84C] font-semibold text-sm mb-1">$50 Deposit Required</p>
                  <p className="text-[#888] text-xs leading-relaxed">
                    A $50 deposit is required to secure your appointment. Remaining balance is due at the appointment. Deposits are non-refundable within 48 hours of your appointment.
                  </p>
                </div>
              </div>
            </div>

            {/* Booking summary */}
            {(selectedDate || selectedSlot || selectedService) && (
              <div className="bg-white rounded-2xl p-5 border border-[#EAE7E0] shadow-sm space-y-2.5">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#AAA] mb-3">Booking Summary</p>
                <div className="flex justify-between items-start text-sm">
                  <span className="text-[#AAA]">Service</span>
                  <span className="text-[#444] text-right max-w-[60%]">{selectedService}</span>
                </div>
                {selectedDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#AAA]">Date</span>
                    <span className="text-[#444]">{new Date(calYear, calMonth, selectedDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                )}
                {selectedSlot && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#AAA]">Time</span>
                    <span className="text-[#444]">{selectedSlot}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-2 border-t border-[#F0EDE6]">
                  <span className="text-[#AAA]">Deposit Due</span>
                  <span className="text-[#C9A84C] font-bold">$50</span>
                </div>
              </div>
            )}

            <button
              className="w-full font-bold text-base py-4 rounded-full text-[#0A0A0A] transition-all hover:scale-[1.01] hover:shadow-xl"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)", boxShadow: "0 6px 30px rgba(201,168,76,0.28)" }}
            >
              Request Appointment
            </button>
            <p className="text-center text-[#CCC] text-xs">
              This is a prototype. Full booking integration coming soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  const pillars = [
    { label: "Customized", desc: "Every brow and lip treatment is designed around your unique features, skin tone, and goals." },
    { label: "Soft & Natural", desc: "We specialize in results that enhance without overpowering — flattering, not overdone." },
    { label: "Confidence-Boosting", desc: "Walk out feeling polished, put-together, and ready to wake up beautiful every morning." },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — brand card */}
          <div className="relative">
            <div className="relative bg-[#F7F5F2] rounded-3xl p-10 overflow-hidden gold-card">
              {/* Gold corner glow */}
              <div
                className="absolute top-0 right-0 w-56 h-56 pointer-events-none"
                style={{ background: "radial-gradient(circle at top right, rgba(201,168,76,0.15), transparent 70%)" }}
              />

              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
                style={{ background: "rgba(201,168,76,0.10)", border: "1px solid rgba(201,168,76,0.28)" }}
              >
                <span
                  className="text-lg font-bold tracking-wider"
                  style={{ fontFamily: "var(--font-cormorant)", ...GOLD }}
                >
                  BbR
                </span>
              </div>

              <h3
                className="text-3xl font-light text-[#111] mb-1"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Brows by Ritz
              </h3>
              <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.3em] uppercase mb-8">
                Luxury Brow &amp; Lip Artist
              </p>

              <div className="space-y-4">
                {pillars.map((p) => (
                  <div key={p.label} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.28)" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#111] text-sm font-semibold mb-0.5">{p.label}</p>
                      <p className="text-[#888] text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-5 -right-4 text-[#0A0A0A] font-bold text-xs px-5 py-2.5 rounded-full shadow-xl rotate-2"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)", boxShadow: "0 4px 20px rgba(201,168,76,0.38)" }}
            >
              $50 Deposit to Book ✦
            </div>
          </div>

          {/* Right — copy */}
          <div>
            <p className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-semibold mb-5">
              Our Philosophy
            </p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-light mb-8 leading-tight text-[#111]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Beauty That <GoldText>Feels Like You</GoldText>
            </h2>
            <div className="space-y-5 text-[#666] leading-relaxed text-base">
              <p>
                Brows by Ritz is focused on creating customized brow and lip enhancements that feel soft, flattering, and natural — while giving each client a polished, confidence-boosting result.
              </p>
              <p>
                We don&apos;t believe in one-size-fits-all beauty. Every face is different, every skin tone unique, and every person deserves a look that feels like the best version of themselves — not someone else&apos;s idea of beautiful.
              </p>
              <p>
                Whether you&apos;re coming in for your first ombré brows, refreshing your lip blush, or exploring nano brows for the most natural result possible — you&apos;ll leave feeling elevated, cared for, and completely at home in your own skin.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#book"
                className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-[#0A0A0A] transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)", boxShadow: "0 4px 20px rgba(201,168,76,0.26)" }}
              >
                Book Now
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border border-[#DDD] hover:border-[#C9A84C]/50 text-[#666] hover:text-[#C9A84C] font-semibold px-8 py-4 rounded-full transition-all"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();

  const serviceLinks = [
    "Ombré Brows",
    "Nano Brows",
    "Combo Brows",
    "Brow Touchups",
    "Lip Blush",
    "Lip Refresh",
    "Black Face Doll",
    "Tattoo Removal",
    "Brow Removal",
  ];

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services & Pricing", href: "#services" },
    { label: "Reviews", href: "#reviews" },
    { label: "Book Appointment", href: "#book" },
  ];

  return (
    <footer className="bg-[#F7F5F2] border-t border-[#EAE7E0]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span
              className="text-2xl font-light tracking-wider"
              style={{ fontFamily: "var(--font-cormorant)", ...GOLD }}
            >
              Brows by Ritz
            </span>
            <p className="text-[#C9A84C]/50 text-[10px] tracking-[0.3em] uppercase mt-1.5 mb-5">
              Luxury Brow &amp; Lip Artist
            </p>
            <p className="text-[#999] text-sm leading-relaxed max-w-xs">
              Customized brow and lip enhancements designed to feel soft, natural, and completely you.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#111] text-xs font-semibold tracking-widest uppercase mb-5">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-[#999] hover:text-[#C9A84C] text-sm transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation + CTA */}
          <div>
            <h4 className="text-[#111] text-xs font-semibold tracking-widest uppercase mb-5">Navigation</h4>
            <ul className="space-y-3 mb-7">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[#999] hover:text-[#C9A84C] text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#book"
              className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full text-[#0A0A0A] transition-all hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}
            >
              Book Appointment
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#EAE7E0] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#BBB]">
          <p>&copy; {year} Brows by Ritz. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-[#C9A84C] text-xs">✦</span>
            <span>Luxury Brow &amp; Lip Blush Artist</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BeforeAfterSection />
        <Services />
        <Reviews />
        <Booking />
        <About />
      </main>
      <Footer />
    </>
  );
}
