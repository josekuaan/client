import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { WalletContext } from "../../../pageContext";

import "../../style.css";
import Items from "./Items";

export default function Log() {
  const token = Cookies.get("token");
  const { setUserAction, userAction } = useContext(WalletContext);

  useEffect(async () => {
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
        `https://limitless-escarpment-58685.herokuapp.com/api/investment/users-investment`,
        config
      )
      .then(function (response) {
        if (response.data.success) {
          console.log(response.data);
          setUserAction(response.data.invest);
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
          {userAction.length === 0 ? (
            <div className=" table-responsive">
              <table
                className="table table-bordered"
                style={{ marginBottom: "0rem" }}
              >
                <tbody>
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      <p style={{ textAlign: "center" }}>
                        You Don't have any Transaction yet
                      </p>
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
                    <th>User Id</th>
                    <th>Full Name</th>
                    <th>Email </th>
                    <th>Method</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Date Created</th>
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
