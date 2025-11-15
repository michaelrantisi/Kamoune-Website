"use client";

import Link from "next/link";
import Image from "next/image";
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

  const links = [
    { href: "/menu", labelFr: "Menu", labelEn: "Menu" },
    { href: "/menu/traiteur", labelFr: "Traiteur", labelEn: "Catering" },
    { href: "/workshop", labelFr: "Ateliers", labelEn: "Workshops" },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-cardBorder bg-white/90 backdrop-blur">
      <div className="section flex items-center justify-between py-3">
        {/* Logo + brand */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="relative h-9 w-9 rounded-full overflow-hidden border border-cardBorder bg-sand">
            <Image
              src="/kamoune-logo.jpg"
              alt="Kamoune logo"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl font-semibold text-primaryDark">
              Kamoune
            </div>
            <div className="text-[11px] text-slate-500">
              {locale === "fr"
                ? "Cuisine palestinienne, 100% fait maison"
                : "Homemade Palestinian cuisine"}
            </div>
          </div>
        </Link>

        {/* Links + cart + language */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-5 text-sm">
            {links.map((link) => {
              const href = to(link.href);
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={link.href}
                  href={href}
                  className={`relative pb-1 ${
                    active ? "text-primaryDark font-medium" : "text-slate-700"
                  }`}
                >
                  {locale === "fr" ? link.labelFr : link.labelEn}
                  {active && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Cart */}
          <Link href={to("/order")} className="relative inline-flex items-center">
            <span className="text-xl">🧺</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-accent text-white rounded-full px-1.5 py-0.5">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1 rounded-full border border-cardBorder bg-sand px-3 py-1 text-xs font-medium text-slate-700 hover:border-primary hover:text-primaryDark"
          >
            {locale === "fr" ? (
              <>
                <span>🇬🇧</span>
                <span>EN</span>
              </>
            ) : (
              <>
                <span>🇫🇷</span>
                <span>FR</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
