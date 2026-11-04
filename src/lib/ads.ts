/*
 * Google Ads conversion tracking. Both values are public (they ship in the
 * page's JS) and come from the Ads account's "Contact form lead" conversion
 * action. Until they're set, no tag loads and nothing is tracked.
 */

const rawId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const rawLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;

/** e.g. "AW-123456789". Validated because it's interpolated into an inline script. */
export const googleAdsId = rawId && /^AW-\d+$/.test(rawId) ? rawId : undefined;
const leadLabel = rawLabel && /^[\w-]+$/.test(rawLabel) ? rawLabel : undefined;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire once per genuine contact-form send (never for the honeypot path). */
export function trackLeadConversion() {
  if (!googleAdsId || !leadLabel || typeof window === "undefined") return;
  window.gtag?.("event", "conversion", { send_to: `${googleAdsId}/${leadLabel}` });
}
