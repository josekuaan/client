import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdown = () => {
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState(" ");
  const history = useHistory();
  useEffect(async () => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const userId = window.localStorage.getItem("userId");
    const token = Cookies.get("token");
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `https://limitless-escarpment-58685.herokuapp.com/api/user/auth/getMe/${userId}`,
        config
      )
      .then(function (response) {
        if (response.data.success) {
          setPicture(response.data.msg.picture);
          setEmail(response.data.msg.email)
        }
      });
  };
  const handleLogout = () => {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("loggedIn");
    Cookies.remove("token");
    history.push("/login");
  };
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          {picture === "no-photo.jpg" || picture === " " ? (
            <div className="profile-background" >
              <i className="fa fa-user" style={{ padding: "12px",fontSize: "16px" }}></i>
            </div>
          ) : (
            <CImg
              src={picture}
              className="c-avatar-img"
              style={{ height: "100%" }}
              alt={email}
            />
          )}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem to="/user/dashboard/user-profile">
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>

        <CDropdownItem divider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-user" className="mfe-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
