export interface SubscriptionPlan {
  title: string;
  description: string;
  benefits: string[];
  limitations: string[];
  prices: {
    weekly: number;
    weeklyTrial?: number;
    monthly: number;
  };
  stripeIds: {
    weekly: string | null;
    monthly: string | null;
  };
  packageId: number;
  trial?: boolean;
  trialPrice?: number;
  disabled?: boolean;
}

//TODO: Add stripe subscription IDs

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Starter",
    description: "For Beginners",
    benefits: ["Betting Automation Through Betfair", "AI Strategy Automation"],
    limitations: [
      "10 Unit/Week Guarentee, or the next week is on us",
      "Place your own strategies using our proprietary models and data",
      "Access to Greyhound and Harness Racing",
    ],
    prices: {
      weekly: 59,
      monthly: 169,
    },
    stripeIds: {
      weekly: "price_1OdfS3I9dTh7xQAWfdzDOe0H",
      monthly: null,
    },
    packageId: 1,
  },
  {
    title: "Pro",
    description: "Unlock Advanced Features",
    benefits: [
      "Betting Automation Through Betfair",
      "AI Strategy Automation",
      "10 Unit/Week Guarentee, or the next week is on us",
    ],
    limitations: [
      "Place your own strategies using our proprietary models and data",
      "Access to Greyhound and Harness Racing",
    ],
    prices: {
      weekly: 99,
      weeklyTrial: 0,
      monthly: 379,
    },
    stripeIds: {
      weekly: "price_1OUbjuI9dTh7xQAWceHdTwmA",
      monthly: null,
    },
    packageId: 2,
    trial: true,
  },
  {
    title: "Premium",
    description: "For Power Users",
    benefits: [
      "Betting Automation Through Betfair",
      "AI Strategy Automation",
      "10 Unit/Week Guarentee, or the next week is on us*",
      "Place your own strategies using our proprietary models and data",
      "Access to Greyhound and Harness Racing",
    ],
    limitations: [],
    prices: {
      weekly: 199,
      monthly: 699,
    },
    stripeIds: {
      weekly: "price_1OlgLnI9dTh7xQAWWk3JcXH9",
      monthly: null,
    },
    packageId: 5,
    disabled: true,
  },
];
