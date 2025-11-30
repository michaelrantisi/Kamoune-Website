"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import menuData from "@/data/menuParticuliers";
import MenuCard from "@/components/MenuCard";

type Locale = "fr" | "en";

export default function MenuParticuliersPage() {
  const { locale: rawLocale } = useParams<{ locale: Locale }>();
  const locale: Locale = rawLocale === "en" ? "en" : "fr";

  const t = (fr: string, en: string) => (locale === "fr" ? fr : en);

  return (
    <div className="min-h-screen bg-[#f6efe4]">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#4b2a17]">
              {t("Menu particuliers", "Individual menu")}
            </h1>
            <p className="mt-2 text-sm text-[#7a5a3b]">
              {t(
                "Mezzés, plats et desserts faits maison, inspirés de la cuisine palestinienne.",
                "Homemade mezzés, mains and desserts inspired by Palestinian cuisine."
              )}
            </p>
          </div>

          <Link
            href={`/${locale}`}
            className="text-sm border border-[#c9a070] text-[#7a4b28] px-3 py-1 rounded-full hover:bg-[#f1dfc7] transition"
          >
            ← {t("Retour à l’accueil", "Back to home")}
          </Link>
        </div>

        {/* Sections */}
        <div className="mt-8 space-y-8">
          {menuData.map((section) => (
            <section
              key={section.category_fr}
              className="rounded-2xl border border-[#ead4b2] bg-[#fff7ec] px-4 py-5 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-[#4b2a17] mb-4">
                {locale === "fr" ? section.category_fr : section.category_en}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item) => (
                  <MenuCard key={item.id} item={item} locale={locale} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
