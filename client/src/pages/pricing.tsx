import React, { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "pricing-table-id": string;
          "publishable-key": string;
        },
        HTMLElement
      >;
    }
  }
}

const PricingPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full py-10 min-h-screen bg-white">
      <div className="max-w-screen-lg mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Choose the right plan for you
        </h1>
        <div
          dangerouslySetInnerHTML={{
            __html: `<stripe-pricing-table pricing-table-id="prctbl_1REyg1SDy2Bh8vtPxxGI9Kci"
            publishable-key="pk_test_51REwiaSDy2Bh8vtP0CeBzmOCOuqQREvjHSGCLfDJs7uPj0MNZo0iZUeIg5pB3oCNl4KpDwTF0ogVM1PYMqhEzu1O00TZbloajR">
          </stripe-pricing-table>`,
          }}
        />
      </div>
    </div>
  );
};

export default PricingPage;
