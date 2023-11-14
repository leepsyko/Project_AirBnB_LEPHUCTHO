import { useQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomListById } from "../../apis/roomAPI";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Paper,
  styled,
} from "@mui/material";
import currencyFormat from "../../currencyFomat";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

export default function RoomList() {
  const navigate = useNavigate();
  const { locationId } = useParams();

  const { data: roomList = [], isLoading } = useQuery({
    queryKey: ["roomlist", locationId],
    queryFn: () => getRoomListById(locationId),
    enabled: !!locationId,
  });

  const RoomImg = styled("img")`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  `;

  const Description = styled(Typography)`
    display: -webkit-box;
    text-align: justify;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `;

  const renderRoomList = (array) => {
    return array.map((item) => {
      return (
        <Grid
          onClick={() => navigate(`/roomdetails/${item.id}`)}
          component={Paper}
          sx={{
            cursor: "pointer",
            transition: "0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
            },
          }}
          mb={3}
          p={2}
          key={item.id}
          item
          xs={12}
        >
          <Grid container columnSpacing={2}>
            {/* IMG */}
            <Grid item xs={12} sm={6}>
              <RoomImg src={item.hinhAnh} alt={item.tenPhong} />
            </Grid>
            {/* INFO */}
            <Grid item xs={12} sm={6}>
              <Box component="div">
                <Typography sx={{ textDecoration: "underline" }} variant="">
                  {item.tenPhong}
                </Typography>
                <Description color="GrayText" variant="subtitle2">
                  {item.moTa}
                </Description>
              </Box>
              <Divider
                sx={{ width: "200px", m: "auto", my: "10px" }}
                variant="middle"
              />
              <Grid container spacing={2}>
                {/* GUEST */}
                <Grid item xs={4}>
                  <Typography color="GrayText" variant="subtitle2">
                    {item.khach} Khách
                  </Typography>
                </Grid>
                {/* BED */}
                <Grid item xs={4}>
                  <Typography color="GrayText" variant="subtitle2">
                    {item.giuong} Giường
                  </Typography>
                </Grid>
                {/* BED ROOM */}
                <Grid item xs={4}>
                  <Typography color="GrayText" variant="subtitle2">
                    {item.phongNgu} Phòng Ngủ
                  </Typography>
                </Grid>
                {/* BATH ROOM */}
                <Grid item xs={4}>
                  <Typography color="GrayText" variant="subtitle2">
                    {item.phongTam} Phòng Tắm
                  </Typography>
                </Grid>
                {/* TV */}
                <Grid item xs={4}>
                  {item.tivi ? (
                    <Typography color="GrayText" variant="subtitle2">
                      TiVi
                    </Typography>
                  ) : null}
                </Grid>
                {/* WIFI */}
                <Grid item xs={4}>
                  {item.wifi ? (
                    <Typography color="GrayText" variant="subtitle2">
                      WiFi
                    </Typography>
                  ) : null}
                </Grid>
              </Grid>
              <Divider
                sx={{ width: "200px", m: "auto", my: "10px" }}
                variant="middle"
              />
              {/* PRICE */}
              <Typography color="GrayText" variant="subtitle2">
                <Typography
                  sx={{ fontWeight: "bold", display: "inline-block" }}
                  variant="h6"
                  component="div"
                >
                  {currencyFormat(item.giaTien)}
                </Typography>{" "}
                / Đêm
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Fragment>
      <Container>
        <Box my="50px" component="div">
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Chỗ ở tại khu vực đã chọn
          </Typography>
          <Typography variant="subtitle1">Hơn 100 chỗ ở</Typography>
          <Grid container>{roomList ? renderRoomList(roomList) : null}</Grid>
        </Box>
      </Container>
    </Fragment>
  );
}
