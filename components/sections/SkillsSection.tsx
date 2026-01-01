"use client";

import { WeaponLoadout } from "@/components/skills/WeaponLoadout";
import { MobileWeaponSelect } from "@/components/skills/MobileWeaponSelect";

export function SkillsSection() {
  return (
    <>
      {/* Desktop: Full loadout experience */}
      <section
        id="skills"
        className="relative hidden md:block h-screen overflow-hidden"
        style={{ backgroundColor: "#030014" }}
      >
        <WeaponLoadout />
      </section>

      {/* Mobile: Simplified weapon selector */}
      <section
        id="skills-mobile"
        className="relative md:hidden overflow-hidden"
        style={{ backgroundColor: "#030014" }}
      >
        <MobileWeaponSelect />
      </section>
    </>
  );
}
