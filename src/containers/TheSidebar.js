import React from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/icons/logo.png";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import '../views/style.css'

// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand
        className="d-md-down"
        to="/user/dashboard"
        style={{ padding: "20px",justifyContent: 'left' }}
      >
        {/* <CIcon
          className="c-sidebar-brand-full"
          name={logo}
          height={35}
        /> */}
        <img
          src={logo}
          alt="logo"
          className="c-sidebar-brand-full"
          height={45}
        />
        {/* <CIcon
          
          name="sygnet"
          height={35}
        /> */}
      </CSidebarBrand>
      <CSidebarNav >
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
          
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
