"use client";

import { Button } from "~/components/ui/button";

import { X } from "lucide-react"

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function ExitButton() {
  const router = useRouter();
  return (
    <Button variant="outline" size="icon" onClick={() => router.back()}>
      <X />
    </Button>
  )
}

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  };

  return (
    <dialog
      ref={dialogRef}
      className="absolute bg-card/90"
      onClose={onDismiss}
      onClick={onDismiss}
    >
      <div onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  );
};