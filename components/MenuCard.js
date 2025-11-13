"use client";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function MenuCard({ item, locale }) {
  const { addItem } = useContext(CartContext);

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price ?? 0 });
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold">{item.name}</h3>
        {item.description && <p className="text-sm text-gray-600 mt-1">{item.description}</p>}
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="font-bold">
          {item.price !== undefined ? `${item.price} €` : locale === "fr" ? "Sur devis" : "Quote"}
        </span>
        <button className="bg-primary text-white px-3 py-1 rounded" onClick={handleAdd}>
          {locale === "fr" ? "Ajouter" : "Add"}
        </button>
      </div>
    </div>
  );
}
