import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material";

export const StyledBox = styled(Box)<BoxProps>`
  display: flex;
  width: 10%;
  height: 100vh;
  background-color: rgba(32, 33, 35, 0.55);
  z-index: 100;
  

  .list-margin {
    width: 100%;
    margin: 10% 0 0 25%;
    justify-content: center;
    align-items: center;
  }

  .button-marging {
    margin-top: 40px;
  }
`;

export default StyledBox;
