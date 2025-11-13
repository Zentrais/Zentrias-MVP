import "./globals.css";
import Navbar from "../components/navbar";
import LanguageProviderWrapper from "../components/language-provider-wrapper";
import FloatingCTA from "../components/floating-cta";

export const metadata = {
  title: "Zentrais",
  description: "AI Debate Engine",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <LanguageProviderWrapper>
          {/* NAVBAR */}
          <Navbar />

          {/* CONTENIDO PRINCIPAL */}
          <main className="flex-grow pt-16">{children}</main>

          {/* FLOATING CTA */}
          <FloatingCTA />
        </LanguageProviderWrapper>
      </body>
    </html>
  );
}
