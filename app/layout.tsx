import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { theme } from "../theme";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  //   variable: '--font-montserrat', // tailwind
});

export const metadata: Metadata = {
  title: "CookMate",
  description: `CookMate is an online platform that aims to bring food enthusiasts together in
     a community where they can share, discover, and enjoy cooking recipes. Whether you're a 
     seasoned chef or a culinary novice, CookMate provides a comprehensive set of features that 
     allow you to not only find the perfect dish to whip up but also contribute to a growing repository 
     of diverse and delectable recipes.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.jpg" sizes="any" />
        <ColorSchemeScript />
      </head>
      <body className={montserrat.className}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
