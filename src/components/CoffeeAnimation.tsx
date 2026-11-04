"use client";

import { LottieSvg } from "lottie-react";
import coffee from "@/assets/animations/coffee-is-ready.json";

// The animation is 4s long; playing it once keeps it under WCAG 2.2.2's
// 5-second limit for motion without a pause control.
export default function CoffeeAnimation() {
  return <LottieSvg src={coffee} autoplay loop={false} className="size-56" aria-hidden />;
}
