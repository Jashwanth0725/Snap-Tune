import { useAuth } from "@/auth/firebase.auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CheckoutButton({ plan }: { plan: string }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) return navigate("/login");

    const res = await fetch(
      "http://localhost:8000/api/v1/payment/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan, email: user.email }),
      }
    );

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; // ✅ Redirect to Stripe Checkout
    } else {
      toast.error("Failed to redirect to payment");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
    >
      Checkout
    </button>
  );
}
