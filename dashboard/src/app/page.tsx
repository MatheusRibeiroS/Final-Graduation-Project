"use client";
import SlideOvers from "@/components/Slide-overs";
import { useSession, signIn, signOut } from "next-auth/react";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Chat } from "@/components/chat";
import { GoogleData, GoogleToken } from "@/types/google";
import { getCredentials } from "@/service/getCredentials";
import { AxiosResponse } from "axios";

export default function Home() {
  const { data: token, status, update, data: session } = useSession();
  const [credentials, setCredentials] = useState<AxiosResponse<GoogleData>>();

  const router = useRouter();

  useEffect(() => {
    if (!credentials) {
      getCredentials().then((response) => {
        setCredentials(response);
      });
    }
  }, [credentials]);

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
      <button onClick={() => signIn("google")}>entrar</button>
      <button
        onClick={() => {
          signOut();
          router.push("/auth/signIn");
        }}
      >
        sair
      </button>
      {/* <SlideOvers /> */}
    </main>
  );
  // }
}
