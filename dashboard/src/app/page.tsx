"use client";
import SlideOvers from "@/components/Slide-overs";
import { useSession, signIn, signOut } from "next-auth/react";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleData, GoogleToken } from "@/types/google";
import { getCredentials } from "@/service/getCredentials";
import { AxiosResponse } from "axios";
import LeftSider from "@/components/LeftSider";
import Editor from "@/components/editor";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import RightDrawer from "../components/RightSider";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import React from "react";
import { Roboto } from "next/font/google";
import {
  getColorModeContext,
  setColorModeContext,
} from "./toggleColorModeContext";
import { get } from "http";
import router from "next/router";

export default function Home() {
  const { data: token, status, update, data: session } = useSession();
  const [credentials, setCredentials] = useState<AxiosResponse<GoogleData>>();
  const [mode, setMode] = React.useState<"light" | "dark">("light");

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

  // const roboto = Roboto({
  //   weight: ['300', '400', '500', '700'],
  //   subsets: ['latin'],
  //   display: 'swap',
  // });

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        // typography: {
        //   fontFamily: roboto.style.fontFamily,
        // },
        components: {
          MuiAlert: {
            styleOverrides: {
              root: ({ ownerState }) => ({
                ...(ownerState.severity === "info" && {
                  backgroundColor: "#60a5fa",
                }),
              }),
            },
          },
        },
      }),
    [mode]
  );

  // if (!token || status.toLowerCase() === "unauthenticated") {
  //   signOut();
  // }  else if (token || status === "authenticated") {
  const ColorModeContext = getColorModeContext();
  const colorMode = React.useContext(ColorModeContext);
  
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: "flex", flexWrap: "none" }}>
            <LeftSider />
            <Container maxWidth="lg">
              {/* <button onClick={() => signIn("google")}>entrar</button>
              <button
                onClick={() => {
                  signOut();
                  router.push("/auth/signIn");
                }}
              >
                sair
              </button> */}
              <Editor />
            </Container>
            <RightDrawer />
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
  // }
}
