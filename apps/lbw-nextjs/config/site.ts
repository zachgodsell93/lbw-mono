// import { SiteConfig } from "types";
// import { env } from "@/env.mjs";

// const site_url = env.NEXT_PUBLIC_APP_URL;

// export const siteConfig: SiteConfig = {
//   name: "SaaS Starter",
//   description:
//     "Get your project off to an explosive start with SaaS Starter! Harness the power of Next.js 14, Prisma, Neon, Auth.js v5, Resend, React Email, Shadcn/ui and Stripe to build your next big thing.",
//   url: site_url,
//   ogImage: `${site_url}/og.jpg`,
//   links: {
//     twitter: "https://twitter.com/miickasmt",
//     github: "https://github.com/mickasmt/next-saas-stripe-starter",
//   },
//   mailSupport: "support@saas-starter.com",
// };

export const footerLinks: any[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      //   { title: "Enterprise", href: "#" },
      //   { title: "Partners", href: "#" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Product",
    items: [
      // { title: "Security", href: "#" },
      { title: "Privacy Policy", href: "#" },
      // { title: "Data", href: "#" },
      //   { title: "Changelog", href: "#" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "Getting Started", href: "/docs" },
      { title: "Connecting Betfair", href: "/docs" },
      { title: "Managing Subscription", href: "/docs" },
      //   { title: "", href: "#" },
    ],
  },
];
