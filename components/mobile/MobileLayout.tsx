"use client";

import { motion } from "framer-motion";
import { NebulaBackground } from "@/components/ui/nebula-background";
import { MobileNav } from "./MobileNav";
import { MobileHero } from "./MobileHero";
import { MobileSection } from "./MobileSection";
import { MobileAbout } from "./sections/MobileAbout";
import { MobileExperience } from "./sections/MobileExperience";
import { MobileSkills } from "./sections/MobileSkills";
import { MobileContact } from "./sections/MobileContact";

export function MobileLayout() {
  return (
    <div className="min-h-screen w-screen bg-black relative">
      {/* Background */}
      <NebulaBackground />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 209, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 209, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Scrollable content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 pb-20"
      >
        {/* Hero */}
        <section id="hero">
          <MobileHero />
        </section>

        {/* About */}
        <section id="about">
          <MobileSection title="CREW_MANIFEST">
            <MobileAbout />
          </MobileSection>
        </section>

        {/* Experience */}
        <section id="experience">
          <MobileSection title="MISSION_HISTORY">
            <MobileExperience />
          </MobileSection>
        </section>

        {/* Skills */}
        <section id="skills">
          <MobileSection title="ARMORY">
            <MobileSkills />
          </MobileSection>
        </section>

        {/* Contact */}
        <section id="contact">
          <MobileSection title="COMMS_LINK">
            <MobileContact />
          </MobileSection>
        </section>
      </motion.div>

      {/* Sticky navigation */}
      <MobileNav />
    </div>
  );
}
