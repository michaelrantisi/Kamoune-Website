import "../styles/globals.css";

export const metadata = {
  title: "Kamoune",
  description: "Cuisine palestinienne à Toulouse",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
