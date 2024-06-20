import { User, LogOut, } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "~/components/ui/dropdown-menu"
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
    <div className="ml-4">
      <DropdownMenu>
        <DropdownMenuTrigger><fa.FaBars /></DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-lg p-1 min-w-32">
          {links.map((link) => (
            <DropdownMenuItem key={link.href}>
              <Link
                href={link.href}
                className="block p-1 w-full"
              >
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

async function Profile() {
  const session = await getServerAuthSession();

  return (
    <div className="ml-4">
      {
        session ?
          <DropdownMenu>
            <DropdownMenuTrigger><img className="rounded-full w-10 border" src={(session.user?.image as string)} alt="profile picture" /></DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-lg p-1 min-w-32">
              <DropdownMenuLabel key={"userinfo"}>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <img className="rounded-full w-10 mr-3" src={(session.user?.image as string)} alt="profile picture" />
                    <p className="block p-2 font-bold">
                      {session.user?.name}
                    </p>
                  </div>
                  <p className="block pt-4">
                    {session.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem key={"profile"}>
                <Link
                  className="flex items-center p-1 rounded-lg"
                  href="/user"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem key={"logout"}>
                <Link
                  className="flex items-center p-1 rounded-lg"
                  href="/api/auth/signout"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          :
          <Link
            href="/api/auth/signin"
            className="rounded-full bg-primary text-primary-foreground px-10 py-3 font-semibold no-underline transition hover:bg-secondary"
          >
            Sign in
          </Link>
      }
    </div>
  );
};

export default async function Topnav() {

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold bg-muted">
      <Link href="/"><h1 className="h-full">React Template 2</h1></Link>

      <div className="flex items-center">
        <Nav />
        <Profile />
      </div>
    </nav>
  );
};