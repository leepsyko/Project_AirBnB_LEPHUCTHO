import { colorConfigs } from "../../configs/colorConfigs";
import { Button, styled } from "@mui/material";

export const ButtonSign = styled(Button)`
color:black; 
  &.MuiButton-root {
    background-color: ${colorConfigs.color.primary.main};
    font-weight: bold;
    margin: 5px 0;
  }
`;
