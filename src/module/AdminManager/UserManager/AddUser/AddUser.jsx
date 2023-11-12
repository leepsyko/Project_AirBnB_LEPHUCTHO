import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    useNavigate,
    useNavigationType,
    useSearchParams,
} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { ButtonSign } from "../../../../components/Button/ButtonCustom";
import { addUserAPI } from "../../../../apis/userApi";


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




export default function AddUser({ handleCloseAddUser }) {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [valueGender, setValueGender] = useState(true);
    const [valueAdmin, setValueAdmin] = useState(true);

    const handleChangeGender = () => {
        setValueGender(!valueGender);
        // console.log(first)
    };


    const handleChangeAdmin = () => {
        setValueAdmin(!valueAdmin);
        // console.log(first)
    };

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
            gender: valueGender,
            role: valueAdmin,
        },
        resolver: yupResolver(signUpShema),
        mode: "onTouched",
    });

    const {
        mutate: handleAddUser,
        error,
        isLoading,
    } = useMutation({
        mutationFn: (payload) => {
            const formData = { ...payload, gender: valueGender.toString(), role: valueAdmin ? "ADMIN" : "USER" }



            console.log(formData)
            return addUserAPI(formData)
        },
        onSuccess: () => {

            handleCloseAddUser()
        },
    });



    const onSubmitSignUp = (values) => {
        handleAddUser(values);

        //Gọi API đăng kí
    };

    const onErrorSignUp = (error) => {
        console.log(error);

        //Gọi API đăng kí
    };
    return (
        <Box sx={{ ...styleSign, width: 400 }}>
            <div>
                <h2>Đăng ký</h2>
                <p>Nhanh chóng và dễ dàng.</p>
            </div>
            <hr />
            <div>
                <form onSubmit={handleSubmit(onSubmitSignUp, onErrorSignUp)}>

                    <Grid container spacing={2}>
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
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={valueGender}
                                    onChange={handleChangeGender}
                                >
                                    <FormControlLabel value={false} control={<Radio />} label="Female" />
                                    <FormControlLabel value={true} control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>

                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Quyền</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={valueAdmin}
                                    onChange={handleChangeAdmin}
                                >
                                    <FormControlLabel value={false} control={<Radio />} label="User" />
                                    <FormControlLabel value={true} control={<Radio />} label="Admin" />
                                </RadioGroup>
                            </FormControl>

                        </Grid>
                    </Grid>

                    {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}

                    <ButtonSign
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                    >
                        Thêm
                    </ButtonSign>
                </form>
            </div>
        </Box>
    );
}
