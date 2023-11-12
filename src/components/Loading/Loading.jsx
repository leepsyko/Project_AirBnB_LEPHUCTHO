import React from "react";
import { Container, Typography } from "@mui/material";
import { DivCustom } from "./index";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Loading = () => {
  return (
    <Container sx={{ height: "70vh" }}>
      <DivCustom>
        <CheckCircleIcon />
        <Typography variant="h4">Vui Lòng Đợi...</Typography>
      </DivCustom>
    </Container>
  );
};

export default Loading;
