"use client";

import dynamic from "next/dynamic";
import { useResolvedTheme } from "@/lib/theme";

const ReactNebula = dynamic(
  () => import("@flodlc/nebula").then((m) => m.ReactNebula),
  { ssr: false },
);

// Module-level so the reference is stable: ReactNebula re-applies its config
// whenever the object identity changes.
const NEBULA_CONFIG = {
  starsCount: 350,
  starsColor: "#ffffff",
  starsRotationSpeed: 2,
  cometFrequence: 20,
  nebulasIntensity: 8,
  bgColor: "#07060f",
  sunScale: 0,
  planetsScale: 0,
};

/** Animated night sky behind the hero. Dark theme only; unmounting stops the canvas loop. */
export function Starfield() {
  const theme = useResolvedTheme();
  if (theme !== "dark") return null;

  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <ReactNebula config={NEBULA_CONFIG} />
    </div>
  );
}
