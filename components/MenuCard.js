"use client";
import { useContext } from "react";
import Image from "next/image";
import { CartContext } from "@/context/CartContext";

export default function MenuCard({ item, locale }) {
  const { addItem } = useContext(CartContext);

  const name = locale === "fr" ? item.name_fr : item.name_en;
  const description =
    locale === "fr" ? item.description_fr : item.description_en;
  const note = locale === "fr" ? item.note_fr : item.note_en;

  // 🔴 OLD (wrong):
  // const imageSrc = `/${item.id}.jpg`;

  // 🟢 NEW: use the image path from menuParticuliers.ts
  const imageSrc = item.image || "/kamoune-hero.jpg";

  const handleAdd = () => {
    addItem({
      id: item.id,
      name,
      price: item.price ?? 0,
      description,
    });
  };

  return (
    <div className="group border rounded-xl p-4 shadow-sm flex flex-col justify-between bg-white/90 hover:shadow-md transition-shadow">
      {/* Image block */}
      {imageSrc && (
        <div className="overflow-hidden rounded-lg mb-3 relative">
          <Image
            src={imageSrc}
            alt={name}
            width={500}
            height={320}
            className="h-40 w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/15 via-transparent to-transparent" />
        </div>
      )}

      {/* Text + info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-emerald-900">{name}</h3>
          {description && (
            <p className="text-sm text-gray-700 mt-1 leading-snug">
              {description}
            </p>
          )}
          {note && (
            <p className="text-xs text-amber-700 mt-1 italic">{note}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-emerald-900">
            {item.price !== undefined && item.price !== null
              ? `${item.price} €`
              : locale === "fr"
              ? "Sur devis"
              : "On quotation"}
          </span>
          <button
            className="bg-primary text-white px-3 py-1 rounded-full text-sm hover:bg-emerald-800 transition-colors"
            onClick={handleAdd}
          >
            {locale === "fr" ? "Ajouter" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
