import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

// withBotId adds the rewrites that proxy Vercel BotID's challenge script
// through this domain. Without them every contact-form check fails.
export default withBotId(nextConfig);
