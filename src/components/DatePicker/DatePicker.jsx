import React from "react";
import { TextField, styled } from "@mui/material";
import { colorConfigs } from "../../configs/colorConfigs";

const DatePicker = styled(TextField)`
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  & .MuiInputBase-root.MuiInput-root::after {
    border-bottom: 2px solid ${colorConfigs.color.primary.main};
  }
`;

export default DatePicker;
