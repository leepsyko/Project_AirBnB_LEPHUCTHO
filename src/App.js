import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout/ClientLayout";
import Home from "./module/home/Home";
import RoomList from "./module/roomlist/RoomList";
import RoomDetails from "./module/roomdetails/RoomDetails";
import UserProvider from "./context/UserContext";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import UserManager from "./module/AdminManager/UserManager";
import AdminProtectedRouter from "./routers/AdminProtectedRouter/AdminProtectedRouter";
import RoomManager from "./module/AdminManager/RoomManager/RoomManager";
import Booking from "./module/AdminManager/Booking/Booking";
import LocationManagement from "./module/AdminManager/LocationManagement";
import UserInfo from "./module/userinfo/UserInfo";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoute from "./routers/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="roomlist/:locationId" element={<RoomList />} />
            <Route path="roomdetails/:roomId" element={<RoomDetails />} />
            <Route element={<ProtectedRoute />}>
              <Route path="profile/:userId" element={<UserInfo />} />
            </Route>
          </Route>

          <Route element={<AdminProtectedRouter />}>
            <Route path="/manager" element={<AdminLayout />}>
              <Route path="user-manager" element={<UserManager />} />
              <Route path="room-manager" element={<RoomManager />} />
              <Route path="booking-manager" element={<Booking />} />
              <Route path="location-manager" element={<LocationManagement />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </UserProvider>
  );
}

export default App;
