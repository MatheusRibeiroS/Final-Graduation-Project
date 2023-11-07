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
import { useEffect, useState, MouseEvent, useContext } from "react";
import { GoogleData } from "@/types/google";
import HorizontalDrawer from "@/components/Drawer";
import { DrawerOptions } from "@/types/drawerOptions";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Stack from "@mui/material/Stack";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import { getColorModeContext, setColorModeContext } from "@/app/toggleColorModeContext";

export default function LeftSider() {
  const [credentials, setCredentials] =
    useState<AxiosResponse<GoogleData> | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<DrawerOptions>(null);
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  );
  const [theme, setTheme] = useState("dark");

 const toggleColorMode = useContext(getColorModeContext());
 console.log("toggleColorMode", toggleColorMode)

  const handleTheme = (event: MouseEvent<HTMLElement>, newtheme: string) => {
    setColorModeContext
    setTheme(newtheme);
  };

  useEffect(() => {
    if (!credentials) {
      getCredentials().then((response) => {
        setCredentials(response || null);
        setUserProfilePicture(response?.data?.token?.picture || null);
      });
    }
  }, [credentials]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

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
      <List
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          li: { width: "fit-content" },
          svg: { color: theme.palette.common.white },
        })}
      >
        <Box sx={{ flexGrow: "1" }}>
          <ListItem>
            <ListItemButton onClick={() => setOptions("home")}>
              <HomeIcon fontSize="large" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => setOptions("perfil")}>
              <Avatar src={`${credentials?.data?.token?.picture}` || ""} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => setOptions("notes")}>
              <EditNoteIcon fontSize="large" />
            </ListItemButton>
          </ListItem>
          {/* <ListItem>
            <ListItemButton onClick={() => setOptions("calendar")}>
              <CalendarMonthIcon fontSize="large" />
            </ListItemButton>
          </ListItem> */}
          <ListItem>
            <ListItemButton
              onClick={() => {
                setOptions("chat");
                handleDrawerOpen();
              }}
            >
              <ChatIcon fontSize="large" />
            </ListItemButton>
          </ListItem>
          <HorizontalDrawer
            userProfilePicture={userProfilePicture || ""}
            open={open}
            option={options}
          />
        </Box>
        <Box>
          <Stack direction="row" spacing={4}>
            <ToggleButtonGroup
              value={theme}
              exclusive
              onChange={handleTheme}
              aria-label="theme"
            >
              <ToggleButton value="light" aria-label="tv">
                <LightModeOutlinedIcon />
              </ToggleButton>
              <ToggleButton value="dark" aria-label="phone">
                <DarkModeOutlinedIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>
      </List>
    </StyledBox>
  );
}
