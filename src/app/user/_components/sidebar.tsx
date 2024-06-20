import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { Separator } from "~/components/ui/separator"

async function Nav() {
  const session = await getServerAuthSession();

  const links = [
    { href: '/user', label: 'Profile' },
    { href: '/user/settings', label: 'Settings' },
  ]
  return (
    <nav className="flex flex-col align-top justify-between h-full w-full">
      <div>
      {links.map((link) => (
        <div key={link.label}>
          <Link
          href={link.href}
            className="block p-1 w-full border-b border-foreground"
          >
            {link.label}
          </Link>
          <Separator className=" w-11/12 " />
        </div>
      ))}
      </div>
    </nav>
  )
}

export default async function Sidebar() {

  return (
    <nav className="flex-1 flex w-full items-center justify-between border-b p-2 m-5 text-xl font-semibold bg-muted/40 rounded-lg">
      <Nav />
    </nav>
  );
};