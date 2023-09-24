import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import { DrawerOptions } from "@/types/drawerOptions";
import { Chat } from "@/components/chat";
import { GoogleToken } from "@/types/google";

export default function HorizontalDrawer({
  open,
  option,
  userProfilePicture,
}: {
  open: boolean;
  option: DrawerOptions;
  userProfilePicture: string;
}) {
  const [openDrawer, setOpenDrawer] = useState(open);
  console.log("open", open);
  
  const validateOption = (option: DrawerOptions) => {
    switch (option) {
      case "home":
        return <HomeIcon fontSize="large" />;
      case "chat":
        return <Chat userProfilePicture={userProfilePicture} />;
      default:
        return <HomeIcon fontSize="large" />;
    }
  };

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      console.log("openDrawer", openDrawer);
      setOpenDrawer(!openDrawer);
    };

  const list = () => (
    <Box
      sx={{
        height: "100%",
        width: 600,
        backgroundColor: "#202123",
      }}
      role="presentation"
      children={validateOption(option)}
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    />
  );

  return (
    <Box>
      {/* {(["left"] as const).map((anchor) => ( */}
      <Drawer
        sx={{
          marginLeft: "10%",
          zIndex: 0,
          "& .MuiDrawer-root": {
            position: "absolute",
          },
          "& .MuiPaper-root": {
            position: "absolute",
          },
        }}
        elevation={0}
        transitionDuration={50}
        anchor={"left"}
        open={open}
        onClose={() => setOpenDrawer(false)}
      >
        {list()}
      </Drawer>
      {/* ))} */}
    </Box>
  );
}
