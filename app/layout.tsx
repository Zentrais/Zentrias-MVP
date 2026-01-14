import "./globals.css";
import "glassmorphism/glassmorphic.css";
import Navbar from "../components/navbar";
import LanguageProviderWrapper from "../components/language-provider-wrapper";
import FloatingCTA from "../components/floating-cta";
import { Space_Grotesk, Playfair_Display, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Zentrais",
  description: "More than a social network!",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Zentrais",
    description: "More than a social network!",
    url: "https://www.zentrais.com",
    siteName: "Zentrais",
    images: [
      {
        url: "https://www.zentrais.com/favicon.png",
        width: 1200,
        height: 1200,
        alt: "Zentrais Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Zentrais",
    description: "More than a social network!",
    images: ["https://www.zentrais.com/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QW0W2XQB7Y"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QW0W2XQB7Y');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Zentrais",
              "url": "https://www.zentrais.com",
              "logo": "https://www.zentrais.com/favicon.png",
              "description": "More than a social network!",
              "sameAs": []
            }),
          }}
        />
      </head>
      <body className={`min-h-screen flex flex-col relative ${spaceGrotesk.variable} ${playfairDisplay.variable} ${inter.variable}`} style={{ backgroundColor: 'transparent' }}>
        <LanguageProviderWrapper>
          {/* FONDO GLOBAL ÚNICO - Renderizado una sola vez */}
          <div className="app-bg"></div>
          
          {/* CONTENIDO DE LA APLICACIÓN */}
          <main className="app-content">
            {/* NAVBAR */}
            <Navbar />

            {/* CONTENIDO PRINCIPAL */}
            <div className="flex-grow">{children}</div>

            {/* FLOATING CTA */}
            <FloatingCTA />
          </main>
        </LanguageProviderWrapper>
      </body>
    </html>
  );
}
