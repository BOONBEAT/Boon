import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WalletContextProvider from "@/contexts/ClientWalletProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boon",
  description:
    "Discover, Identify, and Interact with Music on the Solana Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-inter antialiased bg-[#271807] text-white tracking-wider`}
      >
        <WalletContextProvider>
          <>{children}</>
        </WalletContextProvider>
      </body>
    </html>
  );
}
