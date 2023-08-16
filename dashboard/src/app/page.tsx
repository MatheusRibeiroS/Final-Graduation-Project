"use client";
import SlideOvers from "@/components/Slide-overs";
import { getSession, useSession, signIn, signOut } from "next-auth/react";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import { useEffect, useState } from "react";

export default function Home() {
  const [session, setSession] = useState<any>();
  const { data: token, status } = useSession();

  console.log("token", token);

  useEffect(() => {
    const getSession = async () => {
      const teste = await getSession();
      console.log("teste", teste);
      setSession(teste);
    };
    getSession();
  }, []);

  return (
    <main>
      <div>
        <button onClick={() => signIn("google")}>entrar</button>
        <button onClick={() => signOut()}>sair</button>
        {/* <SlideOvers /> */}
      </div>
    </main>
  );
}
