import React, { useEffect, useContext } from "react";

import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import happy from "../../assets/icons/happiness.svg";
import { WalletContext } from "../../pageContext";
import "../style.css";

const Dashboard = () => {
  const {
    currentuser,
    setCurrentUser,
    EditAccount,
    setEditAccount,
  } = useContext(WalletContext);
  const userId = window.localStorage.getItem("userId");
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const token = Cookies.get("token");
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(async () => {
    fetchData();
  }, []);
  const fetchData = async () => {
    axios
      .get(
        `https://limitless-escarpment-58685.herokuapp.com/api/user/auth/getMe/${userId}`,
        config
      )
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          // console.log(response)
          setCurrentUser([response.data.msg]);
        }
        axios
          .get(
            `https://limitless-escarpment-58685.herokuapp.com/api/investment/single-users-investment/${response.data.msg._id}`,
            config
          )
          .then(function (response) {
            console.log(response);
            if (response.data.success) {
              setEditAccount(response.data.invest);
            }
          });
      });
  };
  console.log(EditAccount);
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div className="content">
        <div
          style={{
            height: 560,
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
            boxSizing: "border-box",
            border: "1px solid #56667F",
            borderRadius: 4,
            textAlign: "right",
            lineHeight: 14,
            fontSize: 12,
            fontFeatureSettings: "normal",
            textSizeAdjust: "100%",
            boxShadow: "inset 0 -20px 0 0 #56667F",
            padding: 0,
            margin: 0,
            width: "100%",
          }}
        >
          <div style={{ height: 540, padding: 0, margin: 0, width: "100%" }}>
            <iframe
              src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505"
              width="100%"
              height="536px"
              scrolling="auto"
              marginWidth={0}
              marginHeight={0}
              frameBorder={0}
              border={0}
              style={{ border: 0, margin: 0, padding: 0, lineHeight: 14 }}
              alt="widget"
            />
          </div>
          <div
            style={{
              color: "#FFFFFF",
              lineHeight: 14,
              fontWeight: 400,
              fontSize: 11,
              boxSizing: "border-box",
              padding: "2px 6px",
              width: "100%",
              fontFamily: "Verdana, Tahoma, Arial, sans-serif",
            }}
          >
            <Link
              to="https://coinlib.io"
              target="_blank"
              style={{
                fontWeight: 500,
                color: "#FFFFFF",
                textDecoration: "none",
                fontSize: 11,
              }}
            >
              ©
            </Link>
            &nbsp;Rilibit Option
          </div>
        </div>

        <div className="row">
          <div className="col-md-6" style={{ marginTop: "20px" }}>
            <div className="card">
              <div className="card-header">
                <div className="greet-user col-12 col-xl-10">
                  <div style={{ margin: "auto", width: "75%" }}>
                    <img
                      src={happy}
                      alt="happiness"
                      className="img-fluid  mb-2"
                    />
                  </div>
                  {currentuser.map((user, index) => (
                    <h2 className="fs-23 font-weight-600 mb-2" key={index}>
                      Dear {user.fullName},
                    </h2>
                  ))}
                  <p className="text-muted">
                    Welcome to Rilibit Option, We hope you enjoy using Rilibit
                    Option. Please ensure you refer members to Rilibit Option as
                    this can earn you more bonus
                  </p>
                  {currentuser.length == 0 ? (
                    <Link
                      to="#"
                      className="btn-danger"
                      style={{ color: "#fff" }}
                    >
                      Account Not Verified By Admin
                    </Link>
                  ) : (
                    currentuser.map((user, index) => (
                      <div className="button" key={index}>
                        {user.status ? (
                          <Link
                            to="#"
                            className="btn-success"
                            key={index}
                            style={{ color: "#fff" }}
                          >
                            Account Verified By Admin
                          </Link>
                        ) : (
                          <Link
                            to="#"
                            className="btn-danger"
                            key={index}
                            style={{ color: "#fff" }}
                          >
                            Account Not Verified By Admin
                          </Link>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6" style={{ marginTop: "12px" }}>
                <div className="card">
                  <h5 style={{ padding: "20px 10px 0px" }}>
                    <small>PROFIT</small>
                  </h5>
                  <div className="card-header roi">
                    <div className="">
                      <Link
                        to="..."
                        className="interest"
                        style={{ color: "#fff" }}
                      >
                        {EditAccount.length == 0 ||
                        EditAccount === undefined ? (
                          <span>$0.00</span>
                        ) : (
                          <span>${EditAccount[0].interest}</span>
                        )}
                      </Link>
                      <div style={{ marginTop: "14px" }}>
                        <small>
                          <i className="fas fa-long-arrow-alt-down"></i>VS
                          average
                        </small>
                      </div>

                      <br />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6" style={{ marginTop: "12px" }}>
                <div className="card">
                  <h5 style={{ padding: "20px 10px 0px" }}>
                    <small>SESSIONS BY DEVICE</small>
                  </h5>
                  <div className="card-header gadgets">
                    <div className="gadget">
                      <i
                        className="fa fa-mobile"
                        style={{ fontSize: "30px" }}
                      ></i>
                      <div>
                        <small>40%</small>
                      </div>
                    </div>
                    <br />
                    <div className="gadget">
                      <i
                        className="fa fa-tablet"
                        style={{ fontSize: "30px" }}
                      ></i>
                      <div>
                        <small>20%</small>
                      </div>
                    </div>
                    <br />
                    <div className="gadget">
                      <i
                        className="fa fa-desktop"
                        style={{ fontSize: "30px" }}
                      ></i>
                      <div>
                        <small>40%</small>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <h5 style={{ padding: "20px 10px 0px" }}>
                    <small>DEPOSIT BALANCE</small>
                  </h5>
                  <div className="card-header roi">
                    <div className="">
                      <div className="balance">
                        <small>
                          <i className="fas fa-long-arrow-alt-down"></i>
                        </small>
                        {EditAccount === undefined ||
                        EditAccount.length === 0 ? (
                          <span>$0.00</span>
                        ) : (
                          <span>${EditAccount[0].amount}</span>
                        )}
                      </div>

                      <br />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <h5 style={{ padding: "20px 10px 0px" }}>
                    <small>BALANCE</small>
                  </h5>
                  <div className="card-header roi">
                    <div className="">
                      <div className="withdraw">
                        <small>
                          <i className="fa fa-long-arrow-alt-down"></i>
                        </small>{" "}
                        {EditAccount === undefined ||
                        EditAccount.length === 0 ? (
                          <span>$0.00</span>
                        ) : (
                          <span>${EditAccount[0].withdrawable}</span>
                        )}
                      </div>

                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          href="https://wa.me/+447862205606"
          class="whatsapp_float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa fa-whatsapp whatsapp-icon"></i>
        </a>
      </div>
    </>
  );
};

export default Dashboard;
