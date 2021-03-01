import React, { useContext, useEffect } from "react";
import { Link,Redirect } from "react-router-dom";
import * as moment from "moment";

import { WalletContext } from "../../../pageContext";
import axios from "axios";
import Cookies from "js-cookie";
import isLoggedIn from "../../../helper";
import "../../style.css";
import mini from "../../../assets/icons/mini-logo.png";

export default function Content() {
  const { payment, setPayment } = useContext(WalletContext);
  const userId = window.localStorage.getItem("userId");
  const token = Cookies.get("token");
  function printDiv(divName) {
    console.log(divName);
    var printContents = document.getElementById(divName).innerHTML;
    console.log(printContents);

    var originalContents = document.body.innerHTML;

    document.getElementById(divName).innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

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
        `https://limitless-escarpment-58685.herokuapp.com/api/investment/users-investment/${userId}`,
        config.headers
      )
      .then(function (response) {
        if (response.data.success) {
         
          setPayment(response.data.invest.reverse()[0]);
        }
      });
  };
  // if (!isLoggedIn) {
  //   return <Redirect to="/login" />;
  // }
  return (
    <div className="body-content">
      <center className="col-md-8" style={{ margin: "auto" }}>
        <div className="form-group payment">
          <input
            className="support-btn"
            onClick={() => printDiv("printDiv")}
            type="submit"
            value="Print Invoice"
          />
        </div>
        <div className="card" id="printDiv">
          <div className="card-header" style={{ textAlign: "center" }}>
            <div style={{ width: "60px", margin: "auto" }}>
              <img src={mini} alt="mini-logo" style={{ width: "100%" }} />
            </div>
            <h3 style={{ marginBottom: "0px" }}>Payment Details </h3>
            <small>TRX ID: {payment === undefined ? "" : payment.txn_id}</small>
          </div>
          <div className="card-content">
            <div className="card-item">
              <div>INVOICED FROM</div>
              <div>INVOICED TO</div>
            </div>
            <div className="card-item">
              <div>
                <strong>My name</strong>
              </div>
              <div>{payment === undefined ? "" : payment.name}</div>
            </div>
            <div className="card-item">
              <div>
                <strong>My email</strong>
              </div>
              <div>{payment === undefined ? "" : payment.email}</div>
            </div>
            <div className="card-item">
              <div>PAYMENT GATEWAY</div>
              <div>
                {" "}
                <strong>Due Date</strong>
              </div>
            </div>
            <div className="card-item">
              <div>{payment === undefined ? "" : payment.method}</div>
              <div>
                {moment(
                  `${payment === undefined ? "" : payment.createdAt}`
                ).format("DD/ MM /YYYY")}
              </div>
            </div>

            <div className="card-item">
              <div>
                <strong>Description</strong>
              </div>
              <div>
                <strong>Cost</strong>
              </div>
            </div>
            <hr />
            <div className="card-item">
              <div>Deposit Amount</div>
              <div>
                <strong>${payment === undefined ? "" : payment.amount}</strong>
              </div>
            </div>
            <hr />
            <div className="card-item">
              <div>Gateway Charge</div>
              <div>
                <strong>$ 0.0</strong>
              </div>
            </div>
            <hr />
            <div className="card-item">
              <div>Total amount due</div>
              <div>
                <strong>${payment === undefined ? "" : payment.amount}</strong>
              </div>
            </div>
            <hr />
            <div className="card-item">
              <div>Total BTC</div>
              <div>
                <strong>
                  {payment === undefined ? "" : payment.bitCoinValue}
                </strong>
              </div>
            </div>
            <br />
            <br />
            <hr />
            <div className="card-item row">
              <div className="col-md-6">
                <strong>Use This For Bank Transfer</strong>
              </div>
              <div className="col-md-6 bank-details">
                <div>
                  <strong>Acct No 12345678901</strong>
                </div>
                <div>
                  <strong>Name </strong>
                  <span>
                    <strong>Ukachukwu ifeanyi</strong>
                  </span>
                </div>
                <div  >
                  <strong>
                    Bank <span>GTB Bank</span>
                  </strong>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="">
              <div>
                <strong>Use This For Bitcoin Transfer</strong>
              </div>
              <center>
                <img
                  src="https://chart.googleapis.com/chart?chs=300x300&amp;cht=qr&amp;chl=1Bz2Soj77wZnvnyKuP8bGExQLPdKTLa2yX&amp;choe=UTF-8\"
                  alt="bar-code"
                />
              </center>
              <center>
                {" "}
                Please make a payment of{" "}
                <Link to="#" className="text-danger">
                  BTC
                </Link>{" "}
                to{" "}
                <Link to="#" className="text-danger">
                  1Bz2Soj77wZnvnyKuP8bGExQLPdKTLa2yX
                </Link>
                <br /> Your deposit will be confirmed once verified.
              </center>
              <div className="form-group btn-payment">
                <Link to="/user/dashboard/user-log" className="support-btn">
                  Visit Log
                </Link>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* end card */}
      </center>
    </div>
  );
}
