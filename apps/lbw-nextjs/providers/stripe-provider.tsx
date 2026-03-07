"use client";
import React, { useEffect } from "react";
import { useUser } from "./user-provider";
import Stripe from "stripe";

const initialState = {
  customer: null,
  customerId: null,
  subscription: null,
  product: null,
  paymentMethod: null,
};

// initialize context
interface StripeContextType {
  customer: Stripe.Customer | null;
  customerId: string | null;
  subscription: Stripe.Subscription | null;
  product: Stripe.Product | null;
  paymentMethod: Stripe.PaymentMethod | null;
}
export const StripeContext =
  React.createContext<StripeContextType>(initialState);
StripeContext.displayName = "StripeContext";

// useDesigner to use context
export const useStripeUser = () => {
  const context = React.useContext(StripeContext);

  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const StripeProvider = ({ children }: UserProviderProps) => {
  const [customerId, setCustomerId] = React.useState<string | null>("");
  const [customer, setCustomer] = React.useState<Stripe.Customer | null>(null);
  const [subscription, setSubscription] =
    React.useState<Stripe.Subscription | null>(null);
  const [product, setProduct] = React.useState<Stripe.Product | null>(null);
  const [paymentMethod, setPaymentMethod] =
    React.useState<Stripe.PaymentMethod | null>(null);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-04-10",
  });
  const { user } = useUser();

  const findCustomer = async () => {
    const email = user?.email as string;
    const customers = await stripe.customers.list({ email });
    const stripeCustomer = customers.data[0];
    setCustomer(stripeCustomer);
    const stripeId = stripeCustomer.id;
    setCustomerId(stripeId);

    return stripeId;
  };
  const getCustomerSubscription = async (custId: string) => {
    const subscriptions = await stripe.subscriptions.list({
      customer: custId,
      status: "active",
    });
    const activeSub = subscriptions.data[0];

    setSubscription(activeSub);
    console.log(activeSub);
    return activeSub;
  };

  const getSubscriptionProduct = async (productId: string) => {
    const product = await stripe.products.retrieve(productId);
    console.log("product", product);
    setProduct(product);
  };

  const getCustomerDefaultPaymentMethid = async (custId: string) => {
    const paymentMethods = await stripe.customers.listPaymentMethods(custId, {
      type: "card",
    });
    const paymentMethod = paymentMethods.data[0];
    setPaymentMethod(paymentMethod);
  };

  useEffect(() => {
    const stripeInit = async () => {
      const custId = await findCustomer();
      console.log(custId);
      const sub = await getCustomerSubscription(custId);
      const productId = sub.items.data[0].plan.product;
      if (!productId) return;
      await getSubscriptionProduct(productId as string);
      await getCustomerDefaultPaymentMethid(custId as string);
    };
    if (!user) return;
    stripeInit();
  }, [user]);

  return (
    <StripeContext.Provider
      value={{
        customer,
        customerId,
        subscription,
        product,
        paymentMethod,
      }}
    >
      {children}
    </StripeContext.Provider>
  );
};
