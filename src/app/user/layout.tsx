import Sidebar from "./_components/sidebar";

import { TRPCReactProvider } from "~/trpc/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-full flex-grow">
      <Sidebar />
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </div>
  );
};