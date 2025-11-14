"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "@/data/menuParticuliers";
import MenuCard from "@/components/MenuCard";

export default function MenuParticuliersPage() {
  const params = useParams();
  const locale = (params?.locale === "en" ? "en" : "fr") as "fr" | "en";

  const [mounted, setMounted] = useState(false);

  // prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const t = (fr: string, en: string) => (locale === "fr" ? fr : en);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">
          {t("Menu Particuliers", "Individual Menu")}
        </h1>

        {/* only back button; cart lives in Navbar */}
        <Link
          href={`/${locale}`}
          className="text-sm border px-3 py-1 rounded"
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
