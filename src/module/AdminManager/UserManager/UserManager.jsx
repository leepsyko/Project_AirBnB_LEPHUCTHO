import {
  Alert,
  Box,
  Button,
  IconButton,
  Modal,
  Snackbar,
  Stack,
  TableFooter,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getUserAPI, removeUser } from "../../../apis/userApi";
import {
  Query,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import AddUser from "./AddUser";
import { ButtonSign } from "../../../components/Button/ButtonCustom";
import EditUser from "./EditUser";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ModalContent } from "../../../components/ModalPopup/ModalPopup";
import ModalErrorCustomer from "../../../components/Modal/ModalErrorCustomer";
import { useTheme } from "@emotion/react";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import PropTypes from "prop-types";
import Loading from "../../../components/Loading";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import { StyledTableCell, StyledTableRow } from "./index";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function UserManager(props) {
  const queryClient = useQueryClient();
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditAddUser] = useState(false);
  const [idEditUser, setIDEditAddUser] = useState(null);
  const [openStack, setOpenStack] = useState(false);
  const [openErro, setOpenErro] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: dataUser = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userList"],
    queryFn: getUserAPI,
  });

  const { mutate: handleDeleteUser } = useMutation({
    mutationFn: (id) => removeUser(id),
    onSuccess: () => {
      setOpenStack(true);
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
    onError: (err) => {
      setOpenErro(true);
    },
  });

  //add
  const handleOpenAddUser = () => {
    setOpenAddUser(true);
  };

  const handleCloseAddUser = () => {
    setOpenAddUser(false);
    queryClient.invalidateQueries("userList");
  };

  //edit

  const handleOpenEditUser = (id) => {
    setOpenEditAddUser(true);
    setIDEditAddUser(id);
  };

  const handleCloseEditUser = () => {
    setOpenEditAddUser(false);
    queryClient.invalidateQueries("userList");
  };

  //delete
  const handleRemoveUser = () => {
    handleDeleteUser(idEditUser);
    setOpenDelete(false);
  };

  const handleCloseStack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenStack(false);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataUser.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Function to filter users based on search query

  const filterUsers = () => {
    const filteredData = dataUser.filter((info) =>
      _.deburr(info.name.toLowerCase()).includes(
        _.deburr(searchQuery.toLowerCase().trim())
      )
    );
    setFilteredUsers(filteredData);
    setPage(0);
  };

  // Attach an event handler to update searchQuery when the input value changes
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      filterUsers();
    }
  };

  useEffect(() => {
    if (dataUser) {
      setFilteredUsers(dataUser); // Ban đầu, filteredUsers bằng danh sách customers
    }
  }, [dataUser]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginRight: "16px",
            display: "flex",
          }}
        >
          <TextField
            fullWidth
            label="Tìm kiếm tài khoản theo tên"
            id="fullWidth"
            color="secondary"
            value={searchQuery}
            onChange={handleSearchInputChange} // Handle input change
            onKeyDown={handleEnterKeyDown}
          />
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              filterUsers();
            }}
          >
            <SearchIcon />
          </Button>
        </Box>
        <ButtonSign variant="contained" onClick={handleOpenAddUser}>
          Thêm
        </ButtonSign>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>STT</StyledTableCell>
              <StyledTableCell>Họ và tên</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Ngày sinh</StyledTableCell>
              <StyledTableCell>Quyền</StyledTableCell>
              <StyledTableCell>Chỉnh sửa</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredUsers.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredUsers
            ).map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                {/* <TableCell >{row.password}</TableCell> */}
                {/* <TableCell >{row.phone}</TableCell> */}
                <StyledTableCell>{row.birthday}</StyledTableCell>
                {/* <TableCell >{row.avatar}</TableCell> */}
                {/* <TableCell >{row.gender}</TableCell> */}
                <StyledTableCell>{row.role}</StyledTableCell>
                <StyledTableCell>
                  <Box>
                    <Tooltip title="chỉnh sửa" placement="top">
                      <IconButton
                        aria-label="update"
                        size="large"
                        onClick={() => handleOpenEditUser(row.id)}
                      >
                        <EditIcon fontSize="inherit" color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa user" placement="bottom">
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => {
                          setOpenDelete(true);
                          setIDEditAddUser(row.id);
                        }}
                      >
                        <DeleteIcon fontSize="inherit" color="error" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={dataUser.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* handle */}

      {/* Modal Add user  */}

      <Modal
        open={openAddUser}
        onClose={handleCloseAddUser}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div>
          <AddUser handleCloseAddUser={handleCloseAddUser} />
        </div>
      </Modal>

      {/* Modal Edit user  */}
      <Modal
        open={openEditUser}
        onClose={handleCloseEditUser}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div>
          <EditUser userId={idEditUser} onClose={handleCloseEditUser} />
        </div>
      </Modal>

      {/* Modal hiển thị thông báo xác nhận xóa */}
      <Modal
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
        }}
        sx={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: " rgba(0, 0, 0, 0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "12",
        }}
      >
        <ModalContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "40px",
              color: " #f43f5e",
            }}
          >
            Bạn có chắc chắn xóa tài khoản?
          </Typography>

          <ButtonSign onClick={handleRemoveUser}>Xác nhận</ButtonSign>
          <ButtonSign
            onClick={() => {
              setOpenDelete(false);
            }}
          >
            Hủy
          </ButtonSign>
        </ModalContent>
      </Modal>

      {/* Modal báo lỗi */}

      <ModalErrorCustomer openErro={openErro} setOpenErro={setOpenErro} />

      {/* Xoá thành công */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openStack}
          autoHideDuration={3000}
          onClose={handleCloseStack}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseStack}
            severity="success"
            sx={{ width: "100%" }}
          >
            Xóa thành công!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
