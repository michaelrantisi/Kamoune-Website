"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function HomePage() {
  const { locale } = useParams<{ locale: "fr" | "en" }>();
  const t = (fr: string, en: string) => (locale === "fr" ? fr : en);

  return (
    <>
      {/* Hero section */}
      <section className="section pt-12 pb-16 grid gap-10 md:grid-cols-[1.1fr,1fr] items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-sand px-3 py-1 text-xs font-medium text-primary mb-4">
            <span>🧂</span>
            <span>
              {t("Saveurs de Palestine à Toulouse", "Flavours of Palestine in Toulouse")}
            </span>
          </p>

          <h1 className="font-display text-4xl md:text-5xl font-semibold text-primaryDark mb-4 leading-tight">
            {t(
              "Kamoune – Cuisine palestinienne, 100% fait maison",
              "Kamoune – Homemade Palestinian cuisine"
            )}
          </h1>

          <p className="text-sm md:text-base text-slate-700 mb-6 max-w-xl">
            {t(
              "Maqlouba fumante, mezzés généreux et desserts parfumés au sumac et à la fleur d’oranger, préparés avec des produits frais et de saison.",
              "Sizzling maqluba, generous mezze and desserts perfumed with sumac and orange blossom, prepared with fresh seasonal ingredients."
            )}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href={`/${locale}/menu`} className="btn-primary">
              {t("Voir le menu", "View menu")}
            </Link>
            <Link href={`/${locale}/workshop`} className="btn-outline">
              {t("S'inscrire à un atelier", "Join a workshop")}
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-xs text-slate-600">
            <div>
              <div className="font-semibold text-primaryDark">
                {t("Catering & événements", "Catering & events")}
              </div>
              <div>{t("Mariages, anniversaires, repas d’entreprise", "Weddings, birthdays, corporate meals")}</div>
            </div>
            <div>
              <div className="font-semibold text-primaryDark">
                {t("Options végétariennes", "Vegetarian options")}
              </div>
              <div>{t("Menu adapté sur demande", "Menu adapted on request")}</div>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative h-72 md:h-96">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-accent/15 via-sand to-primary/10" />
          <div className="relative h-full w-full p-4">
            <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-cardBorder bg-card shadow-soft">
              <Image
                src="/kamoune-hero.jpg"
                alt="Table palestinienne avec maqlouba et mezzés"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
