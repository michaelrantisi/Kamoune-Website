"use client";
import { useRouter, usePathname } from "next/navigation";

export default function SafeBackButton() {
  const router = useRouter();
  const pathname = usePathname() || "/fr";
  const locale = pathname.split("/")[1] === "en" ? "en" : "fr";

  const onClick = () => {
    if (window.history.length > 1) router.back();
    else router.push(`/${locale}`);
  };

  return (
    <button onClick={onClick} className="text-sm border px-2 py-1 rounded">
      ← Retour
    </button>
  );
}
