import { userInfo } from "~/server/queries";

export default async function Settings() {
  let userData = await userInfo();
  console.log(userData);

  return (
    <main className="flex w-full h-full flex-grow flex-col items-center mt-5">
      <h1 className="font-extrabold tracking-tight sm:text-[3rem]">Settings</h1>
      <div className="flex w-4/5">
        <div>
          
        </div>
        <table>
          <tbody>
            <tr>
              <td>username</td>
              <td>{userData?.name}</td>
            </tr>
            <tr>
              <td>email</td>
              <td>{userData?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};