import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import * as moment from "moment";
import axios from "axios";
import Cookies from "js-cookie";

import Swal from "sweetalert";

import "../../style.css";
import { WalletContext } from "../../../pageContext";

export default function EditUser() {
  const { setEditAccount, EditAccount } = useContext(WalletContext);
  const token = Cookies.get("token");
  let history = useHistory();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dateIssued, setDateIssued] = useState("");
  const [id, setIdNumber] = useState("");
  const [identificationCard, setIdentificationCard] = useState("");
  const [frontView, setFrontView] = useState("");
  const [backView, setBackView] = useState("");
  const [status, setStatus] = useState(false);

  const [date, setDate] = useState("");
  const [buttonAction, setButton] = useState(false);
  const [text, setText] = useState("Update account");
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
    const user_id = history.location.pathname.split("/")[4];
    axios
      .get(
        `https://limitless-escarpment-58685.herokuapp.com/api/user/auth/get-user/${user_id}`,
        config
      )
      .then(function (response) {
        if (response.data.success) {

          setFullName(response.data.msg.fullName);
          setEmail(response.data.msg.email);
          setNumber(response.data.msg.number);
          setDate(response.data.msg.createdAt);
          setDateIssued(response.data.msg.dateIssued);
          setIdNumber(response.data.msg.IdNumber);
          setStatus(response.data.msg.status);
          setIdentificationCard(response.data.msg.IdentificationCard);
          setFrontView(response.data.msg.photo[0]);
          setBackView(response.data.msg.photo[1]);

          axios
            .get(
              `https://limitless-escarpment-58685.herokuapp.com/api/investment/single-users-investment/${response.data.msg._id}`,
              config
            )
            .then((response) => {
              if (response.data.success) {
                
                setEditAccount(response.data.invest);
              }
            });
        }
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setText("Updatting...");

    const id = history.location.pathname.split("/")[4];
    axios({
      method: "put",
      url: `https://limitless-escarpment-58685.herokuapp.com/api/user/auth/update/${id}`,
      data: status,
      headers: config.headers,
    }).then((response) => {
      if (response.data.success) {
        Swal({
          title: "Good job!",
          text: "Congrats! Your profile is 100%.",
          icon: "success",
          button: <But />,
        });
        setButton(!buttonAction);
      }
    });
  };
  console.log(EditAccount);
  return (
    <div className="body-content">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <div className="work-progress">
                <span>Joined</span>
                <span>{moment(`${date}`).format("DD/ MM /YYYY")}</span>
              </div>
              <hr />
              <div className="work-progress">
                <span>User Name</span>
                <span>{fullName}</span>
              </div>
              <hr />
              <div className="work-progress">
                <span>Email</span>
                <Link to="..">{email}</Link>
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
                  {EditAccount.length === 0 ? (
                    <span>0.00</span>
                  ) : (
                    <span>{EditAccount[0].wallet}</span>
                  )}
                </span>
              </div>
              <br />
              <div className="work-progress">
                <span>Withdrawable Balance</span>
                <span>
                  ${" "}
                  {EditAccount.length === 0 ? (
                    <span>0.00</span>
                  ) : (
                    <span>{EditAccount[0].withdrawable}</span>
                  )}
                </span>
              </div>
              <br />
              <div className="work-progress">
                <span>Total ROI</span>
                <span>
                  ${" "}
                  {EditAccount.length === 0 ? (
                    <span>0.00</span>
                  ) : (
                    <span>{EditAccount[0].interest}</span>
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
              <div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6">
                      <h3 style={{ marginBottom: "10px" }}>Front View</h3>

                      <div className="photo">
                        {frontView === "no-photo.jpg" ? (
                          ""
                        ) : (
                          <img
                            src={frontView}
                            alt="front"
                            style={{ width: "60%" }}
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <h3 style={{ marginBottom: "10px" }}>Back View</h3>
                      <div className="photo">
                        {frontView === "no-photo.jpg" ? (
                          ""
                        ) : (
                          <img
                            src={backView}
                            alt="back"
                            style={{ width: "60%" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <hr />
                    <div className="work-progress">
                      <span>ID Number</span>
                      <span>{id}</span>
                    </div>
                    <hr />
                  </div>
                  <div className="col-sm-12">
                    <div className="work-progress">
                      <span>Expiry Date</span>
                      <span>{dateIssued}</span>
                    </div>
                    <hr />
                  </div>
                  <div className="col-sm-12">
                    <div className="work-progress">
                      <span>Identity</span>
                      <span>{identificationCard}</span>
                    </div>
                    <hr />
                  </div>

                  <div className="col-sm-12">
                    <div className="checkbox">
                      <input
                        id="checkbox5"
                        type="checkbox"
                        checked={status}
                        onClick={handleSubmit}
                        onChange={() => setStatus(!status)}
                        style={{ width: "20px", height: "20px" }}
                      />
                      <label
                        htmlFor="checkbox5"
                        style={{ marginBottom: "0rem", marginLeft: "4px" }}
                      >
                        Approve Payment
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link
                    to="/admin/dashboard/users-log"
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
                  <button
                    className="update"
                    style={{
                      borderRadius: 2,
                      border: "none",
                      color: "#fff",
                      backgroundColor: "#007bff",
                    }}
                    disabled
                  >{`${status ? "Approved" : "Not Approved"}`}</button>
                </div>
              </div>
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
