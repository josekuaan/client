import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import * as moment from "moment";
import axios from "axios";
import Cookies from "js-cookie";

import Swal from "sweetalert";
import "../../style.css";
import { WalletContext } from "../../../pageContext";

export default function Credit() {
  const { setCreditAccount, creditAccount } = useContext(WalletContext);
  const token = Cookies.get("token");
  let history = useHistory();

  const [interest, setInterest] = useState("");
  const [wallet, setWithdraw] = useState("");
  const [status, setChecked] = useState("");
  const [withdrawable, setWithdrawable] = useState("");
  const [buttonAction, setButton] = useState(false);
  const id = history.location.pathname.split("/")[4];
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    axios
      .get(
        `https://limitless-escarpment-58685.herokuapp.com/api/investment/get-single-user-investment/${id}`,
        config
      )
      .then((response) => {
        if (response.data.success) {
          setChecked(response.data.invest.status)
          setCreditAccount(response.data.invest);
        }
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { wallet, interest, withdrawable, status };

    axios({
      method: "put",
      url: `https://limitless-escarpment-58685.herokuapp.com/api/investment/update-user-account/${id}`,
      data,
      config,
      headers: config.headers,
    }).then(function (response) {
      if (response.data.success) {
        setCreditAccount(response.data.invest);
      }
      Swal({
        title: "Good job!",
        text: "Congrats! Your profile is 100%.",
        icon: "success",
        button: <But />,
      });

      setButton(!buttonAction);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <div className="work-progress">
                <span>Joined</span>
                <span>
                  {moment(`${creditAccount.createdAt}`).format("DD/ MM /YYYY")}
                </span>
              </div>
              <hr />
              <div className="work-progress">
                <span>User Name</span>
                <span>{creditAccount.name}</span>
              </div>
              <hr />
              <div className="work-progress">
                <span>Email</span>
                <Link to="..">{creditAccount.email}</Link>
              </div>
              <br />
            </div>
          </div>
          <div className="card">
            <h5 style={{ padding: "20px 10px 0px" }}>Work Progress</h5>
            <hr />
            <div className="card-header">
              <div className="work-progress">
                <span>Main Balance</span>
                <span>
                  ${" "}
                  {creditAccount === null ? (
                    <span>0.00</span>
                  ) : (
                    <span>{creditAccount.wallet}</span>
                  )}
                </span>
              </div>
              <br />
              <div className="work-progress">
                <span>Withdrawable Balance</span>
                <span>
                  ${" "}
                  {creditAccount === null ? (
                    <span>0.00</span>
                  ) : (
                    <span>{creditAccount.withdrawable}</span>
                  )}
                </span>
              </div>
              <br />
              <div className="work-progress">
                <span>Total ROI</span>
                <span>
                  ${" "}
                  {creditAccount === null ? (
                    <span>0.00</span>
                  ) : (
                    <span>{creditAccount.interest}</span>
                  )}
                </span>
              </div>
              <br />
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Approve Profile</p>
              </div>
            </div>
            <hr />
            <div className="card-content">
              <form className="form-horizontal">
                <div className="form-group">
                  <div className="row">
                    {/* <div style={{marginBottom:"10px"}}>Front View</div> */}
                    <div className="col-sm-4">
                      <div style={{ marginBottom: "10px" }}>
                        Recharge Wallet
                      </div>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setWithdraw(e.target.value)}
                        />
                        <span className="input-group-addon"></span>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div style={{ marginBottom: "10px" }}>
                        Amount To Withdraw
                      </div>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setWithdrawable(e.target.value)}
                        />
                        <span className="input-group-addon"></span>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div style={{ marginBottom: "10px" }}>Interest </div>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setInterest(e.target.value)}
                        />
                        <span className="input-group-addon"></span>
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: "10px" }}>
                    <div className="col-sm-4">
                      <div className="checkbox">
                        <input
                          id="checkbox5"
                          type="checkbox"
                          onChange={(e) =>setChecked(e.target.value)}
                          checked={status}
                          style={{ width: "20px", height: "20px" }}
                        />
                        {status ? (
                          <label
                            htmlFor="checkbox5"
                            style={{ marginBottom: "0rem", marginLeft: "4px" }}
                          >
                            Approved
                          </label>
                        ) : (
                          <label
                            htmlFor="checkbox5"
                            style={{ marginBottom: "0rem", marginLeft: "4px" }}
                          >
                            Not Approved
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link
                    to="/admin/dashboard/users-actions"
                    type="submit"
                    style={{
                      borderRadius: 2,
                      color: "#fff",
                      backgroundColor: "#dc3545",
                    }}
                    className="cancel"
                  >
                    Cancel
                  </Link>
                  <div>
                    <input
                      type="submit"
                      onClick={handleSubmit}
                      className="update"
                      style={{
                        borderRadius: 2,
                        border: "none",
                        color: "#fff",
                        backgroundColor: "#007bff",
                      }}
                      value="Save "
                      disabled={buttonAction}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>{" "}
          {/* end card */}
        </div>
      </div>
    </div>
  );
}

function But() {
  <Link onClick={() => window.location.reload()}>OK</Link>;
}
