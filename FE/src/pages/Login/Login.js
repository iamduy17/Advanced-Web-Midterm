import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import { API_URL } from "../../config";
import GoogleButton from "../../components/GoogleButton/GoogleButton";
import "./style.css";

function Login() {
  const [lgShow, setLgShow] = useState(false);
  const [usernameForgot, setUsernameForgot] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(true);
  const [isErrorAuth, setIsErrorAuth] = useState({
    isError: false,
    message: ""
  });

  let user = {};
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    user = data;
    mutate();
  };

  const { isLoading, isError, error, mutate } = useMutation(postDataLogin, {
    onSuccess: (res) => {
      if (res.data.ReturnCode === 1) {
        localStorage.setItem("token", res.data.User.token);
        localStorage.setItem("provider", res.data.User.provider);
        window.location.reload();
      } else {
        handleErrorResponse(res.data.Message);
      }
    },
    onError: () => {}
  });

  async function postDataLogin() {
    return await axios.post(`${API_URL}auth/login`, user);
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

  const handleChange = (e) => {
    if (e.target.value != "") {
      setUsernameForgot(e.target.value);
    }
  };

  const handleClose = () => setLgShow(false);

  const handleForgotPass = async () => {
    const token = localStorage.getItem("token");

    const result = await axios.post(
      `${API_URL}auth/forgotpass`,
      { usernameForgot },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (result.data.ReturnCode === 1) {
      setLgShow(false);
      setUsernameForgot("");
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
      setLgShow(false);
      handleErrorResponse(result.data.Message);
    }
  };

  return (
    <div className="login__container">
      {isErrorAuth.isError && (
        <div className="alert alert-danger login__alert" role="alert">
          {isErrorAuth.message}
        </div>
      )}
      {isSuccess && (
        <div className="alert alert-success register__alert" role="alert">
          <h5>A reset password link has been sent to your email account</h5>
          <hr />
          <div>
            Please click on the button link that has been sent to your email
            account to create new password!
          </div>
        </div>
      )}
      <div className="login__form-container">
        <h3 className="login__heading">Login Now</h3>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="email"
              className="form-control login__input-field"
              placeholder=" "
              {...register("email")}
              autoComplete="off"
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
              {...register("password")}
            />
            <label htmlFor="password" className="login__label">
              Password
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
          <p className="login__forgot-text" onClick={() => setLgShow(true)}>
            Forgot Password?
          </p>
          <button type="submit" className="login__submit mb-2">
            Sign in
          </button>
        </form>

        <div className="login__line-border">
          <hr className="login__line" />
          <div className="login__text-or">or</div>
        </div>

        <div className="login__google mt-2">
          <GoogleButton setIsErrorAuth={setIsErrorAuth} />
        </div>

        <div className="row d-flex justify-content-center mt-5">
          <p>
            New member?
            <a href="/register"> Create Account!</a>
          </p>
        </div>
      </div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="forgot-password"
      >
        <Modal.Header>
          <Modal.Title id="forgot-password">Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="login__form">
            <input
              className="form-control"
              type="text"
              name="username"
              value={usernameForgot}
              onChange={handleChange}
              placeholder="Enter your email account"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" id="btn-save" onClick={handleForgotPass}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
