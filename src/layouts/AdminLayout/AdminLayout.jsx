import React from 'react'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin'
import BarVertical from '../../components/BarVertical'
import AdminProvider from '../../context/AdminContext/AdminContext'
import zIndex from '@mui/material/styles/zIndex'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <AdminProvider>

      <div>
        <div >
          <HeaderAdmin />
        </div>
        <div >
          <div >
            <BarVertical>
              <Outlet />
            </BarVertical>
          </div>
        </div>
      </div>



    </AdminProvider>
  )
}
