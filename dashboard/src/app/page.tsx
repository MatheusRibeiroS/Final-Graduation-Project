"use client";
import SlideOvers from "@/components/Slide-overs";
import { useSession, signIn, signOut } from "next-auth/react";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const { data: token, status, update, data: session } = useSession();
  const router = useRouter()
  console.log("status", status);

  if (status === "authenticated") {
    console.log("signed in as ", session?.user?.email);
  }

  console.log("session", session);

  console.log("token", token);

  // if (!token || status === "unauthenticated") {
  //   router.push("/auth/signin");
  // }  else if (token || status === "authenticated") {
    return (
      <main>
      <div>
        <button onClick={() => signIn("google")}>entrar</button>
        <button onClick={() => signOut()}>sair</button>
        {/* <SlideOvers /> */}
      </div>
    </main>
    );
  // }
}
