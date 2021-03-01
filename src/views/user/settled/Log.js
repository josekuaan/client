import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { WalletContext } from "../../../pageContext";
import Items from "./Items";

export default function Log() {
  const { setSettled, settled } = useContext(WalletContext);
  const token = Cookies.get("token");
  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    fetchData();
  }, []);
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    axios
      .get(
        `https://limitless-escarpment-58685.herokuapp.com/api/investment/settled-users-investment/${userId}`,
        config
      )
      .then(function (response) {
        if (response.success) {
          setSettled(response.data.invest)
        }
      });
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Bordered Table</h3>
          </div>
          {/* /.card-header */}
          {settled.length === 0 ? (
            <div className=" table-responsive">
              <table
                className="table table-bordered"
                style={{ marginBottom: "0rem" }}
              >
                <tbody style={{ textAlign: "center" }}>
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      <p>You Don't have any Transaction yet</p>
                      <Link to="/deposit">Found Account</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className=" table-responsive">
              <table
                className="table table-bordered"
                style={{ marginBottom: "0rem" }}
              >
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Transaction Id</th>
                    <th>Method</th>
                    <th>Founded Amount</th>
                    <th>Amout</th>
                    <th>Type</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <Items />
                </tbody>
              </table>
            </div>
          )}
          <div className="card-footer clearfix">
            <ul className="pagination pagination-sm m-0 float-right">
              <li className="page-item">
                <Link className="page-link" to="#">
                  «
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  »
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* /.col */}
    </div>
  );
}
