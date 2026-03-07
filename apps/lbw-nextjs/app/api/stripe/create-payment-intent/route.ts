import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { data } = await req.json();
  const { amount } = data;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "aud",

      payment_method_types: ["card"],
    });
    console.log(`[API] stripe/create-payment-intent completed successfully amount=${amount}`);
    return new Response(
      JSON.stringify({ client_secret: paymentIntent.client_secret }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
