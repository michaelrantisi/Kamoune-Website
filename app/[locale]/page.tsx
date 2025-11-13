// C:\Users\USER\Desktop\Kamoune\app\[locale]\page.tsx
import Link from 'next/link';

export default function HomePage({ params }: { params: { locale: 'fr' | 'en' } }) {
  const { locale } = params;
  const t = (fr: string, en: string) => (locale === 'fr' ? fr : en);

  return (
    <main className="text-center p-10">
      <h1 className="text-4xl font-bold mb-4">Kamoune</h1>
      <p className="mb-4">{t('Cuisine palestinienne, 100% fait maison', 'Palestinian cuisine, 100% homemade')}</p>

      <img
        src="/kamoune-hero.jpg"
        alt="Hero image"
        className="w-full max-w-3xl mx-auto rounded shadow mb-6"
      />

      <div className="flex justify-center gap-4">
        <Link href={`/${locale}/menu`} className="bg-primary text-white px-4 py-2 rounded">
          {t('Voir le menu', 'See the menu')}
        </Link>
        <Link href={`/${locale}/workshop`} className="border border-primary text-primary px-4 py-2 rounded">
          {t("S'inscrire à un atelier", 'Register for a workshop')}
        </Link>
      </div>
    </main>
  );
}
