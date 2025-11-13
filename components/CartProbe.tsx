"use client";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function CartProbe() {
  const ctx = useContext(CartContext);
  // Helpful logs to detect duplicate contexts / missing provider
  console.log("[CartProbe] ctx =", ctx);
  return (
    <button
      className="text-xs border px-2 py-1 rounded"
      onClick={() => ctx.addItem({ id: "probe", name: "Probe Item", price: 1 })}
      title="Adds a test item via CartContext"
    >
      probe +1 ({ctx.itemCount})
    </button>
  );
}
