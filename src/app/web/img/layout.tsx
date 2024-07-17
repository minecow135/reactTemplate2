export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-full flex-grow">
      {children}
      {modal}
    </div>
  );
};