import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { files } from "./components/entry/files";
import Entry from "./components/entry";
import {
  useEffect,
  useState,
  Fragment,
  MouseEvent,
  KeyboardEvent,
} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

type Anchor = "top" | "left" | "bottom" | "right";

const handleCreateFolder = () => {
  files.children?.push({
    name: "Nova Pasta" + Date.now(),
    children: [],
  });
};

export default function RightDrawer() {
  const [state, setState] = useState({
    right: false,
  });

  document.documentElement.classList.add("dark");

  useEffect(() => {
    console.log("files", files);
  }, [files]);
  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        height: "100%",
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        backgroundColor: "#202123",
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid direction="column">
        <Grid display="flex">
          {/* <button
            className="text-sidebar flex w-[150px] flex-shrink-0 ml-3 mt-5 cursor-pointer select-none items-center gap-2 rounded-md border border-white/20 p-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
          >
            {""}
          </button> */}
          <Box className="m-4 mt-26">
            <TextField
              className="flex w-32 h-3 border-white cursor-pointer items-center text-white duration-200 hover:bg-gray-500/10"
              color="primary"
              id="input-file-name"
              label="Nome do arquivo"
              variant="standard"
            />
          </Box>
          <Box className="ml-2 mt-6">
            <Button
              variant="contained"
              className="bg-transparent dark:bg-dark rounded-md border border-white gap-2"
              onClick={handleCreateFolder}
            >
              <CreateNewFolderIcon />
            </Button>
          </Box>
        </Grid>
        <Grid>
          <Box className="p-4">
            {files.children?.map((entry) => (
              <Entry entry={entry} depth={1} />
            ))}
          </Box>
        </Grid>
      </Grid>
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider /> */}
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <Box>
      {(["right"] as const).map((anchor) => (
        <Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
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
            anchor={anchor}
            open={state[anchor]}
            // onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </Box>
  );
}
