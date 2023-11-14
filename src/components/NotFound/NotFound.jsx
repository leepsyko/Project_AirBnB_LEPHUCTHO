import React, { Fragment } from "react";
import Gif from "../../assets/img/Screenshot 2023-11-14 174911.png";
import { Box, Button, styled } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { ButtonSign } from "../Button/ButtonCustom";
import { useNavigate } from "react-router";

const NotFoundBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NotFoundImg = styled("img")`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <NotFoundBox component="div">
        <NotFoundImg src={Gif} alt="notfound-gif" />
        <ButtonSign
          onClick={() => navigate("/")}
          startIcon={<HomeIcon />}
          variant="contained"
        >
          Về Trang Chủ
        </ButtonSign>
      </NotFoundBox>
    </Fragment>
  );
}
