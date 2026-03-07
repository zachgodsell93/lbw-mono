import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2024-04-10",
    });
    const { name, email } = await req.json();

    // Check for existing customer
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });
    let customer;

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({ name, email });
    }

    console.log(`[API] stripe/create-customer completed successfully email=${email}`);
    return new Response(JSON.stringify({ customer }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
