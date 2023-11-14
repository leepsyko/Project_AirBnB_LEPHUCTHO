import React from "react";
import {
  Container,
  List,
  ListItem,
  Grid,
  Divider,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const LinkFooter = styled.a`
  color: black;
  text-decoration: none;
  margin-bottom: 4px;
  &:hover {
    color: #f43f5e;
    font-weight: 500;
  }
`;

const TiFooterH2 = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const DFooter = styled.div`
  background-color: #f7f7f7;
`;

export default function Footer() {
  return (
    <>
      <DFooter>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TiFooterH2>Hỗ trợ</TiFooterH2>
              <List>
                <ListItem>
                  <LinkFooter href="#">Trung tâm trợ giúp</LinkFooter>
                </ListItem>
                <ListItem>
                  <LinkFooter href="#">AirCover</LinkFooter>
                </ListItem>
                <ListItem>
                  <LinkFooter href="#">Chống phân biệt đối xử</LinkFooter>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={4}>
              <TiFooterH2>Đón tiếp khách </TiFooterH2>
              <List>
                <ListItem>
                  <LinkFooter href="#">Cho thuê nhà trên Airbnb</LinkFooter>
                </ListItem>
                <ListItem>
                  <LinkFooter href="#">AirCover cho Chủ nhà</LinkFooter>
                </ListItem>
                <ListItem>
                  <LinkFooter href="#">Diễn đàn cộng đồng</LinkFooter>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={4}>
              <TiFooterH2>Airbnb</TiFooterH2>
              <List>
                <ListItem>
                  <LinkFooter href="#">Trang tin tức</LinkFooter>
                </ListItem>
                <ListItem>
                  <LinkFooter href="#">Tính năng mới</LinkFooter>
                </ListItem>
                <ListItem>
                  <LinkFooter href="#">Chỗ ở khẩn cấp Airbnb.org</LinkFooter>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: " 2%",
                fontSize: {
                  xs: "0",
                  md: "16px",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "14px",
                    md: "16px",
                  },
                }}
              >
                © 2021 Airbnb, Inc
              </Typography>
              <FiberManualRecordIcon
                sx={{ margin: "0 20px" }}
                fontSize="small"
              />
              <LinkFooter href="#">Quyền riêng tư </LinkFooter>
              <FiberManualRecordIcon
                sx={{ margin: "0 10px" }}
                fontSize="small"
              />
              <LinkFooter href="#">Điều khoản</LinkFooter>
              <FiberManualRecordIcon
                sx={{ margin: "0 10px" }}
                fontSize="small"
              />
              <LinkFooter href="#">Sơ đồ trang web</LinkFooter>
            </Grid>
          </Grid>
        </Container>
      </DFooter>
    </>
  );
}
