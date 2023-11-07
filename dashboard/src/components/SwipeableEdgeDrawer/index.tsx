import * as React from "react";
import { Global } from "@emotion/react";
import styled from "@mui/material/styles/styled";
import CssBaseline from "@mui/material/CssBaseline";
import grey from "@mui/material/colors/grey";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatIcon from "@mui/icons-material/Chat";
import Grid from "@mui/material/Grid";
import leftSider from "../LeftSider";

const drawerBleeding = 56;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

// const Root = styled("div")(({ theme }) => ({
//   height: "100%",
//   backgroundColor:
//     theme.palette.mode === "light"
//       ? grey[100]
//       : theme.palette.background.default,
// }));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 100,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function SwipeableEdgeDrawer(props: Props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Grid direction="row" className="flex bg-[#202123]">
        <Button onClick={toggleDrawer(true)} className="mt-1">
          <HomeIcon fontSize="large" />
        </Button>
        <Button onClick={toggleDrawer(true)} className="mt-1">
          <Avatar alt="Remy Sharp" src="https://source.unsplash.com/50x50" />
        </Button>
        <Button onClick={toggleDrawer(true)} className="mt-1">
          <EditNoteIcon fontSize="large" />
        </Button>
        <Button onClick={toggleDrawer(true)} className="mt-1">
          <CalendarMonthIcon fontSize="large" />
        </Button>
        <Button onClick={toggleDrawer(true)} className="mt-1">
          <ChatIcon fontSize="large" />
        </Button>
      </Grid>
      <SwipeableDrawer
        container={container}
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
          }}
        >
          {/* <Puller /> */}
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            51 results
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
            backgroundColor: "#202123",
          }}
        >
          <List className="h-full justify-center">
            <Button onClick={toggleDrawer(true)} className="mt-1">
              <HomeIcon fontSize="large" />
            </Button>
            <Button onClick={toggleDrawer(true)} className="mt-1">
              <Avatar
                alt="Remy Sharp"
                src="https://source.unsplash.com/50x50"
              />
            </Button>
            <Button onClick={toggleDrawer(true)} className="mt-1">
              <EditNoteIcon fontSize="large" />
            </Button>
            <Button onClick={toggleDrawer(true)} className="mt-1">
              <CalendarMonthIcon fontSize="large" />
            </Button>
            <Button onClick={toggleDrawer(true)} className="mt-1">
              <ChatIcon fontSize="large" />
            </Button>
          </List>
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}
