"use client";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function PageCartBadge() {
  const { itemCount } = useContext(CartContext);
  return (
    <span className="text-xs inline-flex items-center gap-1 border rounded px-2 py-1">
      🛒 {itemCount}
    </span>
  );
}
