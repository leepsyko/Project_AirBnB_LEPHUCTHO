import { useQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { getLocation } from "../../../apis/positionAPI";
import { Box, Container, Grid, Typography, styled, Paper } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { colorConfigs } from "../../../configs/colorConfigs";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";

export default function LocationList() {
  const { data: location = [], isLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocation,
  });

  const navigate = useNavigate();

  const LocationImg = styled("img")`
    width: 100%;
    height: 200px;
    opacity: 0;
  `;

  const LocationName = styled(Typography)`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  `;

  const renderLocationList = (array) => {
    return array.map((item) => {
      return (
        <Grid key={item.id} item xs={12} sm={4} md={3}>
          <Grid
            onClick={() => navigate(`/roomlist/${item.id}`)}
            sx={{
              cursor: "pointer",
              border: "1px solid transparent",
              transition: "0.3s ease-in-out",
              "&:hover": {
                borderColor: colorConfigs.color.primary.main,
              },
            }}
            component={Paper}
            container
            p={2}
          >
            {/* IMG */}
            <Grid item xs={12}>
              <Box
                sx={{
                  position: "relative",
                  backgroundImage: `url(${item.hinhAnh})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "5px",
                }}
                component="div"
              >
                <FavoriteBorderIcon
                  color="error"
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 1,
                  }}
                />
                <LocationImg src={item.hinhAnh} />
              </Box>
            </Grid>
            {/* LOCATION NAME */}
            <Grid item xs={12}>
              <Box component="div">
                <LocationName
                  sx={{ fontWeight: "bold" }}
                  variant="subtitle1"
                  component="div"
                >
                  {item.tenViTri} - {item.tinhThanh}
                </LocationName>
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  variant="subtitle2"
                  component="div"
                >
                  <LocationOnIcon /> {item.quocGia}
                </Typography>
              </Box>
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
        <Grid my="50px" component="div" container spacing={3}>
          {location && renderLocationList(location)}
        </Grid>
      </Container>
    </Fragment>
  );
}
