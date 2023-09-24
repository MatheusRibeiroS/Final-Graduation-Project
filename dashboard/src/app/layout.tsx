"use client";
import "./globals.css";
import { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import HorizontalDrawer from "../components/Drawer";
import LeftSider from "../components/LeftSider";
import Container from "@mui/material/Container";
import SwipeableEdgeDrawer from "../components/SwipeableEdgeDrawer";
import RightDrawer from "../components/RightSider";
import HomeContext from "./home.context";
import { HomeInitialState, initialState } from "./home.state";
import { useCreateReducer } from "@/hooks/useCreateReducer";
import { v4 as uuidv4 } from "uuid";
import { saveFolders } from "@/utils/app/folders";
import { FolderInterface, FolderType } from "@/types/folder";
import { Prompt } from "@/types/prompt";
import { savePrompts } from "@/utils/app/prompts";
import Promptbar from "../components/Promptbar";
import { Toaster } from "react-hot-toast";

// export const metadata = {
//   title: "TCC - Bachelor's Thesis",
//   description: "MatheusRibeiroS Bachelor's Thesis (TCC project)",
//   image: "/favicon.ico",
// };

export default function RootLayout({
  children,
  session,
  ...params
}: {
  children: ReactNode;
  session: any;
  params: any;
}) {
  const contextValue = useCreateReducer<HomeInitialState>({
    initialState,
  });

  const {
    state: {
      apiKey,
      lightMode,
      folders,
      conversations,
      selectedConversation,
      prompts,
      temperature,
    },
    dispatch,
  } = contextValue;

  // FOLDER OPERATIONS  --------------------------------------------

  const handleCreateFolder = (name: string, type: FolderType) => {
    const newFolder: FolderInterface = {
      id: uuidv4(),
      name,
      type,
    };

    const updatedFolders = [...folders, newFolder];

    dispatch({ field: "folders", value: updatedFolders });
    saveFolders(updatedFolders);
  };

  const handleDeleteFolder = (folderId: string) => {
    const updatedFolders = folders.filter((f) => f.id !== folderId);
    dispatch({ field: "folders", value: updatedFolders });
    saveFolders(updatedFolders);

    const updatedPrompts: Prompt[] = prompts.map((p) => {
      if (p.folderId === folderId) {
        return {
          ...p,
          folderId: null,
        };
      }

      return p;
    });

    dispatch({ field: "prompts", value: updatedPrompts });
    savePrompts(updatedPrompts);
  };

  const handleUpdateFolder = (folderId: string, name: string) => {
    const updatedFolders = folders.map((f) => {
      if (f.id === folderId) {
        return {
          ...f,
          name,
        };
      }

      return f;
    });

    dispatch({ field: "folders", value: updatedFolders });

    saveFolders(updatedFolders);
  };

  useEffect(() => {
    if (window.innerWidth < 640) {
      dispatch({ field: "showChatbar", value: false });
      dispatch({ field: "showPromptbar", value: false });
    }

    const showChatbar = localStorage.getItem("showChatbar");
    if (showChatbar) {
      dispatch({ field: "showChatbar", value: showChatbar === "true" });
    }

    const showPromptbar = localStorage.getItem("showPromptbar");
    if (showPromptbar) {
      dispatch({ field: "showPromptbar", value: showPromptbar === "true" });
    }

    const folders = localStorage.getItem("folders");
    if (folders) {
      dispatch({ field: "folders", value: JSON.parse(folders) });
    }

    const prompts = localStorage.getItem("prompts");
    if (prompts) {
      dispatch({ field: "prompts", value: JSON.parse(prompts) });
    }
  }, [dispatch]);

  return (
    <html lang="en">
      <body>
        <HomeContext.Provider
          value={{
            ...contextValue,
            handleCreateFolder,
            handleDeleteFolder,
            handleUpdateFolder,
          }}
        >
          <Toaster />
          {/* <SwipeableEdgeDrawer /> */}
          {/* <HorizontalDrawer /> */}
          <LeftSider />
          {/* <Promptbar /> */}
          {/* <RightDrawer /> */}
          {/* <Container>
          <iframe src="https://vscode.dev/" width="800" height="600"></iframe>
        </Container> */}
          <SessionProvider session={session}>{children}</SessionProvider>
        </HomeContext.Provider>
      </body>
    </html>
  );
}
