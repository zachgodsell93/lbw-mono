import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

// import { env } from "@/env.mjs"

export const stripe = new Stripe(process.env.STRIPE_PUBLISHABLE_KEY || "", {
  apiVersion: "2024-04-10",
  typescript: true,
});

export const stripePromise = loadStripe(
  process.env.STRIPE_PUBLISHABLE_KEY || ""
);
