import { headers } from "next/headers";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import {
  getCustomerById,
  searchForExistingCustomer,
  updateSubscriptionExpiration,
  createCustomerLogin,
  createCustomerSettings,
  createCustomerSubscription,
  addSubandSettingsToUser,
} from "@/utils/user";
import moment from "moment";
import { Logger } from "next-axiom";

// TODO: Fix types on error in catch
// TODO: Update the user subscription in the database
// TODO: Add the stripe webhook secret to the environment variables

export async function POST(req: Request) {
  const log = new Logger({
    source: "stripe-subscription-handler",
  });
  const body = await req.json();
  const signature = headers().get("Stripe-Signature") as string;

  if (!body || !signature) {
    return new Response(null, { status: 400 });
  }

  const products = [
    {
      product: "Captains Lounge",
      amount: 29900,
      sub_id: 3,
    },
    {
      product: "Members Plus",
      amount: 9900,
      sub_id: 2,
    },
    {
      product: "Members Standard",
      amount: 5900,
      sub_id: 1,
    },
    {
      product: "Premium",
      amount: 19900,
      sub_id: 3,
    },
  ];

  if (body.type === "payment_intent.succeeded") {
    const session = body.data.object;
    // R
    console.log(session);
    const customer = await getCustomerById(session.customer);

    console.log(customer);
    const email = customer.email;
    const firstName = customer.name?.split(" ")[0];
    const lastName = customer.name?.split(" ")[1];
    console.log(email);
    const amount = session.amount;
    const product = products.find((p) => p.amount === amount);
    console.log(product);
    if (!product) {
      log.error("invalid product on paymentintent", {
        session,
        customer,
        product,
      });
      return new Response(JSON.stringify({ message: "Invalid Product" }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    // Search for current customer with email.
    const existingCustomer = await searchForExistingCustomer(email as string);
    // if customer exists and is current, return
    if (existingCustomer) {
      console.log("Customer exists");
      const currentCustomer = existingCustomer[0];
      const currentSubscription = currentCustomer.usub_id
        ? currentCustomer.usub_id
        : null;
      if (currentSubscription !== null || currentSubscription !== undefined) {
        await updateSubscriptionExpiration(
          currentSubscription,
          moment().add(8, "days").format("YYYY-MM-DD"),
          product.sub_id
        );
        log.info("Updated Subscription Expiration", {
          currentSubscription,
          newSubscription: product.sub_id,
        });
      }
      log.info(`Customer Already Exists, subscription updated`, {
        currentCustomer,
        newSubscription: product.sub_id,
        newDate: moment().add(8, "days").format("YYYY-MM-DD"),
      });
      return new Response(
        JSON.stringify({ message: "Customer Already Exists" }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const newCustomerDetails = await createCustomerLogin(
      email as string,
      firstName as string,
      lastName as string
    );

    const customerSettings = await createCustomerSettings();
    const customerSubscription = await createCustomerSubscription(
      product.sub_id
    );

    const newCustomer = await addSubandSettingsToUser(
      newCustomerDetails.id,
      customerSubscription,
      customerSettings
    );
    // if customer exists and is not current, create new customer and return
    // Create auth, create customer tables, create subscription in db
    // create all settings based on product
  } else if (body.type === "payment_intent.payment_failed") {
    console.log(`[API] stripe-webhook received payment_intent.payment_failed`);
  }

  console.log(`[API] stripe-webhook processed successfully type=${body.type}`);
  return new Response(null, { status: 200 });
}
