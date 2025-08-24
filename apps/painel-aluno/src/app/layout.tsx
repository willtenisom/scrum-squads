import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Scrum - Registro por Squads",
  description: "Plataforma para registro de Daily Scrum por Squads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {}
      <body className="bg-gray-100 font-sans">{children}</body>
    </html>
  );
}
