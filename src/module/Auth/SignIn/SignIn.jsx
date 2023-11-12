import React, { Fragment, useState } from "react";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { object, string } from "yup";
import { useUserContext } from "../../../context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signInAPI } from "../../../apis/userApi";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ButtonSign } from "../../../components/Button/ButtonCustom";

const styleSign = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
};

export default function SignIn({ handleCloseSignIn, handleOpenSignUp }) {
  const { currentUser, handleSignInContext } = useUserContext();
  const [showPassword, setShowPassword] = useState(false);

  const [searchParams] = useSearchParams();

  const signInSchema = object({
    email: string().required("Tài khoản không được để trống"),
    password: string()
      .required("Mật khẩu không được để trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Mật khẩu ít nhất 8 kí tự , 1 kí tự hoa và 1 số"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
    mode: "onTouched",
  });

  const {
    mutate: handleSignIn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payload) => signInAPI(payload),
    onSuccess: (data) => {
      handleSignInContext(data);
      handleCloseSignIn();
    },
  });

  const onSubmitSignIn = (values) => {
    handleSignIn(values);
  };

  if (currentUser) {
    const user = searchParams.get("user");
    const booking = searchParams.get("booking");
    const comment = searchParams.get("comment");
    return <Navigate to={user || booking || comment || "/"} replace />;
  }

  return (
    <Fragment>
      <Box p={4} component={Paper} sx={{ ...styleSign }}>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitSignIn)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>Đăng nhập</h2>
              <Divider />
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
                label="password"
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
              {error && <Typography color="red">{error}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="success" />}
                label="Lưu Tài Khoản"
              />
            </Grid>
          </Grid>
          <ButtonSign fullWidth type="submit" variant="contained">
            Đăng Nhập
          </ButtonSign>

          <Typography sx={{ textAlign: "center" }}>
            Chưa có tài khoản?
            <span
              onClick={() => {
                handleCloseSignIn();
                handleOpenSignUp();
              }}
              style={{
                color: "#f43f5e",
                marginLeft: "5px ",
                cursor: "pointer",
              }}
            >
              Đăng kí ngay
            </span>
          </Typography>
        </Box>
      </Box>
    </Fragment>
  );
}
