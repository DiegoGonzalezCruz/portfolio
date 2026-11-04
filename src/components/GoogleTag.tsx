import Script from "next/script";
import { googleAdsId } from "@/lib/ads";

/** Loads the Google tag for Ads conversion tracking, only once an Ads ID is configured. */
export function GoogleTag() {
  if (!googleAdsId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${googleAdsId}');`}
      </Script>
    </>
  );
}
