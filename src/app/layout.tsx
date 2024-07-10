import "~/styles/globals.css";

import { ThemeProvider } from "~/components/theme-provider"
import { getServerAuthSession } from "~/server/auth";
import { SessionProvider } from "next-auth/react"
import { AppProps } from 'next/app';

import SessionProviderWrapper from './_components/SessionProviderWrapper'; 

import Topnav from "./_components/topnav";
import Footer from "./_components/footer";

import { GeistSans } from "geist/font/sans";


export const metadata = {
  title: "react Template 2",
  description: "AAAAAA",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex min-h-screen min-w-80 flex-col text-foreground">
        <SessionProviderWrapper session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            <Topnav />
            {children}
            <Footer />
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
};