import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { signUpAPI } from "../../../apis/userApi";
import {
  useNavigate,
  useNavigationType,
  useSearchParams,
} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUserContext } from "../../../context/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ButtonSign } from "../../../components/Button/ButtonCustom";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

const styleSign = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
};

const signUpShema = object({
  name: string().required("Tên không được để trống"),
  email: string()
    .required("email không được để trống")
    .email("email không đúng định dạng"),
  password: string()
    .required("Mật khấu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
  phone: string().required("Vui lòng nhập số điện thoại"),
  birthday: string().required("Ngày sinh không được để trống"),
});

export default function SignUp({ handleCloseSignUp, handleOpenSignIn }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "string",
    },
    resolver: yupResolver(signUpShema),
    mode: "onTouched",
  });

  const {
    mutate: handleSignUp,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signUpAPI(payload),
    onSuccess: () => {
      handleCloseSignUp();
      handleOpenSignIn();
    },
  });

  const successSignUp = () => handleCloseSignUp();

  const onSubmitSignUp = (values) => {
    console.log("first")
    handleSignUp(values);

    //Gọi API đăng kí
  };

  const onErrorSignUp = (error) => {
    console.log(error);
    //Gọi API đăng kí
  };
  return (
    <Box p={4} component={Paper} sx={{ ...styleSign }}>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitSignUp, onErrorSignUp)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>Đăng ký</h2>
            <p>Nhanh chóng và dễ dàng.</p>
            <Divider />
          </Grid>
          <Grid item xs={12}>
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

          <Grid item xs={12}>
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

          <Grid item xs={12}>
            <TextField
              label="Mật khẩu"
              color="success"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
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

          <Grid item xs={12}>
            <TextField
              type="date"
              color="success"
              variant="outlined"
              fullWidth
              {...register("birthday")}
              error={!!errors.birthday}
              helperText={errors.birthday && errors.birthday.message}
            />
          </Grid>
        </Grid>

        {error && <Typography color="red">{error}</Typography>}

        <ButtonSign
          fullWidth
          variant="contained"
          type="submit"
          disabled={isLoading}
        >
          Đăng ký
        </ButtonSign>
      </Box>
      <Typography sx={{ textAlign: "center" }}>
        Đã có tài khoản?
        <span
          onClick={() => {
            handleCloseSignUp();
            handleOpenSignIn();
          }}
          style={{ color: "#f43f5e", marginLeft: "5px ", cursor: "pointer" }}
        >
          Đăng nhập
        </span>
      </Typography>
    </Box>
  );
}
