"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import menuData from "@/data/menuParticuliers";

type Locale = "fr" | "en";
type CategoryKey = "cold" | "hot" | "dessert" | "main";
type IndexState = Record<CategoryKey, number>;

export default function HomePage() {
  const { locale: rawLocale } = useParams<{ locale: Locale }>();
  const locale: Locale = rawLocale === "en" ? "en" : "fr";

  const t = (fr: string, en: string) => (locale === "fr" ? fr : en);

  // --- Prepare menu slices per category ---
  const { coldItems, hotItems, dessertItems, mainItems } = useMemo(() => {
    const cold = menuData.find((s) => s.category_fr === "Mezzés Froids")?.items ?? [];
    const hot = menuData.find((s) => s.category_fr === "Mezzés Chauds")?.items ?? [];
    const dessert = menuData.find((s) => s.category_fr === "Desserts")?.items ?? [];
    const main =
      menuData.find((s) => s.category_fr.startsWith("Plats"))?.items ?? [];

    return {
      coldItems: cold,
      hotItems: hot,
      dessertItems: dessert,
      mainItems: main,
    };
  }, []);

  const [indexes, setIndexes] = useState<IndexState>({
    cold: 0,
    hot: 0,
    dessert: 0,
    main: 0,
  });

  // Rotate dishes every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndexes((prev) => ({
        cold: coldItems.length ? (prev.cold + 1) % coldItems.length : 0,
        hot: hotItems.length ? (prev.hot + 1) % hotItems.length : 0,
        dessert: dessertItems.length ? (prev.dessert + 1) % dessertItems.length : 0,
        main: mainItems.length ? (prev.main + 1) % mainItems.length : 0,
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, [coldItems.length, hotItems.length, dessertItems.length, mainItems.length]);

  const getActiveItem = (key: CategoryKey) => {
    const map: Record<CategoryKey, typeof coldItems> = {
      cold: coldItems,
      hot: hotItems,
      dessert: dessertItems,
      main: mainItems,
    };
    const list = map[key];
    if (!list.length) return null;
    const idx = indexes[key] % list.length;
    return list[idx];
  };

  const featuredConfig: {
    key: CategoryKey;
    label_fr: string;
    label_en: string;
  }[] = [
    { key: "cold", label_fr: "Mezzés froids", label_en: "Cold mezzés" },
    { key: "hot", label_fr: "Mezzés chauds", label_en: "Hot mezzés" },
    { key: "dessert", label_fr: "Desserts maison", label_en: "Homemade desserts" },
    { key: "main", label_fr: "Plats familiaux", label_en: "Family mains" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#f9f1e4,_#f3e2cf_45%,_#e7d0ba)] text-[#4a2b1a]">
      {/* Watermark logo in the background */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center opacity-[0.40]">
        <Image
          src="/kamoune-watermark.jpg"
          alt="Kamoune logo watermark"
          width={700}
          height={700}
          className="max-w-[70vw] h-auto select-none"
        />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-16 lg:pt-14 lg:pb-20">
        {/* HERO SECTION */}
        <section className="grid gap-10 lg:grid-cols-[1.1fr,1.2fr] items-start">
          {/* Left side: text */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f6e7cf] px-3 py-1 text-xs font-medium text-[#9a5a26] border border-[#e1c399]">
              🇵🇸{" "}
              {t(
                "Cuisine palestinienne à Toulouse",
                "Palestinian cuisine in Toulouse"
              )}
            </span>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              {t("Saveurs de Palestine,", "Flavours of Palestine,")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c1204] via-[#0b5704] to-[#090d08]">
                {t("comme à la maison.", "just like home.")}
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-[#6e4c33] max-w-xl">
              {t(
                "Une table chaleureuse, des plats généreux, des mezzés à partager, et des desserts parfumés à la fleur d’oranger.",
                "A warm table, generous dishes, mezzés to share, and desserts scented with orange blossom."
              )}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/menu`}
                className="inline-flex items-center justify-center rounded-full bg-[#c46a30] px-5 py-2.5 text-sm font-semibold text-amber-50 shadow-[0_14px_30px_rgba(130,70,30,0.35)] hover:bg-[#b45f2a] transition"
              >
                {t("Voir le menu", "View the menu")}
              </Link>
              <Link
                href={`/${locale}/workshop`}
                className="inline-flex items-center justify-center rounded-full border border-[#d7b48b] bg-[#f8ecdd]/70 px-5 py-2.5 text-sm font-semibold text-[#8b4c24] hover:bg-[#f4dfc6] transition"
              >
                {t("Ateliers & traiteur", "Workshops & catering")}
              </Link>
            </div>

            <p className="mt-5 text-xs text-[#856043]">
              {t(
                "Fait maison, ingrédients frais.",
                "Homemade, fresh ingredients."
              )}
            </p>
          </div>

          {/* Right side: rotating featured dishes (image + name only) */}
          <div className="relative">
            {/* soft color glows */}
            <div className="absolute -top-6 -left-4 h-24 w-24 rounded-full bg-[#f0c89a]/60 blur-3xl" />
            <div className="absolute -bottom-10 -right-6 h-28 w-28 rounded-full bg-[#d88a58]/60 blur-3xl" />

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredConfig.map(({ key, label_fr, label_en }) => {
                const item = getActiveItem(key);
                if (!item) return null;
                const name = locale === "fr" ? item.name_fr : item.name_en;
                const img = item.image || "/kamoune-hero.jpg";

                return (
                  <div
                    key={key}
                    className="group rounded-2xl bg-[#fff8ef]/95 border border-[#e4c9a8] overflow-hidden shadow-[0_18px_45px_rgba(120,85,40,0.18)] backdrop-blur-sm flex flex-col"
                  >
                    <div className="px-3 py-1 text-[11px] font-semibold text-[#5f341b] bg-[#f3dfc6] border-b border-[#e6c7a2] uppercase tracking-wide">
                      {locale === "fr" ? label_fr : label_en}
                    </div>
                    <div className="relative h-32 w-full">
                      <Image
                        src={img}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-[#7c3f1f]">
                        {name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* LOWER INFO BLOCKS */}
        <section className="mt-12 space-y-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-[#fff8ef]/90 border border-[#ead1b1] p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-[#8a4b24]">
                {t("Pour vos soirées entre amis", "For your evenings with friends")}
              </h3>
              <p className="mt-2 text-sm text-[#725036]">
                {t(
                  "Commandez un assortiment de mezzés à partager : houmous, falafels, salades et pain chaud.",
                  "Order a selection of mezzés to share: hummus, falafels, salads and warm bread."
                )}
              </p>
            </div>
            <div className="rounded-2xl bg-[#fff8ef]/90 border border-[#ead1b1] p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-[#8a4b24]">
                {t(
                  "Ateliers cuisine palestinienne",
                  "Palestinian cooking workshops"
                )}
              </h3>
              <p className="mt-2 text-sm text-[#725036]">
                {t(
                  "Apprenez à préparer maqlouba, moussakhan ou knafeh dans une ambiance conviviale.",
                  "Learn how to cook maqlouba, musakhan or knafeh in a warm, friendly atmosphere."
                )}
              </p>
            </div>
            <div className="rounded-2xl bg-[#fff8ef]/90 border border-[#ead1b1] p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-[#8a4b24]">
                {t("Service traiteur", "Catering service")}
              </h3>
              <p className="mt-2 text-sm text-[#725036]">
                {t(
                  "Buffets, événements d’entreprise, célébrations familiales — nous adaptons le menu à vos envies.",
                  "Buffets, corporate events, family celebrations — we adapt the menu to your needs."
                )}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d9b183] bg-[#f9eddc]/90 p-6 text-sm text-[#6b4832] shadow-sm">
            <h2 className="text-xl font-semibold text-[#8a4b24]">
              {t("Comment commander ?", "How to order?")}
            </h2>
            <ol className="mt-3 space-y-1 list-decimal list-inside">
              <li>
                {t(
                  "Consultez le menu et ajoutez vos plats au panier.",
                  "Browse the menu and add your dishes to the cart."
                )}
              </li>
              <li>
                {t(
                  "Choisissez le paiement sur place ou en ligne.",
                  "Choose to pay on-site or online."
                )}
              </li>
              <li>
                {t(
                  "Validez votre commande, nous confirmons par email.",
                  "Validate your order, we confirm by email."
                )}
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
