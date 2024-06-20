import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator, Transition } from '@headlessui/react'
import { useState } from 'react'
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import * as fa from 'react-icons/fa';

async function Nav() {
  const session = await getServerAuthSession();

  const links = [
    { href: '/settings', label: 'Settings' },
    { href: '/support', label: 'Support' },
    { href: '/license', label: 'License' },
  ]

  return (
    <div>
      <Menu>
        <MenuButton >
          <fa.FaBars className="ml-4" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
        <MenuItems anchor="bottom" className="rounded-lg p-1 min-w-32 bg-black">
          {links.map((link) => (
            <MenuItem key={link.href} >
              <a
                href={link.href}
                className="block p-1 rounded-lg data-[focus]:bg-slate-800"
              >
                {link.label}
              </a>
            </MenuItem>
          ))}
        </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

async function Profile() {
  const session = await getServerAuthSession();

  return (
    <div>
    {
      session ?
        <Menu>
          <MenuButton >
              <img className="rounded-full w-10 ml-4" src={session.user?.image} alt="profile picture" />
          </MenuButton>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems anchor="bottom" className="rounded-lg p-1 min-w-32 bg-black">
                <MenuItem disabled>
                  <div className="flex flex-col">
                      <div className="flex items-center">
                      <img className="rounded-full w-10 mr-3" src={session.user?.image} alt="profile picture" />
                      <p className="block p-1 font-bold">
                        {session.user?.name}
                      </p>
                    </div>
                    <p className="block p-1">
                      {session.user?.email}
                    </p>
                  </div>
                </MenuItem>
                <MenuSeparator className="my-1 h-px bg-white" />
                <MenuItem>
                  <a
                    className="block p-1 rounded-lg data-[focus]:bg-slate-800"
                    href="/settings"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuSeparator className="my-1 h-px bg-slate-600" />
                <MenuItem>
                  <Link
                    className="block p-1 rounded-lg data-[focus]:bg-slate-800"
                    href="/api/auth/signout"
                  >
                    Sign out
                  </Link>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        :
        <Link
          href="/api/auth/signin"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          Sign in
        </Link>
    }
    </div>
  );
};

export default async function Topnav() {

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <Link href="/"><h1>React Template 2</h1></Link>
      
      <div className="flex items-center">
        <Nav />
        <Profile />
      </div>
    </nav>
  );
};