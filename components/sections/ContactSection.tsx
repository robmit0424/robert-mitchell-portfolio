"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/personal";
import { useContactModal } from "@/contexts/ContactModalContext";

// HUD Corner brackets component
function HUDCorners({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-aurora-cyan opacity-60" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-aurora-cyan opacity-60" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-aurora-cyan opacity-60" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-aurora-cyan opacity-60" />
    </div>
  );
}

const contactLinks = [
  {
    label: "EMAIL_PROTOCOL",
    href: `mailto:${personal.email}`,
    value: personal.email,
    channel: "SMTP",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "LINKEDIN_NODE",
    href: personal.linkedin,
    value: "Connect",
    channel: "HTTPS",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GITHUB_REPO",
    href: personal.github,
    value: "View Source",
    channel: "GIT",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

// Communication Terminal Card
function CommTerminal({
  link,
  index,
  onEmailClick,
}: {
  link: typeof contactLinks[0];
  index: number;
  onEmailClick?: () => void;
}) {
  const isEmail = link.href.startsWith("mailto:");

  const handleClick = (e: React.MouseEvent) => {
    if (isEmail && onEmailClick) {
      e.preventDefault();
      onEmailClick();
    }
  };

  return (
    <motion.a
      href={isEmail ? "#" : link.href}
      onClick={handleClick}
      target={!isEmail && link.href.startsWith("http") ? "_blank" : undefined}
      rel={!isEmail && link.href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-black/60 backdrop-blur-sm border border-aurora-cyan/30 rounded-lg p-6 overflow-hidden hover:border-aurora-cyan/60 transition-colors cursor-pointer"
    >
      <HUDCorners />

      {/* Scanline effect on hover */}
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-aurora-cyan/50 to-transparent opacity-0 group-hover:opacity-100"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Status indicator */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-hud-green pulse-glow" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-hud-green">
          CHANNEL: ACTIVE
        </span>
      </div>

      {/* Icon in hexagonal container */}
      <div className="flex justify-center mb-4">
        <div
          className="w-14 h-14 flex items-center justify-center text-aurora-cyan group-hover:text-white transition-colors"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: "linear-gradient(135deg, rgba(34, 211, 209, 0.3) 0%, rgba(34, 211, 209, 0.1) 100%)",
            boxShadow: "0 0 20px rgba(34, 211, 209, 0.3)",
          }}
        >
          {link.icon}
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-sm font-mono font-bold text-aurora-cyan tracking-wider mb-1">
          {link.label}
        </p>
        <p className="text-xs font-mono text-text-muted">
          {link.value}
        </p>
        <p className="text-[10px] font-mono text-aurora-cyan/50 mt-2">
          PROTOCOL: {link.channel}
        </p>
      </div>
    </motion.a>
  );
}

export function ContactSection() {
  const { openModal } = useContactModal();

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 overflow-hidden"
      style={{ backgroundColor: "#030014" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 209, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 209, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-nebula-purple/30 to-aurora-cyan/30 blur" />
            <div className="relative px-6 py-3 bg-black/60 backdrop-blur-sm border border-aurora-cyan/30">
              <HUDCorners />
              <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-aurora-cyan font-mono">
                <span className="text-nebula-purple mr-2">&gt;</span>
                COMMS_LINK.exe
                <span className="animate-pulse ml-1">_</span>
              </h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-sm font-mono text-text-muted tracking-wider"
          >
            ESTABLISH CONNECTION // INITIATE TRANSMISSION
          </motion.p>
        </motion.div>

        {/* Contact Terminals */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {contactLinks.map((link, index) => (
            <CommTerminal
              key={link.label}
              link={link}
              index={index}
              onEmailClick={openModal}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <button
            onClick={openModal}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-black/60 backdrop-blur-sm border border-aurora-cyan/50 font-mono font-bold text-aurora-cyan tracking-wider transition-all duration-300 hover:bg-aurora-cyan/10 hover:border-aurora-cyan hover:shadow-lg hover:shadow-aurora-cyan/20 relative"
          >
            <HUDCorners />
            <span className="text-nebula-purple">&gt;</span>
            <span>TRANSMIT_MESSAGE</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center border-t border-aurora-cyan/20 pt-8"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-text-muted mb-2">
            <span className="text-aurora-cyan/50">[</span>
            <span>BUILT_WITH:</span>
            <span className="text-aurora-cyan">Next.js</span>
            <span className="text-text-muted/50">//</span>
            <span className="text-aurora-cyan">Tailwind</span>
            <span className="text-text-muted/50">//</span>
            <span className="text-aurora-cyan">Framer</span>
            <span className="text-aurora-cyan/50">]</span>
          </div>
          <p className="text-[10px] font-mono text-text-muted/50">
            &copy; {new Date().getFullYear()} {personal.name.toUpperCase()} // ALL_RIGHTS_RESERVED
          </p>
        </motion.div>
      </div>

      {/* Corner decorations - Desktop only */}
      <div className="absolute top-8 left-8 text-xs font-mono text-text-muted/50 hidden md:block">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-hud-green rounded-full" />
          <span>SECTOR: 005</span>
        </div>
        <div className="text-aurora-cyan/50">NODE: COMMS</div>
      </div>

      <div className="absolute top-8 right-8 text-xs font-mono text-right text-text-muted/50 hidden md:block">
        <div className="text-aurora-cyan/50">SIGNAL: STRONG</div>
        <div>FREQ: OPEN</div>
      </div>

      <div className="absolute bottom-8 left-8 text-xs font-mono text-text-muted/30 hidden md:block">
        <div>UPLINK: READY</div>
        <div>PING: 1ms</div>
      </div>

      <div className="absolute bottom-8 right-8 text-xs font-mono text-text-muted/30 hidden md:block">
        <div className="text-right">CLEARANCE: GRANTED</div>
        <div className="text-right">ACCESS: FULL</div>
      </div>
    </section>
  );
}
