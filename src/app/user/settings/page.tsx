import { Separator } from "~/components/ui/separator"

export default async function Settings() {

  return (
    <main className="flex w-full h-full flex-grow flex-col items-center mt-5">
      <h1 className="font-extrabold tracking-tight sm:text-[3rem]">Settings</h1>
      <Separator className="my-4 w-10/12" />

    </main>
  );
};