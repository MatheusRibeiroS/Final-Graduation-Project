"use client";
import Link from "next/link";
import SlideOvers from "@/components/Slide-overs";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { google } from "googleapis";

export default async function Home() {
  const { data: session } = useSession();

  console.log("session", session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <button onClick={() => signIn("google")}>entrar</button>
        <button onClick={() => signOut()}>sair</button>
        <Link href="/teste">page</Link>
        <SlideOvers />
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const auth = new google.auth.GoogleAuth({
    // your credentials to authenticate
    keyFile: process.cwd() + "/credentials.json",
    // the actions you are permissed to perform using this API, in this case
    // all CRUD operations are permissed, check out
    // [ https://developers.google.com/drive/api/guides/api-specific-auth ]
    // for more advice on scopes
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const drive = google.drive({ version: "v3", auth });
  try {
    const res = await drive.files.list();
    const files = res.data.files;

    console.log(files);
  } catch (error: any) {
    console.error("Error fetching files:", error.message);
    return null;
  }
}
