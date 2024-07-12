import { Separator } from "~/components/ui/separator"

import { getServerAuthSession } from "~/server/auth";

export default async function Settings() {
  const userDataRes = await getServerAuthSession();

  if (!userDataRes) {
    return (
      "Not loged in"
    );
  }
  
  const userData = userDataRes.user;

  return (
    <main className="flex w-full h-full flex-grow flex-col items-center mt-5">
      <h1 className="font-extrabold tracking-tight sm:text-[3rem]">Profile</h1>
      <Separator className="my-4 w-10/12" />

      <div className="flex flex-col w-4/5">
        <div className="w-full">
          <img className="rounded-full mb-10 mr-10 float-left w-1/4 border" src={(userData?.image as string)} alt="profile picture" />
          <div>
            <span>Username: </span>
            <span>{userData?.name}</span>
          </div>
          <div>
            <span>Email: </span>
            <span>{userData?.email}</span>
          </div>
        </div>
      </div>
    </main>
  );
};