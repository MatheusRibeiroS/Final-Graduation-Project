"use client";
import Link from "next/link";
import SlideOvers from "@/components/Slide-overs";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status, update } = useSession();
  console.log('useSession', session, status, update)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <button onClick={() => signIn('google')}>entrar</button>
        <button onClick={() => signOut()}>sair</button>
        <Link href="/teste">page</Link>
        <SlideOvers />
      </div>
    </main>
  );
}
