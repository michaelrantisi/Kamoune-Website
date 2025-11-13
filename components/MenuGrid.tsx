"use client";

import dynamic from "next/dynamic";
const MenuCard = dynamic(() => import("@/components/MenuCard"), { ssr: false });

type Item = { id: string; name: string; price?: number; description?: string };

export default function MenuGrid({
  locale,
  sections,
}: {
  locale: "fr" | "en";
  sections: { category: string; items: Item[] }[];
}) {
  return (
    <>
      {sections.map((section) => (
        <div key={section.category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{section.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.items.map((item) => (
              <MenuCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
