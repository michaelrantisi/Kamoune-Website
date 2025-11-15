"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function HomePage() {
  const { locale } = useParams<{ locale: "fr" | "en" }>();
  const t = (fr: string, en: string) => (locale === "fr" ? fr : en);

 return (
    <main className="bg-[#fbf2e4]">
      <div className="max-w-6xl mx-auto px-4 md:px-0 py-12 md:py-20">
        {/* HERO */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center">
          {/* Left side – text */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-600 mb-3">
              {t("Saveurs de Palestine à Toulouse", "Flavours of Palestine in Toulouse")}
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-emerald-950 mb-5">
              Kamoune –{" "}
              {t(
                "Cuisine palestinienne, 100% fait maison",
                "Palestinian cuisine, 100% homemade"
              )}
            </h1>

            <p className="text-sm md:text-base text-emerald-900/80 max-w-xl mb-8">
              {t(
                "Maqlouba fumante, mezzés généreux et desserts parfumés au sumac et à la fleur d’oranger, préparés avec des produits frais et de saison.",
                "Steaming maqlouba, generous mezzes and desserts scented with sumac and orange blossom, prepared with fresh, seasonal ingredients."
              )}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href={`/${locale}/menu`}
                className="inline-flex items-center rounded-full bg-emerald-800 text-white px-5 py-2 text-sm font-medium shadow-sm hover:bg-emerald-900 transition-colors"
              >
                {t("Voir le menu", "View the menu")}
              </Link>
              <Link
                href={`/${locale}/workshop`}
                className="inline-flex items-center rounded-full border border-emerald-700/60 text-emerald-900 px-5 py-2 text-sm font-medium bg-white/70 hover:bg-white transition-colors"
              >
                {t("S'inscrire à un atelier", "Join a workshop")}
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 text-xs md:text-[13px] text-emerald-900/80">
              <div>
                <p className="font-semibold">
                  {t("Catering & événements", "Catering & events")}
                </p>
                <p className="text-emerald-800/80">
                  {t(
                    "Mariages, anniversaires, repas d’entreprise",
                    "Weddings, birthdays, company dinners"
                  )}
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  {t("Options végétariennes", "Vegetarian options")}
                </p>
                <p className="text-emerald-800/80">
                  {t(
                    "Menu adapté sur demande",
                    "Menu adapted on request"
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Right side – hero image card */}
          <div className="relative">
            <div className="rounded-[32px] border border-emerald-50 bg-white shadow-[0_24px_60px_rgba(15,81,60,0.18)] p-3 md:p-4">
              <div className="relative overflow-hidden rounded-[28px]">
                <Image
                  src="/kamoune-hero.jpg"
                  alt={t(
                    "Maqlouba palestinienne avec aubergines et grenade",
                    "Palestinian maqlouba with aubergines and pomegranate"
                  )}
                  width={900}
                  height={650}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-emerald-200/25 blur-2xl" />
          </div>
        </section>

        {/* WHY KAMOUNE */}
        <section className="mt-16 border-t border-emerald-50/60 pt-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-emerald-950 mb-6">
              {t("Pourquoi Kamoune ?", "Why Kamoune?")}
            </h2>

            <div className="grid gap-6 md:grid-cols-3 text-sm leading-relaxed">
              <div className="bg-white/70 rounded-2xl shadow-sm p-5 border border-emerald-50">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-500 mb-2">
                  {t("Cuisine authentique", "Authentic cuisine")}
                </p>
                <p className="font-medium text-emerald-900 mb-1">
                  {t("Recettes de famille", "Family recipes")}
                </p>
                <p className="text-emerald-800/80">
                  {t(
                    "Maqlouba, houmous, moutabbal, maamoul… préparés comme à la maison, avec des épices palestiniennes et une cuisson lente.",
                    "Maqlouba, hummus, moutabbal, maamoul… cooked like at home, with Palestinian spices and slow cooking."
                  )}
                </p>
              </div>

              <div className="bg-white/70 rounded-2xl shadow-sm p-5 border border-emerald-50">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-500 mb-2">
                  {t("Événements & traiteur", "Events & catering")}
                </p>
                <p className="font-medium text-emerald-900 mb-1">
                  {t("Pour vos moments importants", "For your special moments")}
                </p>
                <p className="text-emerald-800/80">
                  {t(
                    "Mariages, anniversaires, repas d’entreprise ou dîners entre amis : nous adaptons le menu et les quantités à vos besoins.",
                    "Weddings, birthdays, corporate events or cosy dinners: we adapt the menu and quantities to your needs."
                  )}
                </p>
              </div>

              <div className="bg-white/70 rounded-2xl shadow-sm p-5 border border-emerald-50">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-500 mb-2">
                  {t("Options végétariennes", "Vegetarian friendly")}
                </p>
                <p className="font-medium text-emerald-900 mb-1">
                  {t("Menu flexible", "Flexible menu")}
                </p>
                <p className="text-emerald-800/80">
                  {t(
                    "De nombreux plats sans viande, possibilité de menus végétariens ou sans lactose sur demande.",
                    "Many meat-free dishes and the possibility of fully vegetarian or low-lactose menus on request."
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section className="mt-16 pb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-emerald-950 mb-6">
              {t("Ce que nous proposons", "What we offer")}
            </h2>

            <div className="grid gap-6 md:grid-cols-3 text-sm">
              <div className="rounded-2xl border border-emerald-100 bg-[#fffaf3] p-5">
                <h3 className="font-semibold text-emerald-900 mb-2">
                  {t("Commandes & repas", "Orders & meals")}
                </h3>
                <p className="text-emerald-800/80 mb-3">
                  {t(
                    "Plats préparés à Toulouse, à venir récupérer ou livrer selon les disponibilités.",
                    "Dishes prepared in Toulouse, to pick up or have delivered depending on availability."
                  )}
                </p>
                <p className="text-xs text-emerald-700/80">
                  {t(
                    "Parfait pour un dîner chaleureux entre amis ou en famille.",
                    "Perfect for a warm dinner with family or friends."
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-[#fffaf3] p-5">
                <h3 className="font-semibold text-emerald-900 mb-2">
                  {t("Service traiteur", "Catering service")}
                </h3>
                <p className="text-emerald-800/80 mb-3">
                  {t(
                    "Buffet de mezzés, plats chauds et desserts pour vos événements privés ou professionnels.",
                    "Buffets of mezzes, hot dishes and desserts for private or professional events."
                  )}
                </p>
                <p className="text-xs text-emerald-700/80">
                  {t(
                    "Nous construisons le menu avec vous, selon votre budget.",
                    "We build the menu together with you, according to your budget."
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-[#fffaf3] p-5">
                <h3 className="font-semibold text-emerald-900 mb-2">
                  {t("Ateliers de cuisine", "Cooking workshops")}
                </h3>
                <p className="text-emerald-800/80 mb-3">
                  {t(
                    "Ateliers conviviaux pour découvrir les secrets de la cuisine palestinienne et cuisiner ensemble.",
                    "Friendly workshops to discover Palestinian cuisine and cook together."
                  )}
                </p>
                <p className="text-xs text-emerald-700/80">
                  {t(
                    "Idéal pour groupes, team-building ou bons cadeaux.",
                    "Ideal for groups, team-building or gift vouchers."
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}