import React from "react";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";
import BarVertical from "../../components/BarVertical";
import AdminProvider from "../../context/AdminContext/AdminContext";
import zIndex from "@mui/material/styles/zIndex";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";

export default function AdminLayout() {
  return (
    <AdminProvider>
      <HeaderAdmin />
      <BarVertical>
        <Outlet />
      </BarVertical>
      <Footer />
    </AdminProvider>
  );
}
