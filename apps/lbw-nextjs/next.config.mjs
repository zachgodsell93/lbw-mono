import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */

import { withContentlayer } from "next-contentlayer2";
import { withAxiom } from "next-axiom";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverExternalPackages: ["@opentelemetry/instrumentation", "require-in-the-middle"],
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    // domains: ["content.betfair.com", "randomuser.me"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  env: {
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SITE_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://v2.laybackandwin.com.au",
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    POSTHOG_KEY: process.env.POSTHOG_KEY,
    POSTHOG_HOST: "https://us.i.posthog.com",
    NEXT_PUBLIC_AXIOM_DATASET: "lay-back-and-win",
    NEXT_PUBLIC_AXIOM_TOKEN: process.env.NEXT_PUBLIC_AXIOM_TOKEN,
    BACKTEST_PASS_KEY: process.env.BACKTEST_PASS_KEY,
  },
};

export default withContentlayer(withAxiom(nextConfig));

// export default withSentryConfig(withContentlayer(withAxiom(nextConfig)), {
//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options

//   org: "pixel-and-byte",
//   project: "javascript-nextjs",

//   // Only print logs for uploading source maps in CI
//   silent: !process.env.CI,

//   // For all available options, see:
//   // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

//   // Upload a larger set of source maps for prettier stack traces (increases build time)
//   widenClientFileUpload: true,

//   // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
//   // This can increase your server load as well as your hosting bill.
//   // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
//   // side errors will fail.
//   // tunnelRoute: "/monitoring",

//   // Hides source maps from generated client bundles
//   hideSourceMaps: true,

//   // Automatically tree-shake Sentry logger statements to reduce bundle size
//   disableLogger: true,

//   // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
//   // See the following for more information:
//   // https://docs.sentry.io/product/crons/
//   // https://vercel.com/docs/cron-jobs
//   automaticVercelMonitors: true,
// });
