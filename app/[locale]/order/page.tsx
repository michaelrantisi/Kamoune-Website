"use client";
import { useContext, useMemo, useState } from "react";
import { CartContext } from "@/context/CartContext";

export default function OrderPage({ params }: { params: { locale: "fr" | "en" } }) {
  const { locale } = params;
  const { cartItems, total, removeItem, setQuantity, clearCart } = useContext(CartContext);

  const t = (fr: string, en: string) => (locale === "fr" ? fr : en);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState<"in-person" | "online">("in-person");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const disabled = useMemo(() => loading || cartItems.length === 0 || !name || !email, [loading, cartItems, name, email]);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
    try {
      if (payment === "online") {
        // Call Stripe checkout session creator
        const res = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cartItems, customer: { name, email, phone }, locale }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Stripe error");
        // Redirect to Stripe
        window.location.href = data.url;
        return;
      } else {
        // In-person: send email to owner + customer
        const res = await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name, email, phone,
            paymentMethod: "in-person",
            items: cartItems,
            total
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Order failed");
        setMessage(t("Commande envoyée ! Vous recevrez un email de confirmation.", "Order sent! You’ll receive a confirmation email."));
        clearCart();
      }
    } catch (e: any) {
      setMessage(e.message || t("Une erreur s’est produite.", "Something went wrong."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-3 gap-8">
      <section className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-6">{t("Votre commande", "Your order")}</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">{t("Votre panier est vide.", "Your cart is empty.")}</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((it) => (
              <div key={it.id} className="flex items-center justify-between border rounded p-3">
                <div>
                  <div className="font-semibold">{it.name}</div>
                  <div className="text-sm text-gray-600">{it.price} €</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="border px-2 rounded" onClick={() => setQuantity(it.id, Math.max(1, it.quantity - 1))}>-</button>
                  <span>{it.quantity}</span>
                  <button className="border px-2 rounded" onClick={() => setQuantity(it.id, it.quantity + 1)}>+</button>
                  <button className="text-red-600 ml-3" onClick={() => removeItem(it.id)}>
                    {t("Supprimer", "Remove")}
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right text-xl font-bold">
              {t("Total", "Total")}: {total.toFixed(2)} €
            </div>
          </div>
        )}
      </section>

      <section className="md:col-span-1">
        <h2 className="text-2xl font-semibold mb-4">{t("Vos coordonnées", "Your details")}</h2>
        <div className="space-y-3">
          <input className="w-full border rounded px-3 py-2" placeholder={t("Nom et prénom", "Full name")} value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full border rounded px-3 py-2" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full border rounded px-3 py-2" placeholder={t("Téléphone (optionnel)", "Phone (optional)")} value={phone} onChange={(e) => setPhone(e.target.value)} />

          <div>
            <div className="font-semibold mb-1">{t("Paiement", "Payment")}</div>
            <label className="flex items-center gap-2">
              <input type="radio" name="pay" checked={payment === "in-person"} onChange={() => setPayment("in-person")} />
              {t("Payer sur place", "Pay in person")}
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="pay" checked={payment === "online"} onChange={() => setPayment("online")} />
              {t("Payer en ligne (Stripe)", "Pay online (Stripe)")}
            </label>
          </div>

          <button
            disabled={disabled}
            onClick={handleSubmit}
            className="w-full bg-primary text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? t("Envoi…", "Sending…") : t("Confirmer", "Confirm")}
          </button>

          {message && <p className="text-sm mt-2">{message}</p>}
        </div>
      </section>
    </div>
  );
}
