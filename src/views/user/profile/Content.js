import React, { useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert";
import { WalletContext } from "../../../pageContext";

import "../../style.css";

export default function Content() {
  const { currentuser } = useContext(WalletContext);

  const [ID, setId] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [response, setResponse] = useState(false);
  const [err, setErr] = useState("");
  const [text, setText] = useState("Update account");

  const handleChangeFront = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setFront(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const handleChangeBack = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setBack(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setText("Updatting...");
    const formData = new FormData();
    formData.append("photo", front);
    formData.append("photo", back);
    formData.append("text", JSON.stringify({ ID, number, dob }));

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
      method: "put",
      url: `https://limitless-escarpment-58685.herokuapp.com/api/user/auth/photo/${userId}`,
      data: formData,
      headers: config.headers,
    })
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          setResponse(true);
          Swal({
            title: "Good job!",
            text: "Congrats! Your profile is 100%.",
            icon: "success",
            button: "Ok",
          });
          // setText('Update account')
          setTimeout(() => {
            setResponse(false);
            setText("Update account");
          }, 5000);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
        setResponse(false);
        setErr(error.response.data.msg);
        setTimeout(() => {
          setErr("");
          setResponse(false);
          setText("Update account");
        }, 5000);
      });
  };
  console.log(currentuser);
  return (
    <div className="body-content">
      {err.length > 1 ? (
        <div className={err.length > 1 ? "message error " : "hide"}>{err}</div>
      ) : (
        ""
      )}
      {response === true ? (
        <div className={response === true ? " success message" : "hide"}>
          Congratulations! you can now make a deposit
        </div>
      ) : (
        ""
      )}
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>
                Dear{" "}
                {currentuser[0] === undefined ? "" : currentuser[0].userName}
              </h4>
              {currentuser[0] === undefined ? (
                ""
              ) : (
                <div style={{ marginTop: "27px" }}>
                  {currentuser[0].status === false ? (
                    <div
                      style={{
                        backgroundColor: "red",
                        color: "#fff",
                        padding: "5px",
                        borderRadius: "4px",
                      }}
                    >
                      Pending
                    </div>
                  ) : (
                    <div
                      style={{
                        backgroundColor: "green",
                        color: "#fff",
                        padding: "5px",
                        borderRadius: "4px",
                      }}
                    >
                      Approved
                    </div>
                  )}
                </div>
              )}
            </div>

            <h4 className="card-title" style={{ color: "red" }}>
              *You must upload a Valid id befor you can be approved*
            </h4>
          </div>
          <br />
          <div className="card-content">
            <form onSubmit={handleSubmit} className="form-horizontal">
              <div className="col-sm-12">
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-sm-4">
                    <div style={{ marginBottom: "10px" }}>
                      Select Identification Type
                    </div>
                    <div className="input-group" style={{ width: "100%" }}>
                      <select
                        className="form-control"
                        onChange={(e) => setId(e.currentTarget.value)}
                        required
                      >
                        <option> Select Type</option>
                        <option value="National ID Card">
                          National ID Card
                        </option>
                        <option value="International Passport">
                          International Passport
                        </option>
                        <option value="Drivers License">Drivers License</option>
                      </select>
                      <span className="input-group-addon"></span>
                    </div>
                  </div>
                  {/* <div style={{marginBottom:"10px"}}>ID Number</div> */}
                  <div className="col-sm-4">
                    <div style={{ marginBottom: "10px" }}>ID Number</div>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter ID Number"
                        onChange={(e) => setNumber(e.target.value)}
                        required
                      />
                      <span className="input-group-addon"></span>
                    </div>
                  </div>
                </div>
                {/* <div style={{marginBottom:"10px"}}>Expire Date</div> */}
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-sm-4">
                    <div style={{ marginBottom: "10px" }}>Expire Date</div>
                    <div className="input-group">
                      <input
                        type="date"
                        className="form-control"
                        onChange={(e) => setDob(e.target.value)}
                        required
                      />
                      <span className="input-group-addon"></span>
                    </div>
                  </div>
                  {/* <div style={{marginBottom:"10px"}}>Front View</div> */}
                  <div className="col-sm-4">
                    <div style={{ marginBottom: "10px" }}>Front View</div>
                    <div className="input-group">
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleChangeFront}
                      />
                      <span className="input-group-addon"></span>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: "10px" }}>Back View</div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-sm-4">
                    <div className="input-group">
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleChangeBack}
                      />
                      <span className="input-group-addon"></span>
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  className="btn btn-info btn-fill btn-wd"
                  style={{ marginBottom: "10px" }}
                  value={text}
                />
              </div>
            </form>
          </div>
        </div>{" "}
        {/* end card */}
      </div>
    </div>
  );
}
