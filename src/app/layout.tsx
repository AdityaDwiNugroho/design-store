import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DesignStore - Premium Digital Design Resources",
  description: "Discover premium UI kits, templates, icons, and code snippets for designers and developers. High-quality digital products to accelerate your workflow.",
  keywords: "UI kits, templates, icons, design resources, digital products, web design, mobile design",
  authors: [{ name: "Aditya Dwi Nugroho", url: "https://github.com/AdityaDwiNugroho" }],
  creator: "Aditya Dwi Nugroho",
  openGraph: {
    title: "DesignStore - Premium Digital Design Resources",
    description: "Discover premium UI kits, templates, icons, and code snippets for designers and developers.",
    url: "https://github.com/AdityaDwiNugroho/digital-store",
    siteName: "DesignStore",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
