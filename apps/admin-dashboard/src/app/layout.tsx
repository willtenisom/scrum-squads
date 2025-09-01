import "@/app/globals.css";
import { inter } from "@/components/ui/fonts";
import { AuthProvider } from "@/app/context/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        {}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
