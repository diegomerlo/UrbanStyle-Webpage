// src/admin/Aadmin.js
import { Outlet } from 'react-router-dom';
import Header from './Header';
import './App.css'
import Sidebar from './Sidebar';
import { useState } from 'react';

function Aadmin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className="content">
        <Outlet /> {/* Aquí se renderizan las rutas específicas como Home o UserList */}
      </div>
    </div>
  );
}

export default Aadmin;
