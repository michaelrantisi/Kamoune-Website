"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BackButton() {
  const pathname = usePathname() || "/fr";
  const locale = pathname.split("/")[1] === "en" ? "en" : "fr";
  return (
    <Link href={`/${locale}`} className="text-sm border px-2 py-1 rounded">
      ← {locale === "fr" ? "Retour" : "Back"}
    </Link>
  );
}
