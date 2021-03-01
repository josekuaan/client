import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert";
import "../../style.css";

import { WalletContext } from "../../../pageContext";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CFade,
  CForm,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CInputRadio,
  CLabel,
  CSelect,
  CRow,
} from "@coreui/react";

const Deposit = () => {
  const [collapsed] = React.useState(true);
  const [showElements] = React.useState(true);
  let history = useHistory();

  const { catLog, setCatLog, setPayment } = useContext(WalletContext);
  const [method, setselectedOption] = useState("");
  const [amount, setAountInvested] = useState("000");
  const [type, setTransactType] = useState("");
  const [response, setResponse] = useState(null);
  const [err, setErr] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const onValueChange = (e) => {
    const { type, value } = e.target;

    if (e.target.value === "3") {
      console.log("ok");
      setselectedOption("Bitcoin");
    } else if (value === "4") {
      setselectedOption("Bank Transfer");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      method,
      amount,
      type,
      txn: uuidv4(),
    };

    if (
      data.method === undefined &&
      data.amount === undefined &&
      data.type === undefined
    ) {
      return setLoading(!isLoading);
    }
    const userId = window.localStorage.getItem("userId");
    const token = Cookies.get("token");
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log('okkkk',data)
    axios({
      method: "post",
      url: `https://limitless-escarpment-58685.herokuapp.com/api/investment/create/${userId}`,
      data,
      headers: config.headers,
    }).then(function (response) {
      if (response.data.success) {
        setLoading(false);
        setCatLog([...catLog, response.data.invest]);
        setPayment(response.data.invest);
        Swal({
          title: "Good job!",
          text: "Congrats! Your deposit was successful.",
          icon: "success",
          button: "Ok",
        });
        setTimeout(() => {
          setResponse(null);
        }, 6000);
        return history.push("/user/dashboard/new-deposit-instant");
      } else {
        setResponse(false);
        setErr(response.data.msg);
        setTimeout(() => {
          setErr("");
          setLoading(false);
        }, 6000);
      }
    });
    if (isLoading) {
      setTimeout(() => {
        setLoading(!isLoading);
      }, 1000);
    }
  };

  return (
    <>
      <CRow>
        <CCol xs="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader><h3>Deposit Funds</h3></CCardHeader>
              <CCollapse show={collapsed} timeout={1000}>
                <CCardBody>
                  <CForm
                    className="form-horizontal deposit"
                    onSubmit={handleSubmit}
                  >
                    <CRow>
                      <CCol xs="12">
                        <CFormGroup>
                        <CLabel htmlFor="selectSm">Transaction Type</CLabel>
                          <CSelect
                            custom
                            size="md"
                            name="selectSm"
                            id="SelectLm"
                            onChange={(e) => setTransactType(e.target.value)}
                            required
                          >
                            <option value="">Please select</option>
                            <option value="deposit">Deposit</option>
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12">
                        <CFormGroup>
                          <CLabel htmlFor="ccnumber">Credit Card Number</CLabel>
                          <CInput
                            id="ccnumber"
                            placeholder="0000 0000 0000 0000"
                            required
                            min="100"
                            onChange={(e) => setAountInvested(e.target.value)}
                          />
                          {amount.length < 3 ? (
                            <div style={{ color: "red" }}>
                              Amount must not be less than $100
                            </div>
                          ) : (
                            ""
                          )}
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormGroup>
                        <CCol xs="12" style={{paddingTop:'15px'}}>
                          <CFormGroup variant="checkbox">
                            <CInputRadio
                              className="form-check-input"
                              id="radio1"
                              name="radios"
                              value={3}
                              onChange={onValueChange}
                              required
                            />
                            <CLabel variant="checkbox" htmlFor="radio1">
                              Bitcoin
                            </CLabel>
                          </CFormGroup>
                          <br />
                          <CFormGroup variant="checkbox">
                            <CInputRadio
                              className="form-check-input"
                              id="radio2"
                              name="radios"
                              value={4}
                              onChange={onValueChange}
                              required
                            />
                            <CLabel variant="checkbox" htmlFor="radio2">
                              Bank Transfer
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                      </CFormGroup>
                      <CCol xs="12">
                        <CFormGroup variant="custom-checkbox">
                          <CInputCheckbox
                            custom
                            id="inline-checkbox1"
                            name="inline-checkbox1"
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                            required
                          />
                          <CLabel
                            variant="custom-checkbox"
                            htmlFor="inline-checkbox1"
                          >
                            By clicking this box, i agree to the terms and
                            conditions guiding monetary deposits in my country
                          </CLabel>
                        </CFormGroup>
                      </CCol>

                      <CFormGroup style={{ marginTop: "20px" }}>
                        <CCol xs="12">
                          <div className="form-actions">
                            <CButton
                              type="submit"
                              color="primary"
                              onClick={() => setLoading(!isLoading)}
                            >
                              {isLoading ? "Loading" : "Submit"}
                            </CButton>
                          </div>
                        </CCol>
                      </CFormGroup>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default Deposit;
