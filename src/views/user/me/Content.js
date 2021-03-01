import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import * as moment from "moment";
import { WalletContext } from "../../../pageContext";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert";

import "../../style.css";

export default function Content() {
  const token = Cookies.get("token");
  const { setEditAccount,EditAccount } = useContext(WalletContext);
  const [picture, setProfilePic] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [number, setNumber] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [state, setStat] = useState("");
  const [postal, setPostal] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [buttonAction, setButton] = useState(false);
  const [text, setText] = useState("Update account");

  useEffect(() => {
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
        // handle success
        setFullName(response.data.msg.fullName);
        setEmail(response.data.msg.email);
        // setOccupation()
        setNumber(response.data.msg.number);
        setLine1(response.data.msg.line1);
        // setLine2(response.data.msg.line2)
        setStat(response.data.msg.state);
        setDate(response.data.msg.createdAt);
        // setPostal()
        setCity(response.data.msg.city);
        setProfilePic(response.data.msg.picture);

        axios
          .get(
            `https://limitless-escarpment-58685.herokuapp.com/api/investment/single-users-investment/${response.data.msg._id}`
          )
          .then(function (response) {
            if (response.data.success) {
              setEditAccount(response.data.invest);
            }
          });
      })

      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = window.localStorage.getItem("userId");
    setText("Updatting...");
    const formData = new FormData();
    formData.append("photo", picture);
    formData.append(
      "text",
      JSON.stringify({
        fullName,
        email,
        occupation,
        number,
        line1,
        line2,
        postal,
        city,
        state,
      })
    );
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(
        `https://limitless-escarpment-58685.herokuapp.com/api/user/auth/update-account/${userId}`,
        formData,
        config
      )
      .then(function (response) {
        if (response.data.success) {
          Swal({
            title: "Good job!",
            text: "Congrats! Your profile is 100%.",
            icon: "success",
            button: "Ok",
          });
          setProfilePic(response.data.result.picture);
          setButton(!buttonAction);
          setText("Update Profile");
        }
      });
  };
console.log(EditAccount)
  return (
    <div className="body-content">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <div className="work-progress">
                <span>Phone</span>
                <span>{number}</span>
              </div>
              <hr />
              <div className="work-progress">
                <span>Joined</span>
                <span>{moment(date).format("MM/DD/YYYY")}</span>
              </div>
              <hr />
              <div className="work-progress">
                <span>Email</span>

                <Link to="..">{email}</Link>
              </div>
              <br />
            </div>
          </div>
          <div className="card" style={{ marginTop: "25px" }}>
            <h5 style={{ padding: "20px 10px 0px" }}>Work Progress</h5>
            <hr />
            <div className="card-header">
              <div className="work-progress">
                <span>Main Balance</span>
                {EditAccount === undefined || EditAccount.length === 0 ? <span>$0.00</span>: <span>${EditAccount[0].amount}</span>}
              </div>
              <br />
              <div className="work-progress">
                <span>Withdrawal Balance</span>
                {EditAccount === undefined || EditAccount.length === 0 ? <span>$0.00</span>: <span>${EditAccount[0].withdrawable}</span>}
              </div>
              <br />
              <div className="work-progress">
                <span>Total ROI</span>
                {EditAccount === undefined || EditAccount.length === 0 ? <span>$0.00</span>:<span>${EditAccount[0].interest}</span> }
              </div>
              <br />
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link
                  to="/user/dashboard/user-credentials"
                  style={{
                    backgroundColor: "#061627",
                    color: "#fff",
                    padding: "10px",
                  }}
                >
                  Update Credentials
                </Link>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {picture === "no-photo.jpg" || picture === " " ? (
                    <div className="user-profile">
                      <i
                        className="fa fa-user"
                        
                      ></i>
                    </div>
                  ) : (
                    <div className="user-profile">
                      <img
                        src={picture}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-content">
              <form onSubmit={handleSubmit} className="form-horizontal">
                <div className="">
                  <div className="col-sm-12">
                    <div className="group">
                      <input
                        type="file"
                        className="form-control cover"
                        style={{ backgroundColor: "#061627", color: "#fff" }}
                        onChange={handleChange}
                      />
                      <i className="fa fa-upload"></i>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12" style={{ padding: "20px" }}>
                  <div className="row" style={{ marginBottom: "10px" }}>
                    <div className="col-sm-6">
                      <div style={{ marginBottom: "10px" }}>Full Name</div>
                      <div className="input-group" style={{ width: "100%" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={fullName}
                          placeholder="Enter Full Name"
                          onChange={(e) => setFullName(e.target.value)}
                        />
                        <span className="input-group-addon"></span>
                      </div>
                    </div>
                    {/* <div style={{marginBottom:"10px"}}>ID Number</div> */}
                    <div className="col-sm-6">
                      <div style={{ marginBottom: "10px" }}>Email</div>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={email}
                          placeholder="Enter Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="input-group-addon"></span>
                      </div>
                    </div>
                  </div>
                  {/* <div style={{marginBottom:"10px"}}>Expire Date</div> */}
                  <div className="row" style={{ marginBottom: "10px" }}>
                    <div className="col-sm-6">
                      <div style={{ marginBottom: "10px" }}>Occupation</div>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={occupation}
                          placeholder="Occupation"
                          onChange={(e) => setOccupation(e.target.value)}
                        />
                        <span className="input-group-addon"></span>
                      </div>
                    </div>
                    {/* <div style={{marginBottom:"10px"}}>Front View</div> */}
                    <div className="col-sm-6">
                      <div style={{ marginBottom: "10px" }}>Mobile Number</div>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={number}
                          placeholder="Enter Phone Number"
                          onChange={(e) => setNumber(e.target.value)}
                        />
                        <span className="input-group-addon"></span>
                      </div>
                    </div>
                  </div>

                  <div className="row" style={{ marginBottom: "10px" }}>
                    <div className="col-sm-6">
                      <div style={{ marginBottom: "10px" }}>Address 1</div>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={line1}
                          onChange={(e) => setLine1(e.target.value)}
                        />
                        <span className="input-group-addon"></span>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div style={{ marginBottom: "10px" }}>Address 2</div>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={line2}
                          onChange={(e) => setLine2(e.target.value)}
                          placeholder="Line 1"
                        />
                        <span className="input-group-addon"></span>
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ marginBottom: "10px" }}>
                    <div className="col-sm-4">
                      <div style={{ marginBottom: "10px" }}>City</div>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                        />
                        <span className="input-group-addon"></span>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div style={{ marginBottom: "10px" }}>State</div>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={state}
                          onChange={(e) => setStat(e.target.value)}
                          placeholder="State"
                        />
                        <span className="input-group-addon"></span>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div style={{ marginBottom: "10px" }}>Postal Code</div>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={postal}
                          onChange={(e) => setPostal(e.target.value)}
                        />
                        <span className="input-group-addon"></span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <Link
                      to="/user/dashboard"
                      type="submit"
                      style={{
                        borderRadius: 2,
                        color: "#fff",
                        backgroundColor: "#dc3545",
                      }}
                      className="cancel"
                    >
                      Cancel Edit
                    </Link>
                    <input
                      type="submit"
                      className="update"
                      style={{
                        borderRadius: 2,
                        border: "none",
                        color: "#fff",
                        backgroundColor: "#007bff",
                      }}
                      value="Update Profile"
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
