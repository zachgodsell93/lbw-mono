import { DocsConfig } from "@/types";

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    // {
    //   title: "Guides",
    //   href: "/guides",
    // },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
        {
          title: "Lay Back and Win Explained",
          href: "/docs/getting-started/lbw-explained",
        },
        {
          title: "Connecting your Betfair Account",
          href: "/docs/getting-started/betfair-account",
        },
        {
          title: "Setting Unit Size and Stop Loss/Take Profit",
          href: "/docs/getting-started/staking",
        },

        // {
        //   title: "Using Horse Rating Data",
        //   href: "/docs/configuration/config-files",
        // },
      ],
    },
    {
      title: "Billing & Subscriptions",
      items: [
        {
          title: "Unit Guarentee FAQ and Terms",
          href: "/docs/billing/unit-guarentee",
        },
        // {
        //   title: "Managing your Subscription",
        //   href: "#",
        // },
        // {
        //   title: "Changing your payment method",
        //   href: "#",
        // },
        // {
        //   title: "Changing your plan",
        //   href: "#",
        // },
        // {
        //   title: "Cancelling your plan",
        //   href: "#",
        // },
        // {
        //   title: "Using Horse Rating Data",
        //   href: "/docs/configuration/config-files",
        // },
      ],
    },
    // {
    //   title: "Horse Rating Data",
    //   items: [
    //     // {
    //     //   title: "Connecting your Betfair Account",
    //     //   href: "/docs/configuration/database",
    //     // },
    //     // {
    //     //   title: "Setting Unit Size and Stop Loss/Take Profit",
    //     //   href: "/docs/configuration/subscriptions",
    //     // },
    //     // {
    //     //   title: "Using Horse Rating Data",
    //     //   href: "/docs/configuration/config-files",
    //     // },
    //   ],
    // },
    // {
    //   title: "LBW Horse Ratings",
    //   items: [
    //     // {
    //     //   title: "Connecting your Betfair Account",
    //     //   href: "/docs/configuration/database",
    //     // },
    //   ],
    // },
    {
      title: "Security & Data",
      items: [
        {
          title: "Privacy Policy",
          href: "/docs/data/privacy-policy",
        },
      ],
    },
    // {
    //   title: "Upcoming Features",
    //   items: [
    //     {
    //       title: "Greyhound Models",
    //       href: "#",
    //     },
    //     {
    //       title: "Android App",
    //       href: "#",
    //     },
    //   ],
    // },
  ],
};
