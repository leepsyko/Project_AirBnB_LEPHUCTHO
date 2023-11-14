import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLocationById, updateLocation } from "../../../../apis/locationApi";
import Loading from "../../../../components/Loading";
import { ButtonSign } from "../../../../components/Button/ButtonCustom";
import { ModalContent, ModalSuccess } from "../../../../components/ModalPopup/ModalPopup";
import ModalErrorCustomer from "../../../../components/Modal/ModalErrorCustomer";
import DoneIcon from '@mui/icons-material/Done';

const updateShema = object({
  hinhAnh: string().required("Hình ảnh không được để trống"),
  tenViTri: string().required("Vị trí không được để trống"),
  tinhThanh: string().required("Tỉnh thành không được để trống"),
  quocGia: string().required("Quốc gia không được để trống"),
  id: string(),
});

export default function UpdateLocation({ locationId, onClose }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [openErro, setOpenErro] = useState(false);
  const queryClient = useQueryClient();

  const { data: location = [], isLoading } = useQuery({
    queryKey: ["locationById", locationId],
    queryFn: () => getLocationById(locationId),
    enabled: !!locationId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      id: "",
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
    resolver: yupResolver(updateShema),
    mode: "onTouched",
  });

  const { mutate: handleUpdateLocation, error } = useMutation({
    mutationFn: (payload) => updateLocation(locationId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["location", locationId]);
      setShowSuccessModal(true);
    },
    onError: (err) => {
      setOpenErro(true);
    },
  });

  const onSubmit = (values) => {
    const formValues = {
      tenViTri: values.tenViTri,
      tinhThanh: values.tinhThanh,
      quocGia: values.quocGia,
      id: locationId,
      hinhAnh: values.hinhAnh,
    };
    //call API sign up
    handleUpdateLocation(formValues);
  };

  useEffect(() => {
    if (!!location) {
      setValue("id", location.id);
      setValue("tenViTri", location.tenViTri);
      setValue("tinhThanh", location.tinhThanh);
      setValue("quocGia", location.quocGia);
      setValue("hinhAnh", location.hinhAnh);
    }
  }, [location, setValue]);

  const handleCloseSuccess = () => {
    onClose();
    setShowSuccessModal(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        ✍️✍️ Cập nhật vị trí
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", marginTop: "20px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="ID"
              color="success"
              variant="outlined"
              fullWidth
              {...register("id")}
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Tên vị trí"
              color="success"
              variant="outlined"
              fullWidth
              {...register("tenViTri")}
              error={!!errors.tenViTri}
              helperText={errors.tenViTri && errors.tenViTri.message}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Tỉnh thành"
              color="success"
              variant="outlined"
              fullWidth
              {...register("tinhThanh")}
              error={!!errors.tinhThanh}
              helperText={errors.tinhThanh && errors.tinhThanh.message}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Quốc gia"
              color="success"
              variant="outlined"
              fullWidth
              {...register("quocGia")}
              error={!!errors.quocGia}
              helperText={errors.quocGia && errors.quocGia.message}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Hình ảnh"
              color="success"
              variant="outlined"
              fullWidth
              {...register("hinhAnh")}
              error={!!errors.hinhAnh}
              helperText={errors.hinhAnh && errors.hinhAnh.message}
            />
          </Grid>
          {error && (
            <Typography
              sx={{ textAlign: "center", width: "100%", marginTop: "10px" }}
              color="red"
            >
              {error}
            </Typography>
          )}
        </Grid>
        <ButtonSign
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
        >
          Cập Nhật
        </ButtonSign>
        <ButtonSign variant="contained" onClick={onClose}>Đóng</ButtonSign>
      </form>

      {showSuccessModal && (
        <ModalSuccess>
          <ModalContent>
            <DoneIcon/>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "40px" }}
            >
              Cập Nhật Vị Trí Thành Công
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
    </Box>
  );
}
