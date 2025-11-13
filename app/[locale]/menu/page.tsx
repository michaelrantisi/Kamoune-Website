// app/[locale]/menu/page.tsx
import Link from "next/link";
import menuData from "@/data/menuParticuliers";
import MenuCard from "@/components/MenuCard";

type Params = {
  locale: "fr" | "en";
};

export default function MenuParticuliersPage({ params }: { params: Params }) {
  const { locale } = params;
  const t = (fr: string, en: string) => (locale === "fr" ? fr : en);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {t("Menu Particuliers", "Individual Menu")}
        </h1>

        {/* Just a clean back button – cart is handled by Navbar */}
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
