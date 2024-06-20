import "~/styles/globals.css";

import { ThemeProvider } from "~/components/theme-provider"

import Topnav from "./_components/topnav";
import Footer from "./_components/footer";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "react Template 2",
  description: "AAAAAA",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex min-h-screen min-w-80 flex-col text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <Topnav />
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};