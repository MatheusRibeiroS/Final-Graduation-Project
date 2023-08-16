"use client";
import "./globals.css";
import { ReactNode } from "react";
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

export const metadata = {
  title: "TCC - Bachelor's Thesis",
  description: "MatheusRibeiroS Bachelor's Thesis (TCC project)",
  image: "/favicon.ico",
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
          {/* <SwipeableEdgeDrawer /> */}
          {/* <HorizontalDrawer />
          <LeftSider /> */}
          {/* <Promptbar /> */}
          {/* <RightDrawer /> */}
          {/* <Container>
          <iframe src="https://vscode.dev/" width="800" height="600"></iframe>
        </Container> */}
          <SessionProvider>{children}</SessionProvider>
        </HomeContext.Provider>
      </body>
    </html>
  );
}
