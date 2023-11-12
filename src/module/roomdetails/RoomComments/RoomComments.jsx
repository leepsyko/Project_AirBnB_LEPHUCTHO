import React, { Fragment, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { colorConfigs } from "../../../configs/colorConfigs";
import { getRoomCommentById, postRoomComment } from "../../../apis/roomAPI";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${colorConfigs.color.primary.main};
  }
`;
const CommentButton = styled(Button)`
  &.MuiButton-root {
    background-color: ${colorConfigs.color.primary.main};
    text-transform: none;
    font-weight: bold;
  }
`;

export default function RoomComments({ roomId, currentUser }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const { data: comment = [] } = useQuery({
    queryKey: ["comment"],
    queryFn: () => getRoomCommentById(roomId),
    enabled: !!roomId,
  });
  const { mutate: handleSubmit } = useMutation({
    mutationFn: (e) => {
      e.preventDefault();
      const currentTime = new Date();
      const commentObj = {
        maPhong: roomId,
        maNguoiBinhLuan: currentUser?.user?.id,
        ngayBinhLuan: currentTime.toLocaleString(),
        noiDung: value,
        saoBinhLuan: 5,
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
      } else if (commentObj.noiDung === "") {
        toast.warn("Vui lòng nhập nội dung.", {
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
      return postRoomComment(commentObj);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comment"]);
      setValue("");
    },
  });

  const renderUserCommentBox = (array) => {
    return array.map((item) => {
      const date = dayjs(item.ngayBinhLuan).format("DD-MM-YYYY, hh:mm:ss A");
      return (
        <Box p={2} component={Paper} mb={2} key={item.id}>
          {/* USER INFO */}
          <Box
            component="div"
            sx={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            <Avatar src={item.avatar} alt="avatar" />
            <Box component="div">
              <Typography variant="subtitle1">
                {item.tenNguoiBinhLuan}
              </Typography>
              <Typography variant="subtitle2" color="GrayText">
                {date}
              </Typography>
            </Box>
          </Box>
          {/* USER COMMENT CONTENT */}
          <Typography variant="subtitle2">{item.noiDung}</Typography>
        </Box>
      );
    });
  };

  return (
    <Fragment>
      <Box p={2} elevation={3} component={Paper}>
        {/* COMMENT FORM */}
        <Box onSubmit={handleSubmit} autoComplete="off" component="form">
          <Box gap={2} component="div" sx={{ display: "flex" }}>
            <Avatar
              src={currentUser ? currentUser?.user?.avatar : ""}
              alt={currentUser?.user?.name}
            />
            <StyledTextField
              fullWidth
              placeholder="Để lại bình luận của bạn..."
              multiline
              rows={4}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Box>
          <CommentButton type="submit" sx={{ mt: 2 }} variant="contained">
            Bình luận
          </CommentButton>
        </Box>
        <Divider variant="middle" sx={{ my: 2 }} />
        {/* RENDER USER COMMENTS */}
        {comment.length > 0 ? (
          renderUserCommentBox(comment)
        ) : (
          <Typography variant="h6" textAlign="center" color="GrayText">
            Chưa có bình luận nào.
          </Typography>
        )}
      </Box>
    </Fragment>
  );
}
