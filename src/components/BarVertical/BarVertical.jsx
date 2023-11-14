import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useAdminContext } from "../../context/AdminContext/AdminContext";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import KingBedIcon from "@mui/icons-material/KingBed";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function BarVertical({ children }) {
  const navigate = useNavigate();

  const departmentManager = [
    {
      nameDepartment: "Quản lý người dùng",
      logoDepartment: <RecentActorsIcon />,
      handleDepartment: () => navigate("/manager/user-manager"),
    },
    {
      nameDepartment: "Quản lý đặt phòng",
      logoDepartment: <CalendarMonthIcon />,
      handleDepartment: () => navigate("/manager/booking-manager"),
    },
    {
      nameDepartment: "Quản lý địa điểm",
      logoDepartment: <AddLocationAltIcon />,
      handleDepartment: () => navigate("/manager/location-manager"),
    },
    {
      nameDepartment: "Quản lý phòng",
      logoDepartment: <KingBedIcon />,
      handleDepartment: () => navigate("/manager/room-manager"),
    },
  ];

  const theme = useTheme();

  const { openBarVertical } = useAdminContext();

  React.useEffect(() => {
    if (departmentManager) {
      navigate("/manager/user-manager");
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" sx={{ zIndex: 10 }} open={openBarVertical}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {departmentManager.map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: openBarVertical ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={text.handleDepartment}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openBarVertical ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {text.logoDepartment}
                </ListItemIcon>
                <ListItemText
                  primary={text.nameDepartment}
                  sx={{ opacity: openBarVertical ? 1 : 0 }}
                />
              </ListItemButton>
              <Divider />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
