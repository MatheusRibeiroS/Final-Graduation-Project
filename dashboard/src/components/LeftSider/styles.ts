import BoxProps from "@mui/material/Box";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

export const StyledBox = styled(Box)<typeof BoxProps>`
  display: flex;
  width: 10%;
  height: 100vh;
  background-color: rgba(32, 33, 35, 0.55);
  flex-grow: 0;
  position: fixed;
  left: 0;
  top: 0;

  .list-margin {
    margin: 10% 0 0 25%;
    justify-content: center;
    align-items: center;
  }
`;

export default StyledBox;
