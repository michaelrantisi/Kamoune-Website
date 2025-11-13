"use client";
import { useContext } from 'react';
import { CartContext } from "@/context/CartContext";
import Link from 'next/link';


export default function CartPage() {
const { cartItems, removeItem, total } = useContext(CartContext);


return (
<div className="max-w-2xl mx-auto p-4">
<h2 className="text-xl font-bold mb-4">Votre commande</h2>
{cartItems.length === 0 ? (
<p>Votre panier est vide.</p>
) : (
<div>
<ul className="space-y-4">
{cartItems.map((item, i) => (
<li key={i} className="border-b pb-2">
<div className="flex justify-between">
<div>
<p className="font-medium">{item.name}</p>
<p className="text-sm text-gray-500">{item.quantity} × {item.price}€</p>
</div>
<button
onClick={() => removeItem(item.id)}
className="text-red-500 hover:underline"
>
Supprimer
</button>
</div>
</li>
))}
</ul>
<div className="mt-4 text-right">
<p className="font-semibold text-lg">Total: {total} €</p>
<Link
href="/order"
className="inline-block mt-3 bg-primary text-white px-4 py-2 rounded"
>
Finaliser la commande
</Link>
</div>
</div>
)}
</div>
);
}