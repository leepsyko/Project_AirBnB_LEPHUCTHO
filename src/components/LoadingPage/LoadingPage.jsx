import React, { Fragment } from "react";
import Img from "../../assets/img/airbnb-animation.gif";
import { Box, styled } from "@mui/material";
import { colorConfigs } from "../../configs/colorConfigs";

const GifBox = styled(Box)`
  position: relative;
  background-color: ${colorConfigs.color.primary.main};
  width: 100%;
  height: 100vh;
  text-align: center;
  z-index: 9999;
  transition: 0.3s ease-in-out;
`;

const StyledGif = styled("img")`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export default function LoadingPage() {
  return (
    <Fragment>
      <GifBox component="div">
        <StyledGif src={Img} alt="animation gif" />
      </GifBox>
    </Fragment>
  );
}
