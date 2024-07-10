import Sidebar from "./_components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-full flex-grow">
      <Sidebar />
      {children}
    </div>
  );
};