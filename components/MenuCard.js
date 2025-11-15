"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function MenuCard({ item, locale }) {
  const { addItem } = useContext(CartContext);

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price ?? 0 });
  };

  return (
    <article className="card flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-lg text-primaryDark">{item.name}</h3>
        {item.description && (
          <p className="text-sm text-slate-600 mt-1">{item.description}</p>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="font-bold text-primaryDark">
          {item.price !== undefined
            ? `${item.price} €`
            : locale === "fr"
            ? "Sur devis"
            : "On quote"}
        </span>
        <button
          onClick={handleAdd}
          className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-medium hover:bg-primaryDark transition-colors"
        >
          {locale === "fr" ? "Ajouter" : "Add"}
        </button>
      </div>
    </article>
  );
}
