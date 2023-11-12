import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { object, string } from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { editUser, getInfoID } from "../../../../apis/userApi";
import Loading from "../../../../components/Loading";
import { ButtonSign } from "../../../../components/Button/ButtonCustom";
import ModalErrorCustomer from "../../../../components/Modal/ModalErrorCustomer";
import { ModalContent, ModalSuccess } from "../../../../components/ModalPopup/ModalPopup";


const styleSign = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


const updateShema = object({
  name: string().required("Tên không được để trống"),
  email: string()
    .required("email không được để trống")
    .email("email không đúng định dạng"),
  phone: string().required("Vui lòng nhập số điện thoại"),
  birthday: string().required("Ngày sinh không được để trống"),
  id: string(),
  role: string().required("Vui lòng loại người dùng"),
});

export default function EditUser({ userId, onClose }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [openErro, setOpenErro] = useState(false);
  const queryClient = useQueryClient();

  const { data: user = [], isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getInfoID(userId),
    enabled: !!userId,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      id: "",
      email: "",
      name: "",
      phone: "",
      birthday: "",
      role: "",
    },
    resolver: yupResolver(updateShema),
    mode: "onTouched",
  });

  const { mutate: handleUpdateUser } = useMutation({
    mutationFn: (payload) => editUser(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", userId]);
      setShowSuccessModal(true);
    },
    onError: (err) => {
      setOpenErro(true);
    },
  });

  const onSubmit = (values) => {
    const formValues = {
      email: values.email,
      name: values.name,
      phone: values.phone,
      birthday: values.birthday,
      id: userId,
      gender: true,
      role: values.role,
    };
    //call API sign up
    handleUpdateUser(formValues);
  };

  useEffect(() => {
    if (!!user) {
      setValue("id", user.id);
      setValue("birthday", user.birthday);
      setValue("email", user.email);
      setValue("name", user.name);
      setValue("phone", user.phone);
      setValue("role", user.role);
    }
  }, [user, setValue]);

  const handleCloseSuccess = () => {
    onClose();
    setShowSuccessModal(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Box sx={{ ...styleSign, width: 800 }}>
      <Typography variant="h5" gutterBottom>
        ✍️✍️ Cập nhật người dùng
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
              label="Họ Tên"
              color="success"
              variant="outlined"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name && errors.name.message}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Email"
              color="success"
              variant="outlined"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Số Điện Thoại"
              color="success"
              variant="outlined"
              fullWidth
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone && errors.phone.message}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="datel"
              color="success"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("birthday", {
                setValueAs: (values) => {
                  return dayjs(values).format("DD-MM-YYYY");
                },
              })}
              error={!!errors.birthday}
              helperText={errors.birthday && errors.birthday.message}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth error={!!errors.role}>
              <InputLabel id="role">Mã người dùng</InputLabel>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="role"
                    id="role"
                    label="Loại người dùng"
                    {...field}
                  >
                    <MenuItem value={""}>Chọn loại người dùng</MenuItem>
                    <MenuItem value={"USER"}>Khách hàng</MenuItem>
                    <MenuItem value={"ADMIN"}>Quản trị viên</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <ButtonSign
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
        >
          Cập Nhật
        </ButtonSign>
        <ButtonSign onClick={onClose}>Đóng</ButtonSign>
      </form>

      {showSuccessModal && (
        <ModalSuccess>
          <ModalContent>
            <img
              style={{ width: "120px", marginTop: "10px" }}
              src="/img/animation_lnfs5c14_small.gif"
              alt="confirm"
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "40px" }}
            >
              Cập Nhật Khoản Thành Công
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
