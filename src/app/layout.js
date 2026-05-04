import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Menu from "./components/Menu";
import LoadingTransitionProvider from "./components/LoadingTransition";

const mono = JetBrains_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Terms of Entry — Architectures of Anticipation in New York City",
  description: "A digital exhibition on waiting. Thank you for waiting.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${mono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <LoadingTransitionProvider>
          {children}
          <Menu />
        </LoadingTransitionProvider>
      </body>
    </html>
  );
}
