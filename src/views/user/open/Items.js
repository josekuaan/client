import React, { useContext } from "react";
import * as moment from "moment";

import { WalletContext } from "../../../pageContext";

export default function Items() {
  const { catLog } = useContext(WalletContext);

  return (
    <>
      {catLog.map((lo, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{lo.txn_id}</td>
          <td>{`${lo.method}`}</td>
          <td>{`$${lo.amount}`}</td>
          <td>{`$${lo.amount}`}</td>
          <td>{`${lo.type}`}</td>
          <td>{moment(`${lo.createdAt}`).format("DD/ MM /YYYY")}</td>
          {lo.status ? (
            <td style={{ color: "green" }}>Approve</td>
          ) : (
            <td style={{ color: "red" }}>Pending</td>
          )}
        </tr>
      ))}
    </>
  );
}
