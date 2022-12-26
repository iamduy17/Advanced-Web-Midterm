import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { API_URL } from "../../config";
import reset from "../../assets/images/reset-password.png";
import "./style.css";
import { hexDecode } from "../../utils";

const ForgotPass = () => {
  let { email } = useParams();
  email = hexDecode(email);
  const [passwordOpen, setPasswordOpen] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isErrorAuth, setIsErrorAuth] = useState({
    isError: false,
    message: ""
  });
  const [errorConfirmPassValidate, setErrorConfirmPassValidate] = useState({
    isErrorValidate: false,
    message: ""
  });
  const [passwordReset, setPasswordReset] = useState({
    password: "",
    confirmPass: ""
  });

  const { isLoading, isError, error, mutate } = useMutation(postDataLogin, {
    onSuccess: (res) => {
      if (res.data.ReturnCode === 1) {
        setIsSuccess(true);
      } else {
        handleErrorResponse(res.data.Message);
      }
    },
    onError: () => {}
  });

  async function postDataLogin() {
    return await axios.post(`${API_URL}auth/resetpass`, {
      passwordReset,
      email
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "confirmPass" && value === "") {
      setErrorConfirmPassValidate({
        isErrorValidate: false,
        message: ""
      });
    }

    setPasswordReset((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }

  function checkPassValidate(Password, ConfirmPass) {
    if (ConfirmPass !== Password) {
      setErrorConfirmPassValidate({
        isErrorValidate: true,
        message: "Passwords do not match, please retype!"
      });
      return true;
    }
    setErrorConfirmPassValidate({
      isErrorValidate: false,
      message: ""
    });

    return false;
  }

  function submitPassword(event) {
    event.preventDefault();
    const checkTrue = checkPassValidate(
      passwordReset.password,
      passwordReset.confirmPass
    );
    if (!checkTrue) {
      mutate();
    }
  }

  function checkDisable() {
    if (
      passwordReset.password.length === 0 ||
      passwordReset.confirmPass.length === 0
    ) {
      return true;
    }

    return "";
  }

  function handleErrorResponse(error) {
    setIsErrorAuth({
      isError: true,
      message: error
    });

    setTimeout(() => {
      setIsErrorAuth({
        isError: false,
        message: ""
      });
    }, 5000);
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    handleErrorResponse(error.message);
  }

  return isSuccess ? (
    <div className="login__container">
      <div className="forgot__content-container">
        <img src={reset} alt="Success" className="email__img-email-success" />
        <p className="email__message1">Your password is reset successfully!</p>
        <Link to="/login" className="forgot__link">
          <button className="login__submit email___login">Login Again</button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="login__container">
      <div className="login__form-container" style={{ height: "60%" }}>
        {isErrorAuth.isError && (
          <div className="alert alert-danger login__alert" role="alert">
            {isErrorAuth.message}
          </div>
        )}
        <h3 className="login__heading">Reset Password</h3>
        <form className="login__form">
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="email"
              className="form-control login__input-field"
              placeholder=" "
              value={email}
              readOnly
            />
            <label htmlFor="email" className="login__label">
              Email
            </label>
          </div>
          <div className="form-group">
            <input
              type={passwordOpen ? "password" : "text"}
              name="password"
              id="password"
              className="form-control login__input-field"
              placeholder=" "
              value={passwordReset.password}
              onChange={handleChange}
            />
            <label htmlFor="password" className="login__label">
              New Password
            </label>
            <i
              className={
                passwordOpen
                  ? "far fa-eye login__toggle-password"
                  : "far fa-eye-slash login__toggle-password"
              }
              onClick={() => setPasswordOpen(!passwordOpen)}
            />
          </div>
          <div
            className={
              errorConfirmPassValidate.isErrorValidate
                ? "form-group mb-4"
                : "form-group"
            }
          >
            <input
              type={passwordOpen ? "password" : "text"}
              name="confirmPass"
              id="confirm-password"
              className="form-control register__input-field"
              placeholder=" "
              value={passwordReset.confirmPass}
              onChange={handleChange}
            />
            <label htmlFor="confirm-password" className="register__label">
              Confirm Password
            </label>
            <i
              className={
                passwordOpen
                  ? "far fa-eye register__toggle-password"
                  : "far fa-eye-slash register__toggle-password"
              }
              onClick={() => setPasswordOpen(!passwordOpen)}
            />
            {errorConfirmPassValidate.isErrorValidate && (
              <div className="register__errorMessage">
                {errorConfirmPassValidate.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="login__submit mb-2"
            onClick={submitPassword}
            disabled={checkDisable()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
