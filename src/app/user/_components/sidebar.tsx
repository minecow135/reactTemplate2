import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

async function Nav() {
  const session = await getServerAuthSession();

  const links = [
    { href: '/user', label: 'Profile', active: true},
    { href: '/user/settings', label: 'Settings' },
  ]
  return (
    <div className="flex flex-col align-top justify-between h-full w-full">
      <div>
      {links.map((link) => (
        link.active ?
          <div key={link.label}>
            <Link
              href={link.href}
              className="block p-1 w-full"
            >
            <p className="border-b border-foreground truncate font-extrabold">{link.label}</p>
            </Link>
          </div>
        :
          <div key={link.label}>
            <Link
              href={link.href}
              className="block p-1 w-full"
            >
              <p className="border-b border-foreground truncate">{link.label}</p>
            </Link>
          </div>
      ))}
      </div>
    </div>
  )
}

export default async function Sidebar() {

  return (
    <nav className="items-center justify-between border-b p-2 m-5 text-xl font-semibold bg-muted/40 rounded-lg w-60">
      <div>
        
      </div>
      <Nav />
    </nav>
  );
};