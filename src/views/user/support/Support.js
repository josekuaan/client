import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CFade,
  CRow,
} from "@coreui/react";

import axios from "axios";
import Cookies from "js-cookie";
import isLoggedIn from "../../../helper";
import "../../style.css";

const Support = () => {
  const [collapsed] = React.useState(true);
  const [showElements] = React.useState(true);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      subject,
      message,
    };
    console.log(data);

    const userId = window.localStorage.getItem("userId");
    const token = Cookies.get("token");

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${token}`,
      },
    };
    axios({
      method: "post",
      url: `https://limitless-escarpment-58685.herokuapp.com/api/user/mailer/${userId}`,
      data,
      headers: config,
    }).then(function (response) {
      console.log(response);
      if (response.data.success) {
        setSuccess(true);
        setMsg("Your Email was sent Successfully");
        setTimeout(() => {
          setSuccess(null);
        }, 6000);
      } else {
        setSuccess(false);
        setMsg("Something went wrong");
        setTimeout(() => {
          setSuccess(null);
        }, 6000);
      }
    });
  };


  return (
    <>
      <CRow>
        <CCol xs="12">
          {!success ? (
            <div className={success ? " display" : "hide"}>{msg}</div>
          ) : (
            <div className={success ? " success message" : "hide"}>{success}</div>
          )}
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                <div className="d-flex justify-content-end">
                  <div className="btn btn-success btn-submit">
                    <Link to="user/supports" color="primary" style={{ color: "#FFF" }}>
                      <i className="fa fa-envelope"></i>
                    </Link>
                  </div>
                </div>
              </CCardHeader>
              <CCollapse show={collapsed} timeout={1000}>
                <CCardBody>
                  <div className="row">
                    <div className="col-xl-12 ">
                      <div className="row">
                        <div
                          className="col-md-3"
                          style={{
                            borderRight: "1px solid #e4e5e7",
                            height: "302px",
                            padding: "0px",
                          }}
                        >
                          <div
                            style={{
                              margin: "20px 0px 0px 20px",
                              padding: "10px",
                            }}
                          >
                            <p
                              style={{
                                margin: "20px 0px 0px 20px",
                                padding: "10px",
                              }}
                            >
                              SUPPORT TICKET
                            </p>
                            <hr />

                            <div>
                              <ul
                                style={{
                                  listStyle: "none",
                                  paddingLeft: "0px",
                                }}
                              >
                                <li className="view-ticket">
                                  <Link to="...">
                                    <i className="fa fa-inbox"></i>View Ticket
                                  </Link>
                                </li>
                                <li className="create-ticket">
                                  <Link to="..." style={{ color: "#fff" }}>
                                    <i className="fa fa-envelope-square"></i>
                                    Create a Ticket
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-9">
                          <div className="row">
                            <form
                              onSubmit={handleSubmit}
                              style={{ width: "100%" }}
                            >
                              <div
                                className="col-sm-11"
                                style={{ margin: "20px 0px" }}
                              >
                                <div style={{ marginBottom: "10px" }}>
                                  Subjetct
                                </div>
                                <div
                                  className="input-group"
                                  style={{ width: "100%" }}
                                >
                                  <input
                                    type="text"
                                    className="support-form-control"
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-sm-11">
                                <div style={{ marginBottom: "10px" }}>
                                  Mesage
                                </div>
                                <div
                                  className="form-group"
                                  style={{ width: "100%" }}
                                >
                                  <textarea
                                    className="support-form-control"
                                    onChange={(e) => setMessage(e.target.value)}
                                    style={{ height: "76px", width: "100%" }}
                                    required
                                  ></textarea>
                                </div>
                              </div>
                              <CCol xs="12">
                                <div className="form-actions">
                                  <CButton type="submit" color="primary">
                                    Save changes
                                  </CButton>
                                </div>
                              </CCol>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default Support;
