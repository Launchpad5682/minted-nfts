import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { Inter } from "next/font/google";
import Provider from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Minted NFTs",
  description: "Minted NFTs on Meroku",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
