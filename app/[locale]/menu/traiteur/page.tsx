"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import menuData from "@/data/menuTraiteur";
import MenuCard from "@/components/MenuCard";

export default function MenuTraiteurPage() {
  const { locale } = useParams<{ locale: "fr" | "en" }>();
  const t = (fr: string, en: string) => (locale === "fr" ? fr : en);

  return (
    <div className="max-w-5xl mx-auto p-6" suppressHydrationWarning>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("Menu Traiteur", "Catering Menu")}</h1>
        <Link
          href={`/${locale}`}
          className="text-sm border px-2 py-1 rounded"
        >
          ← {t("Retour", "Back")}
        </Link>
      </div>

      {menuData.map((section) => (
        <section key={section.category} className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">{section.category}</h2>
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
