"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import menuData from "@/data/menuParticuliers";
import MenuCard from "@/components/MenuCard";

export default function MenuParticuliersPage() {
  const { locale } = useParams<{ locale: "fr" | "en" }>();
  const t = (fr: string, en: string) => (locale === "fr" ? fr : en);

  return (
    <div className="section py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-1">
            {t("Notre carte", "Our menu")}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-primaryDark">
            {t("Menu Particuliers", "Individual Menu")}
          </h1>
        </div>
        <Link
          href={`/${locale}`}
          className="text-xs md:text-sm border border-cardBorder rounded-full px-3 py-1 hover:border-primary hover:text-primaryDark"
        >
          ← {t("Retour à l'accueil", "Back to home")}
        </Link>
      </div>

      {menuData.map((section) => (
        <section key={section.category} className="mt-8">
          <h2 className="text-xl font-semibold text-primaryDark mb-3">
            {section.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.items.map((item) => (
              <MenuCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
