"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname() || "/fr";
  const router = useRouter();
  const { itemCount } = useContext(CartContext);

  const locale = pathname.split("/")[1] === "en" ? "en" : "fr";
  const to = (path) => `/${locale}${path}`;

  const toggleLanguage = () => {
    const nextLocale = locale === "fr" ? "en" : "fr";
    const rest = pathname.replace(/^\/(fr|en)/, "");
    router.push(`/${nextLocale}${rest || "/"}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={`/${locale}`} className="text-xl font-bold text-primary">
          Kamoune
        </Link>
        <div className="flex items-center gap-5">
          <Link href={to("/menu")} className="hover:underline">
            Menu
          </Link>
          <Link href={to("/menu/traiteur")} className="hover:underline">
            Traiteur
          </Link>
          <Link href={to("/workshop")} className="hover:underline">
            {locale === "fr" ? "Ateliers" : "Workshops"}
          </Link>

          <Link href={to("/order")} className="relative inline-flex items-center">
            <span className="text-2xl">🛒</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1.5 py-0.5">
                {itemCount}
              </span>
            )}
          </Link>

          <button onClick={toggleLanguage} className="text-sm border px-2 py-1 rounded">
            {locale === "fr" ? "🇬🇧 EN" : "🇫🇷 FR"}
          </button>
        </div>
      </div>
    </nav>
  );
}
