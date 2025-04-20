import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const priceMap = {
    pro: "99",
    premium: "299",
};

export const createCheckoutSession = async (req, res) => {
    const { plan, email } = req.body;

    if (!plan || !priceMap[plan]) {
        return res.status(400).json({ error: "Invalid plan" });
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
            {
                price: priceMap[plan],
                quantity: 1,
            },
        ],
        customer_email: email,
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });

    return res.status(200).json({ url: session.url });
}
