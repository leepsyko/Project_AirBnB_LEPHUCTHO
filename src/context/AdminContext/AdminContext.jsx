import { Children, createContext, useContext, useState } from "react";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    return user || null;
  });

  // BarVertical
  const [openBarVertical, setOpenBarVertical] = useState(false);

  const handleDrawerOpen = () => {
    setOpenBarVertical(!openBarVertical);
  };

  return (
    <AdminContext.Provider
      value={{ currentUser, handleDrawerOpen, openBarVertical }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const value = useContext(AdminContext);
  return value;
};
export default AdminProvider;
