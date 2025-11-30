"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext } from "react";
import menuTraiteur, { cateringNote } from "@/data/menuTraiteur";
import { CartContext } from "@/context/CartContext";

type Locale = "fr" | "en";

export default function MenuTraiteurPage() {
  const { locale: rawLocale } = useParams<{ locale: Locale }>();
  const locale: Locale = rawLocale === "en" ? "en" : "fr";

  const { addItem } = useContext(CartContext);

  const t = (fr: string, en: string) => (locale === "fr" ? fr : en);

  return (
    <div className="min-h-screen bg-[#f6efe4]">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Title + global note */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#4b2a17]">
              {t("Menu traiteur", "Catering menu")}
            </h1>
            <p className="mt-2 text-sm text-[#7a5a3b] italic">
              {locale === "fr" ? cateringNote.fr : cateringNote.en}
            </p>
          </div>
          <Link
            href={`/${locale}`}
            className="text-sm border border-[#c9a070] text-[#7a4b28] px-3 py-1 rounded-full hover:bg-[#f1dfc7] transition"
          >
            ← {t("Retour à l’accueil", "Back to home")}
          </Link>
        </div>

        {/* Catering menus */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {menuTraiteur.map((menu) => {
            const name = locale === "fr" ? menu.name_fr : menu.name_en;
            const desc =
              locale === "fr" ? menu.description_fr : menu.description_en;
            const items = locale === "fr" ? menu.items_fr : menu.items_en;

            const handleAdd = () => {
              // We treat catering menus as one item = one person.
              // Quantity can be adjusted later on the order page.
              if (menu.price_per_person == null) return;
              addItem({
                id: `catering-${menu.id}`,
                name: `${name} (${t("traiteur", "catering")})`,
                price: menu.price_per_person,
              });
            };

            return (
              <article
                key={menu.id}
                className="rounded-2xl border border-[#e3c9a3] bg-[#fff7ec] shadow-sm overflow-hidden flex flex-col"
              >
                {menu.image && (
                  <div className="relative h-40 w-full">
                    <Image
                      src={menu.image}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold text-[#4b2a17]">
                    {name}
                  </h2>
                  <p className="mt-1 text-sm text-[#7a5a3b]">{desc}</p>

                  <ul className="mt-3 space-y-1 text-sm text-[#5c4733] list-disc list-inside">
                    {items.map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center justify-between text-sm text-[#7a4b28]">
                    <span className="font-semibold">
                      {menu.price_per_person != null ? (
                        locale === "fr"
                          ? `${menu.price_per_person} € par personne`
                          : `${menu.price_per_person} € per person`
                      ) : (
                        t("Sur devis", "On request")
                      )}
                    </span>

                    {menu.price_per_person != null && (
                      <button
                        type="button"
                        onClick={handleAdd}
                        className="ml-3 inline-flex items-center rounded-full bg-[#b26137] px-3 py-1 text-xs font-semibold text-white hover:bg-[#924d2b] transition"
                      >
                        {t("Ajouter au panier", "Add to cart")}
                      </button>
                    )}
                  </div>

                  {menu.price_per_person != null && (
                    <p className="mt-1 text-[11px] text-[#9a7a57]">
                      {t(
                        "1 ajout = 1 personne (quantité ajustable sur la page commande).",
                        "1 add = 1 person (quantity adjustable on the order page)."
                      )}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
