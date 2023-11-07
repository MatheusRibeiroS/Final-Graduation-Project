import Typography from "@mui/material/Typography";
import { TFiles } from "./files";
import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

type EntryProps = {
  entry: TFiles;
  depth: number;
};

export default function Entry({ entry, depth }: EntryProps): ReturnType<FC> {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Box className="flex">
      <Stack direction="row" className="items-center pl-4 overflow-visible">
        <Box style={{ paddingLeft: entry.children ? "" : "10px" }}>
          <Typography className="w-24 text-ellipsis" color="white">{entry.name}</Typography>
        </Box>
        <Button variant="text" onClick={() => setIsExpanded((prev) => !prev)}>
          {entry.children && (
            <Box className="px-1 w-1 text-white">{isExpanded ? "-" : "+"}</Box>
          )}
        </Button>
      </Stack>
      <Box className="bl-[1px solid white] m-[5px 5px]">
        {isExpanded && (
          <Box className="pl-2">
            {entry.children?.map((entry) => (
              <Entry entry={entry} depth={depth + 1} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
