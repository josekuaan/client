import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { Link, Redirect } from "react-router-dom";
import isLoggedIn from "../../../helper";
import "../../style.css";

import { WalletContext } from "../../../pageContext";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const Login = () => {
  const history = useHistory();
  const { setCurrentUser } = useContext(WalletContext);
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const [rememberMe] = useState(rememberMeChecked);
  const [err, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const submitUser = async (userInfo) => {
    const data = {
      email: userInfo.email,
      password: userInfo.password,
    };
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    axios
      .post(
        "https://limitless-escarpment-58685.herokuapp.com/api/user/auth/login",
        data,
        config
      )
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          setCurrentUser([response.data.user]);
          window.localStorage.setItem("userId", response.data.user._id);
          window.localStorage.setItem("loggedIn", true);
          Cookies.set("token", response.data.token);

          if (
            response.data.user.role === "user" &&
            response.data.user.status === false
          ) {
            console.log(true);
            return history.push("/user/dashboard/user-credentials");
          }
          if (response.data.user.role === "admin") {
            return history.push("/admin/dashboard");
          } else if (response.data.user.role === "user") {
            return history.push("/user/dashboard");
          }
        } else if (!response.data.success) {
          setError(response.data.msg);
        } else if (rememberMe === true) {
          window.localStorage.setItem("rememberMe", response.data.user._id);
        } else {
          localStorage.removeItem("rememberMe");
        }

        if (isLoading) {
          setTimeout(() => {
            setLoading(!isLoading);
          }, 1000);
        }
      })
      .catch(function (error) {
        console.log();
        if (error.response === undefined) {
          setLoading(false);
          return setError(
            "Could not connect to the server, check your network"
          );
        } else {
          setError(error.response.data.msg);
        }
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/user/dashboard" />;
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                {err.length > 1 ? (
                  <div
                    className={err.length > 1 ? "login-message error " : "hide"}
                  >
                    {err}
                  </div>
                ) : (
                  ""
                )}
                <CCardBody>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .email("Email is invalid")
                        .required("Email is required"),
                      password: Yup.string()
                        .min(6, "Password must be at least 6 characters")
                        .required("Password is required"),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        let dataToSubmit = {
                          email: values.email,
                          password: values.password,
                        };
                        submitUser(dataToSubmit);
                      }, 3000);
                    }}
                  >
                    {(props) => {
                      const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                      } = props;
                      return (
                        <CForm onSubmit={handleSubmit}>
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="email"
                              placeholder="email"
                              autoComplete="email"
                              id="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onReset={handleReset}
                              className={
                                errors.email && touched.email
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                            {errors.email && touched.email && (
                              <div
                                className="input-feedback"
                                style={{ color: "red" }}
                              >
                                {errors.email}
                              </div>
                            )}
                          </CInputGroup>
                          <CInputGroup className="mb-4">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="password"
                              placeholder="Password"
                              autoComplete="current-password"
                              id="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onReset={handleReset}
                              className={
                                errors.password && touched.password
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                            {errors.password && touched.password && (
                              <div
                                className="input-feedback"
                                style={{ color: "red" }}
                              >
                                {errors.password}
                              </div>
                            )}
                          </CInputGroup>
                          <CRow>
                            <CCol xs="6">
                              <CButton
                                color="primary"
                                className="px-4"
                                type="submit"
                                onClick={() => setLoading(!isLoading)}
                              >
                                {isLoading ? "Loading" : "Login"}
                              </CButton>
                              <br />
                              <Link to="/forggotten-password" className="px-0">
                                Forgot password?
                              </Link>
                            </CCol>
                            <CCol xs="6" className="text-right">
                              <Link to="/register" className="px-0">
                                Create account
                              </Link>
                            </CCol>
                          </CRow>
                        </CForm>
                      );
                    }}
                  </Formik>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
