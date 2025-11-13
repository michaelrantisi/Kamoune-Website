"use client";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function PageProbe() {
  const { itemCount, addItem } = useContext(CartContext);
  return (
    <button
      className="text-xs border px-2 py-1 rounded"
      onClick={() => addItem({ id: "page-probe", name: "Page Probe", price: 1 })}
      title="Adds a test item from inside the Menu page"
    >
      page +1 ({itemCount})
    </button>
  );
}
