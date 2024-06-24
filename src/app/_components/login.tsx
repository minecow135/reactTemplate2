"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { LogIn, LogOut, } from "lucide-react"

export function LoginButton() {
  return (
    <div className="flex items-center p-1 rounded-lg cursor-pointer w-full h-full" onClick={() => signIn()}>
      <LogIn className="mr-2 h-4 w-4" />
      <span>Sign in</span>
    </div>
  );
}

export function LogoutButton() {
  return (
    <div className="flex items-center p-1 rounded-lg cursor-pointer w-full h-full" onClick={() => signOut()}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Sign out</span>
    </div>
  );
}