import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { object, string, number } from "yup";
import { addRoom } from "../../../../apis/roomManager";
import { getLocation, getLocationManager } from "../../../../apis/locationApi";
import Loading from "../../../../components/Loading";
import { ModalContent, ModalSuccess } from "../../../../components/ModalPopup/ModalPopup";
import { ButtonSign } from "../../../../components/Button/ButtonCustom";
import DoneIcon from '@mui/icons-material/Done';






//MUI switch
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function AddRooms({ onClose }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mayGiat, setmayGiat] = useState(false);
  const [banLa, setbanLa] = useState(false);
  const [tivi, settivi] = useState(false);
  const [dieuHoa, setdieuHoa] = useState(false);
  const [wifi, setwifi] = useState(false);
  const [bep, setbep] = useState(false);
  const [doXe, setdoXe] = useState(false);
  const [hoBoi, sethoBoi] = useState(false);
  const [banUi, setbanUi] = useState(false);
  const [selectedViTri, setSelectedViTri] = useState("");

  const addRoomShema = object({
    tenPhong: string().required("Vui lòng nhập tên phòng"),
    khach: number().typeError("Khách phải là một con số"),
    phongNgu: number().typeError("Phòng ngủ phải là một con số"),
    giuong: number().typeError("Giường phải là một con số"),
    phongTam: number().typeError("Phòng tắm phải là một con số"),
    giaTien: number().typeError("Giá tiền phải là một con số"),
    maViTri: string().required("Vui lòng chọn vị trí"),
    hinhAnh: string().required("Vui lòng điền link"),
    moTa: string().required("Vui lòng thêm mô tả "),
  });

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenPhong: "",
      khach: "",
      phongNgu: "",
      giuong: "",
      phongTam: "",
      moTa: "",
      giaTien: "",
      maViTri: "",
      hinhAnh: "",
    },
    resolver: yupResolver(addRoomShema),
    mode: "onTouched",
  });

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      const formValues = {
        id: 0,
        tenPhong: values.tenPhong,
        khach: values.khach,
        phongNgu: values.phongNgu,
        giuong: values.giuong,
        phongTam: values.phongTam,
        moTa: values.moTa,
        giaTien: values.giaTien,
        mayGiat: mayGiat,
        banLa: banLa,
        tivi: tivi,
        dieuHoa: dieuHoa,
        wifi: wifi,
        bep: bep,
        doXe: doXe,
        hoBoi: hoBoi,
        banUi: banUi,
        maViTri: values.maViTri,
        hinhAnh: values.hinhAnh,
      };
      return addRoom(formValues);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["roomList"]);
      setShowSuccessModal(true);
    },
  });

  const { data: location = [], isLoading } = useQuery({
    queryKey: ["location"],
    queryFn: getLocationManager,
  });

  const handleChangeViTri = (evt) => {
    setSelectedViTri(evt.target.value);
  };

  if (isLoading) return <Loading />;

  return (
    <Container>
      <Box mt={3} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          📔📔Thêm Phòng
        </Typography>
        <Typography
          onClick={onClose}
          sx={{ color: "blue", cursor: "pointer" }}
          variant="h5"
        >
          X
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormControl sx={{ minWidth: "100%" }} color="success">
              <InputLabel>Chọn Vị Trí</InputLabel>
              <Controller
                control={control}
                defaultValue=""
                name="maViTri"
                render={({ field }) => (
                  <Select
                    value={selectedViTri}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChangeViTri(e);
                    }}
                    label="Chọn Vị Trí"
                    {...field}
                  >
                    <MenuItem value=" ">
                      <em>------</em>
                    </MenuItem>
                    {location.map((loca) => (
                      <MenuItem key={loca.id} value={loca.id}>
                        {loca.tenViTri}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Tên phòng"
              variant="outlined"
              color="success"
              {...register("tenPhong")}
              error={!!errors.tenPhong}
              helperText={errors.tenPhong && errors.tenPhong.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Khách"
              color="success"
              {...register("khach")}
              variant="outlined"
              error={!!errors.khach}
              helperText={errors.khach && errors.khach.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Phòng Ngủ"
              variant="outlined"
              color="success"
              {...register("phongNgu")}
              error={!!errors.phongNgu}
              helperText={errors.phongNgu && errors.phongNgu.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Giường"
              color="success"
              variant="outlined"
              // InputLabelProps={{ shrink: true }}
              {...register("giuong")}
              error={!!errors.giuong}
              helperText={errors.giuong && errors.giuong.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Phòng Tắm"
              color="success"
              variant="outlined"
              // InputLabelProps={{ shrink: true }}
              {...register("phongTam")}
              error={!!errors.phongTam}
              helperText={errors.phongTam && errors.phongTam.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Giá Tiền"
              color="success"
              variant="outlined"
              {...register("giaTien")}
              error={!!errors.giaTien}
              helperText={errors.giaTien && errors.giaTien.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Hình Ảnh"
              variant="outlined"
              color="success"
              {...register("hinhAnh")}
              multiline
              error={!!errors.hinhAnh}
              helperText={errors.hinhAnh && errors.hinhAnh.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mô tả"
              variant="outlined"
              color="success"
              {...register("moTa")}
              multiline
              error={!!errors.moTa}
              helperText={errors.moTa && errors.moTa.message}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setmayGiat(!mayGiat)}
                  checked={mayGiat}
                />
              }
              label="mayGiat"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setbanLa(!banLa)}
                  checked={banLa}
                />
              }
              label="banLa"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => settivi(!tivi)}
                  checked={tivi}
                />
              }
              label="tivi"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setdieuHoa(!dieuHoa)}
                  checked={dieuHoa}
                />
              }
              label="dieuHoa"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setwifi(!wifi)}
                  checked={wifi}
                />
              }
              label="wifi"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setbep(!bep)}
                  checked={bep}
                />
              }
              label="bep"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setdoXe(!doXe)}
                  checked={doXe}
                />
              }
              label="doXe"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => sethoBoi(!hoBoi)}
                  checked={hoBoi}
                />
              }
              label="hoBoi"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={() => setbanUi(!banUi)}
                  checked={banUi}
                />
              }
              label="banUi"
            />
          </Grid>

          <Grid item xs={12}>
            <ButtonSign variant="contained" color="primary" type="submit">
              Thêm Phòng
            </ButtonSign>
          </Grid>
        </Grid>
      </form>
      {showSuccessModal && (
        <ModalSuccess>
          <ModalContent>
            <DoneIcon />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "40px" }}
            >
              Thêm Phòng Thành Công
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
    </Container>
  );
}
