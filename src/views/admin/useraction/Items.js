import React, { useContext, useState } from "react";
import * as moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import { WalletContext } from "../../../pageContext";

export default function Items() {
  const { userAction, setUserAction } = useContext(WalletContext);
  const token = Cookies.get("token");
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${token}`,
    },
  };
  const handleDelete = (id) => async () => {
    console.log(id);
    axios({
      method: "delete",
      url: `https://limitless-escarpment-58685.herokuapp.com/api/investment/delete-user-investment/${id}`,
      headers: config.headers,
    })
      .then((response) => {
        if (response.data.success) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const approveHandler = (id) => async () => {
    const action = userAction.filter((i) => i._id == id);

    console.log(action);
    const data = { status: !action[0].status };

    axios({
      method: "put",
      url: `https://limitless-escarpment-58685.herokuapp.com/api/investment/update-user-account/${id}`,
      data,
      headers: config.headers,
    })
      .then((response) => {
        if (response.data.success) {
          axios(
            `https://limitless-escarpment-58685.herokuapp.com/api/investment/users-investment`,
            {
              method: "get",
              data,
              headers: config.headers,
            }
          )
            .then((response) => {
              if (response.data.success) {
                setUserAction(response.data.invest);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {userAction.map((lo, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{lo.txn_id}</td>
          <td>{`${lo.name}`}</td>
          <td>{`${lo.email}`}</td>
          <td>{`${lo.method}`}</td>
          <td>{`${lo.amount}`}</td>
          <td>{`${lo.type}`}</td>
          <td>{moment(`${lo.createdAt}`).format("DD/ MM /YYYY")}</td>
          <td style={{ padding:'0rem', }}>
            {/* {lo.status ? <td style={{color:'green'}}>Approve</td> : <td style={{color:'red'}}>Pending</td>} */}
            <tr>
              <td style={{border:'none'}}><Link
              to="#"
              rel="tooltip"
              title="delete user"
              onClick={handleDelete(lo._id)}
            >
              <i className="fa fa-close fill2"></i>
            </Link>
           </td>
           <td style={{border:'none'}}>
           <Link
              to={`/admin/dashboard/credit-user/${lo._id}`}
              rel="tooltip"
              title="edit user"
            >
              <i className="fill fa fa-pencil"></i>
            </Link>
           </td>
           <td style={{border:'none'}}>
            <Link
              to="#"
              rel="tooltip"
              onClick={approveHandler(lo._id)}
              title="Approved"
            >
              <i
                className={` ${lo.status ? " fill" : "fill2 "} fa fa-check`}
              ></i>
            </Link></td>
            </tr>
          </td>
        </tr>
      ))}
    </>
  );
}
