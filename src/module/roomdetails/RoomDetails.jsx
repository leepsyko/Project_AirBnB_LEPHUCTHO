import { useMutation, useQuery } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BookingRoom,
  getRoomById,
  getRoomDetailsById,
} from "../../apis/roomAPI";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import DatePicker from "../../components/DatePicker/DatePicker";
import { differenceInDays, parseISO } from "date-fns";
import { colorConfigs } from "../../configs/colorConfigs";
import currencyFormat from "../../currencyFomat";
import ShareIcon from "@mui/icons-material/Share";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PoolIcon from "@mui/icons-material/Pool";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import WorkIcon from "@mui/icons-material/Work";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import TvIcon from "@mui/icons-material/Tv";
import WifiIcon from "@mui/icons-material/Wifi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import CountertopsIcon from "@mui/icons-material/Countertops";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RoomComments from "./RoomComments/RoomComments";
import { useUserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const SecondaryButton = styled(Button)`
  text-transform: none;
  text-decoration: underline;
`;

const BookingButton = styled(Button)`
  &.MuiButton-root {
    background-color: ${colorConfigs.color.primary.main};
  }
`;

export default function RoomDetails() {
  const { currentUser } = useUserContext();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guestQuantity, setGuestQuantity] = useState(1);
  const { roomId } = useParams();

  const { data: room = [], isLoading } = useQuery({
    queryKey: ["roomdetails", roomId],
    queryFn: () => getRoomDetailsById(roomId),
    enabled: !!roomId,
  });
  const { data: roomBooking = [] } = useQuery({
    queryKey: ["roombooking"],
    queryFn: getRoomById,
  });

  const { mutate: handleBookingRoom } = useMutation({
    mutationFn: (roomId) => {
      const roomObj = {
        maPhong: roomId,
        ngayDen: startDate,
        ngayDi: endDate,
        soLuongKhach: guestQuantity,
        maNguoiDung: currentUser?.user?.id,
      };
      if (!currentUser) {
        toast.warn("Vui lòng đăng nhập", {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      if (roomObj.ngayDen === "" || roomObj.ngayDi === "") {
        toast.warn("Vui lòng chọn ngày đến và ngày đi.", {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      toast.success("Đặt phòng thành công.", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return BookingRoom(roomObj);
    },
  });

  // CALCULATE TOTALDAY FUNC
  const calculateTotalDay = (startDate, endDate) => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const totalDays = differenceInDays(end, start);
    return totalDays;
  };
  const totalDays = calculateTotalDay(startDate, endDate) || 0;
  const today = new Date().toISOString().split("T")[0];

  // TOTAL PRICE
  const totalPrice = room.giaTien * totalDays || 0;

  const handleStartDate = (e) => {
    const selectedStartDate = new Date(e.target.value);
    const selectedEndDate = new Date(endDate);
    if (selectedStartDate >= selectedEndDate) {
      setEndDate("");
    }
    setStartDate(e.target.value);
  };
  const handleEndDate = (e) => {
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(e.target.value);
    if (selectedEndDate <= selectedStartDate) {
      setStartDate("");
    }
    setEndDate(e.target.value);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Fragment>
      <Container>
        <Grid my="50px" container>
          {/* TITLE */}
          <Grid py={2} item xs={12}>
            <Typography variant="h5" fontWeight="bold">
              {room.tenPhong}
            </Typography>
            <Stack direction="row" spacing={2}>
              <SecondaryButton startIcon={<ShareIcon />} color="inherit">
                Chia sẻ
              </SecondaryButton>
              <SecondaryButton startIcon={<SaveAltIcon />} color="inherit">
                Lưu
              </SecondaryButton>
            </Stack>
          </Grid>
          {/* IMG */}
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundImage: `url(${room.hinhAnh})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "5px",
              }}
              component="div"
            >
              <img
                style={{ opacity: 0 }}
                width="100%"
                src={room.hinhAnh}
                alt={room.tenPhong}
              />
            </Box>
          </Grid>
          {/* INFO AND BOOKING PART */}
          <Grid py={2} item xs={12}>
            <Grid spacing={2} container>
              {/* INFO */}
              <Grid item xs={12} sm={12} md={7}>
                <Box elevation={3} component={Paper}>
                  <Box p={2} component="div">
                    <Typography>
                      {room.khach} khách - {room.giuong} giường -{" "}
                      {room.phongNgu} phòng ngủ - {room.phongTam} phòng tắm.{" "}
                    </Typography>
                  </Box>
                  <Divider variant="middle" />
                  <Box
                    p={2}
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                    component="div"
                  >
                    <WorkIcon fontSize="large" />
                    <Box component="div">
                      <Typography fontWeight="bold" variant="subtitle1">
                        Không gian riêng để làm việc
                      </Typography>
                      <Typography color="GrayText" variant="subtitle2">
                        Một căn phòng có Wi-fi, rất phù hợp để làm việc.
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    p={2}
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                    component="div"
                  >
                    <MeetingRoomIcon fontSize="large" />
                    <Box component="div">
                      <Typography fontWeight="bold" variant="subtitle1">
                        Tự nhận phòng
                      </Typography>
                      <Typography color="GrayText" variant="subtitle2">
                        Bạn có thể gặp nhân viên trực cửa để nhận phòng.
                      </Typography>
                    </Box>
                  </Box>
                  {/* SWIMMING POOL */}
                  {room.hoBoi ? (
                    <Box
                      p={2}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                      component="div"
                    >
                      <PoolIcon fontSize="large" />
                      <Box component="div">
                        <Typography fontWeight="bold" variant="subtitle1">
                          Lặn ngụp
                        </Typography>
                        <Typography color="GrayText" variant="subtitle2">
                          Đây là một trong số ít chỗ ở có bể bơi tại khu vực
                          này.
                        </Typography>
                      </Box>
                    </Box>
                  ) : null}
                  {/* CAR PARKING */}
                  {room.doXe ? (
                    <Box
                      p={2}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                      component="div"
                    >
                      <LocalParkingIcon fontSize="large" />
                      <Box component="div">
                        <Typography fontWeight="bold" variant="subtitle1">
                          Đỗ xe miễn phí
                        </Typography>
                        <Typography color="GrayText" variant="subtitle2">
                          Đây là một trong số ít địa điểm có chỗ đỗ xe miễn phí
                          tại khu vực.
                        </Typography>
                      </Box>
                    </Box>
                  ) : null}
                  <Divider variant="middle" />
                  {/* DESCRIPTION */}
                  <Box p={2} component="div">
                    <Typography textAlign="justify">{room.moTa}</Typography>
                  </Box>
                  <Divider variant="middle" />
                  {/* WHAT THIS ROOM HAVE */}
                  <Box p={2} component="div">
                    <Typography fontWeight="bold" variant="h6">
                      Nơi này có những gì cho bạn
                    </Typography>
                    <Grid spacing={3} container>
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                        item
                        xs={6}
                      >
                        <WorkIcon />
                        <Typography variant="subtitle2">
                          Không gian riêng để làm việc
                        </Typography>
                      </Grid>
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                        item
                        xs={6}
                      >
                        <ApartmentIcon />
                        <Typography variant="subtitle2">
                          Hướng nhìn ra đường chân trời thành phố
                        </Typography>
                      </Grid>
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                        item
                        xs={6}
                      >
                        <CameraOutdoorIcon />
                        <Typography variant="subtitle2">
                          Camera an ninh trong nhà
                        </Typography>
                      </Grid>
                      {room.tivi ? (
                        <Grid
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                          item
                          xs={6}
                        >
                          <TvIcon />
                          <Typography variant="subtitle2">TV</Typography>
                        </Grid>
                      ) : null}
                      {room.wifi ? (
                        <Grid
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                          item
                          xs={6}
                        >
                          <WifiIcon />
                          <Typography variant="subtitle2">WIFI</Typography>
                        </Grid>
                      ) : null}
                      {room.dieuHoa ? (
                        <Grid
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                          item
                          xs={6}
                        >
                          <AcUnitIcon />
                          <Typography variant="subtitle2">
                            Điều hòa nhiệt độ
                          </Typography>
                        </Grid>
                      ) : null}
                      {room.doXe ? (
                        <Grid
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                          item
                          xs={6}
                        >
                          <LocalParkingIcon />
                          <Typography variant="subtitle2">
                            Chỗ đỗ xe miễn phí tại nơi ở
                          </Typography>
                        </Grid>
                      ) : null}
                      {room.bep ? (
                        <Grid
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                          item
                          xs={6}
                        >
                          <CountertopsIcon />
                          <Typography variant="subtitle2">Bếp</Typography>
                        </Grid>
                      ) : null}
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              {/* BOOKING  */}
              <Grid item xs={12} sm={12} md={5}>
                <Box elevation={3} component={Paper}>
                  {/* PRICE */}
                  <Typography p={2} color="GrayText" variant="subtitle2">
                    <Typography
                      sx={{ fontWeight: "bold", display: "inline-block" }}
                      variant="h6"
                      component="div"
                    >
                      {currencyFormat(room.giaTien)}
                    </Typography>{" "}
                    / Đêm
                  </Typography>
                  {/* BOOKING FORM */}
                  <Box component="div" p={2}>
                    <Box
                      component="div"
                      border="1px solid black"
                      borderRadius="5px"
                    >
                      {/* DATE PICKING */}
                      <Box
                        component="div"
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        {/* START DATE */}
                        <Box component="div" p={1}>
                          <Typography fontWeight="bold" variant="body2">
                            Nhận phòng
                          </Typography>
                          <DatePicker
                            onChange={handleStartDate}
                            type="date"
                            variant="standard"
                            value={startDate}
                            InputProps={{
                              inputProps: {
                                min: today,
                              },
                            }}
                          />
                        </Box>
                        <Divider
                          sx={{ bgcolor: "black" }}
                          orientation="vertical"
                          flexItem
                        />
                        {/* END DATE */}
                        <Box component="div" p={1}>
                          <Typography fontWeight="bold" variant="body2">
                            Trả phòng
                          </Typography>
                          <DatePicker
                            onChange={handleEndDate}
                            type="date"
                            variant="standard"
                            value={endDate}
                            InputProps={{
                              inputProps: {
                                min: startDate,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      <Divider sx={{ bgcolor: "black" }} />
                      {/* GUEST QUANTITY */}
                      <Box component="div" p={1}>
                        <Typography fontWeight="bold" variant="body2">
                          Khách
                        </Typography>
                        {/* QUANTITY CONTROLLER */}
                      </Box>
                      <Box
                        component="div"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {/* DECREASE */}
                        <IconButton
                          onClick={() => {
                            setGuestQuantity(guestQuantity - 1);
                          }}
                          disabled={guestQuantity <= 1}
                        >
                          <RemoveCircleIcon />
                        </IconButton>
                        <Typography>{guestQuantity}</Typography>
                        {/* INCREASEE */}
                        <IconButton
                          onClick={() => {
                            setGuestQuantity(guestQuantity + 1);
                          }}
                          disabled={guestQuantity >= room.khach}
                        >
                          <AddCircleIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    {/* BOOKING BUTTON */}
                    <BookingButton
                      onClick={() => handleBookingRoom(room.id)}
                      sx={{ fontWeight: "bold", mt: 1 }}
                      variant="contained"
                      disabled={currentUser?.user?.role === "ADMIN"}
                      fullWidth
                    >
                      Đặt Phòng
                    </BookingButton>
                    {/* BILL  */}
                    {totalPrice > 0 ? (
                      <Box py={2} component="div">
                        {/* PRICE X PER NIGHT CALCULATE */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                          component="div"
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            {currencyFormat(room.giaTien)} x {totalDays} đêm
                          </Typography>
                          <Typography variant="subtitle1">
                            {currencyFormat(totalPrice)}
                          </Typography>
                        </Box>
                        {/* SERVICE PRICE */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                          component="div"
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            Phí dịch vụ
                          </Typography>
                          <Typography variant="subtitle1">
                            {currencyFormat(0)}
                          </Typography>
                        </Box>
                        <Divider />
                        {/* TOTAL PRICE */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                          component="div"
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            Tổng
                          </Typography>
                          <Typography variant="subtitle1">
                            {currencyFormat(totalPrice)}
                          </Typography>
                        </Box>
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          {/* COMMENTS PART */}
          <Grid py={2} item xs={12}>
            <RoomComments roomId={roomId} currentUser={currentUser} />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
