// src/admin/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  BsCart3,
  BsGrid1X2Fill,
  BsPeopleFill,
  BsCart2
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>X</span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/admin">
            <BsGrid1X2Fill className="icon" /> Panel
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admin/customers">
            <BsPeopleFill className="icon" /> Clientes
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admin/productos">
            <BsCart2 className="icon" /> Productos
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
