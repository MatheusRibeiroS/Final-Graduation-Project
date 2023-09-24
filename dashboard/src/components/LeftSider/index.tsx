"use client";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import StyledBox from "./styles";
import { AxiosResponse } from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatIcon from "@mui/icons-material/Chat";
import { getCredentials } from "@/service/getCredentials";
import { useEffect, useState } from "react";
import { GoogleData } from "@/types/google";
import HorizontalDrawer from "@/components/Drawer";
import { DrawerOptions } from "@/types/drawerOptions";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function LeftSider() {
  const [credentials, setCredentials] =
    useState<AxiosResponse<GoogleData> | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<DrawerOptions>(null);
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!credentials) {
      getCredentials().then((response) => {
        setCredentials(response || null);
        setUserProfilePicture(response?.data?.token?.picture || null);
      });
    }
  }, [credentials]);

  useEffect(() => {
    if (typeof userProfilePicture === "string") {
      localStorage.setItem("userProfilePicture", userProfilePicture);
    }
  }, [userProfilePicture]);


  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <StyledBox>
      <List className="list-margin">
        <Button onClick={() => setOptions("home")} className="button-marging">
          <HomeIcon fontSize="large" />
        </Button>
        <Button onClick={() => setOptions("perfil")} className="button-marging">
          <Avatar src={`${credentials?.data?.token?.picture}` || ""} />
        </Button>
        <Button onClick={() => setOptions("notes")} className="button-marging">
          <EditNoteIcon fontSize="large" />
        </Button>
        <Button
          onClick={() => setOptions("calendar")}
          className="button-marging"
        >
          <CalendarMonthIcon fontSize="large" />
        </Button>
        <Button
          onClick={() => {
            setOptions("chat");
            handleDrawerOpen();
          }}
          className="button-marging"
        >
          <ChatIcon fontSize="large" />
        </Button>
        <HorizontalDrawer
          userProfilePicture={userProfilePicture || ""}
          open={open}
          option={options}
        />
      </List>
    </StyledBox>
  );
}
