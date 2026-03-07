"use client";
import React, { useEffect } from "react";
// import { getUser } from "../utils/supabaseClient";
import { supabase } from "@/utils/supabase/client";
import { Database } from "@/types/supabase.types";
import moment from "moment";
import { SubscriptionPlan } from "@/config/subscriptions";
import axios, { AxiosResponse } from "axios";
import * as Stripe from "stripe";

interface PaymentProviderProps {
  children: React.ReactNode;
}

interface CustomerDetails {
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  mobile: string;
}

export interface ProductSelection extends SubscriptionPlan {
  isWeekly: boolean;
}

export interface SubscriptionReturn extends Stripe.Stripe.Subscription {
  clientSecret: string;
}
// initialize context
interface PaymentContextType {
  product: ProductSelection | null;
  setProduct: (product: any) => void;
  customerDetails: CustomerDetails;
  setCustomerDetails: (customerDetails: CustomerDetails) => void;
  subscription: any;
  setSubscription: (subscription: any) => void;
  clientSecret: string | null;
  setClientSecret: (clientSecret: string) => void;
  stripeCustomer: any;
  setStripeCustomer: (stripeCustomer: any) => void;
  customerDetailsComplete: boolean;
  setCustomerDetailsComplete: (customerDetailsComplete: boolean) => void;
  createCustomer: (
    fullName: string,
    email: string
  ) => Promise<Stripe.Stripe.Customer>;
  createSubscription: (customer: any) => Promise<SubscriptionReturn>;
}
const initialState = {
  product: null,
  setProduct: () => {},
  customerDetails: {
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
  },
  setCustomerDetails: () => {},
  subscription: null,
  setSubscription: () => {},
  clientSecret: null,
  setClientSecret: () => {},
  stripeCustomer: null,
  setStripeCustomer: () => {},
  customerDetailsComplete: false,
  setCustomerDetailsComplete: () => {},
  createCustomer: async () => {
    return {} as Stripe.Stripe.Customer;
  },
  createSubscription: async () => {
    return {} as SubscriptionReturn;
  },
};

export const PaymentContext =
  React.createContext<PaymentContextType>(initialState);
PaymentContext.displayName = "PaymentContext";

// useDesigner to use context
export const usePayment = () => {
  const context = React.useContext(PaymentContext);

  return context;
};

export const PaymentProvider = ({ children }: PaymentProviderProps) => {
  // Set once they select the product that they want from pricing page
  const [product, setProduct] = React.useState<ProductSelection | null>(null);
  // From customer-details.tsx
  const [customerDetails, setCustomerDetails] = React.useState<CustomerDetails>(
    {
      first_name: "",
      last_name: "",
      name: "",
      email: "",
      mobile: "",
    }
  );

  // Set once customer details are submitted and ready for payment screen
  const [customerDetailsComplete, setCustomerDetailsComplete] =
    React.useState(false);

  // Return from create subscription
  const [subscription, setSubscription] = React.useState<any>(null);
  // Return from create subscription
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  // from create customer api call.
  const [stripeCustomer, setStripeCustomer] = React.useState<any>(null);

  const createCustomer = async (fullName: string, email: string) => {
    const createCust = await axios.post("/api/stripe/create-customer", {
      name: fullName,
      email: email,
    });
    setStripeCustomer(createCust);
    return createCust.data.customer;
  };

  const createSubscription = async (customer: any) => {
    const createSub = await axios.post("/api/stripe/create-subscription", {
      customerId: customer,
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1O2oGaI9dTh7xQAWpCqYpQX2"
          : product?.stripeIds.weekly,
      // priceId: "price_1O2oGaI9dTh7xQAWpCqYpQX2",
    });
    setSubscription(createSub);
    return createSub.data;
  };

  return (
    <PaymentContext.Provider
      value={{
        product,
        setProduct,
        customerDetails,
        setCustomerDetails,
        subscription,
        setSubscription,
        clientSecret,
        setClientSecret,
        stripeCustomer,
        setStripeCustomer,
        customerDetailsComplete,
        setCustomerDetailsComplete,
        createCustomer,
        createSubscription,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
