// components/StripeProvider.tsx
"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51REwiaSDy2Bh8vtP0CeBzmOCOuqQREvjHSGCLfDJs7uPj0MNZo0iZUeIg5pB3oCNl4KpDwTF0ogVM1PYMqhEzu1O00TZbloajR"
); // Get this from Stripe dashboard

export function StripeProvider({ children }: { children: React.ReactNode }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
