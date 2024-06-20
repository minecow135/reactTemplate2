import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react'
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";


export default async function Topnav() {
  const session = await getServerAuthSession();

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <h1>React Template 2</h1>
      

      {session ?
        <Menu>
          <MenuButton >
            <img className="rounded-full w-10" src={session.user?.image} alt="profile picture" />
            </MenuButton>
          <MenuItems anchor="bottom" className="rounded-lg p-1 min-w-32 bg-black">
            <MenuItem disabled>
              <div className="profile">
                <p className="block p-1 font-bold">
                  {session.user?.name}
                </p>
                <p className="block p-1">
                  {session.user?.email}
                </p>
              </div>
            </MenuItem>
            <MenuSeparator className="my-1 h-px bg-white" />
            <MenuItem>
              <a
                className="block p-1 rounded-lg data-[focus]:bg-blue-100"
                href="/profile"
              >
                Profile
              </a>
            </MenuItem>
            <MenuItem>
              <a 
                className="block p-1 rounded-lg data-[focus]:bg-blue-100"
                href="/settings"
              >
                Settings
              </a>
            </MenuItem>
            <MenuSeparator className="my-1 h-px bg-slate-600" />
            <MenuItem>
              <Link
                className="block p-1 rounded-lg data-[focus]:bg-blue-100"
                href="/api/auth/signout"
              >
                Sign out
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>
      :
        <Link
          href="/api/auth/signin"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          Sign in
        </Link>
      }
    </nav>
  );
};