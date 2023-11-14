import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upLoadImgRoom } from "../../../../apis/roomManager";
import { ButtonSign } from "../../../../components/Button/ButtonCustom";
import { ModalContent, ModalSuccess } from "../../../../components/ModalPopup/ModalPopup";
import ModalErrorCustomer from "../../../../components/Modal/ModalErrorCustomer";
import DoneIcon from '@mui/icons-material/Done';







const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AvaImg = styled('img')({
  width: '180px !important',
  height: '180px',
  objectFit: 'cover',
  marginBottom: '30px',
});

const BtnAva = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '40px',
  paddingTop: '20px',
  position: 'relative',
  borderTop: '1px solid #CED0D4',
})


export default function ModalAvatar({ roomId, onClose, roomImg }) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [imgPreview, setImgPreview] = useState(roomImg);
  const [fileChanged, setFileChanged] = useState(false);
  const [openErro, setOpenErro] = useState(false);

  const handleFileChange = () => {
    setFileChanged(true);
  };
  const { mutate } = useMutation({
    mutationFn: (value) => {
      const formData = new FormData();
      const hinhAnh = fileInputRef.current.files[0];
      formData.append("formFile", hinhAnh);
      return upLoadImgRoom(roomId, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roomList"] });
      setShowSuccessModal(true);
    },
    onError: (err) => {
      setOpenErro(true);
    },
  });
  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const hinhAnh = fileInputRef.current;
  useEffect(() => {
    if (!hinhAnh || !hinhAnh.files[0]) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(hinhAnh.files[0]);

    fileReader.onload = (e) => {
      setImgPreview(e.target.result);
      setFileChanged(false);
    };
  }, [fileChanged]);

  return (
    <ModalSuccess onClose={onClose}>
      <ModalContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AvaImg

            src={imgPreview || "/img/avatar.jpeg"}
            alt=""
          />
          <Button
            component="label"
            variant="contained"
            color="success"
            startIcon={<CloudUploadIcon />}
          >
            Tải ảnh
            <VisuallyHiddenInput
              ref={fileInputRef}
              onChange={handleFileChange}
              type="file"
            />
          </Button>
        </Box>
        <BtnAva >
          <Button
            onClick={() => onClose(false)}
            sx={{
              marginRight: "10px",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            Huỷ
          </Button>
          <Button
            onClick={mutate}
            sx={{ textTransform: "capitalize", fontWeight: "500" }}
            variant="contained"
          >
            Lưu
          </Button>
        </BtnAva>
        {showSuccessModal && (
          <ModalSuccess>
            <ModalContent>
              <DoneIcon
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: "40px" }}
              >
                Cập Nhật Thành Công
              </Typography>

              <ButtonSign
                variant="contained"
                color="primary"
                onClick={handleCloseSuccess}
              >
                Đồng ý
              </ButtonSign>
            </ModalContent>
          </ModalSuccess>
        )}

        {/* Modal báo lỗi */}

        <ModalErrorCustomer openErro={openErro} setOpenErro={setOpenErro} />
      </ModalContent>
    </ModalSuccess>
  );
}
