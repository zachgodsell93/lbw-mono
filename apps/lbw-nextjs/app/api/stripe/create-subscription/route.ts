import moment from "moment";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2024-04-10",
    });

    const { customerId, priceId } = await req.json();
    // console.log({
    //   customer: customerId,
    //   items: [{ price: priceId }],
    //   expand: ["latest_invoice"],
    // });
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      trial_period_days: 7,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
    });
    console.log(subscription);

    let clientSecret;
    //@ts-ignore
    if (subscription.latest_invoice?.payment_intent) {
      //@ts-ignore
      clientSecret = subscription.latest_invoice.payment_intent.client_secret;
    } else {
      // Create a setup intent to collect the payment method
      const setupIntent = await stripe.setupIntents.create({
        customer: customerId,
        payment_method_types: ["card"],
        usage: "off_session",
      });
      clientSecret = setupIntent.client_secret;
    }

    console.log(`[API] stripe/create-subscription completed successfully customerId=${customerId}`);
    return new Response(
      JSON.stringify({
        subscription,
        clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
