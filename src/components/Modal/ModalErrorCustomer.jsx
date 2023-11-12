import React from "react";
import { Button, Modal, Typography } from "@mui/material";
import { ModalContent } from "../ModalPopup/ModalPopup";
import ErrorIcon from '@mui/icons-material/Error';



export default function ModalErrorCustomer({ openErro, setOpenErro }) {
  return (
    <Modal
      open={openErro}
      onClose={() => {
        setOpenErro(false);
      }}
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: " rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 1000000,
      }}
    >
      <ModalContent>
        <ErrorIcon/>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#f43f5e",
          }}
        >
          Không sửa được giá trị mặc định
        </Typography>
        <Button
          onClick={() => {
            setOpenErro(false);
          }}
        >
          Đóng
        </Button>
      </ModalContent>
    </Modal>
  );
}
