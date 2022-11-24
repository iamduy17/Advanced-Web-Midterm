import React, { useState } from "react";
import { useMutation } from 'react-query';
import axios from 'axios';
import Loader from "../../components/Loader/Loader";
import "./style.css";

function Register() {                            
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPass: ""
    });
    const [errorConfirmPassValidate, setErrorConfirmPassValidate] = useState({
        isErrorValidate: false,
        message: ""
    });
    const [passwordOpen, setPasswordOpen] = useState(true);
    const [isErrorAuth, setIsErrorAuth] = useState({
        isError: false,
        message: ""
    });
    const [isSuccess, setIsSuccess] = useState(false);
    console.log(isSuccess);

    const { isLoading, isError, error, mutate } = useMutation(          
        postDataRegister,
        {
            onSuccess: (res) => {    
                if (res.data.ReturnCode === 1) {
                    setUser({
                        username: "",
                        email: "",
                        password: "",
                        confirmPass: ""
                    });          
                    setIsSuccess(true);           
                } else {
                    handleErrorResponse(res.data.Message);
                }               
            },
            onError: (err) => {

            },
        }
    );

    async function postDataRegister() {
        return await axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/register', user);
    }

    function handleChange(event) {
        const { name, value } = event.target;

        if(name === "confirmPass" && value === ""){
            setErrorConfirmPassValidate({
                isErrorValidate: false,
                message: ""
            }); 
        }
   
        setUser(prevUser => {
          return {
            ...prevUser,
            [name]: value
          };
        });
    };

    function checkPassValidate(Password, ConfirmPass) {       
        if(ConfirmPass !== Password) {
            setErrorConfirmPassValidate({
                isErrorValidate: true,
                message: "Passwords do not match, please retype!"
            }); 
        } else {
            setErrorConfirmPassValidate({
                isErrorValidate: false,
                message: ""
            });   
        }     
    }    

    function submitUser(event) {
        event.preventDefault();
        checkPassValidate(user.password, user.confirmPass);
        if(!errorConfirmPassValidate.isErrorValidate) {
            mutate();
        }     
    };

    function checkDisable() {
        if(user.username.length === 0 || user.password.length === 0 || user.email.length === 0 || user.confirmPass.length === 0) {
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
        return <Loader></Loader>
    }

    if (isError) {
        handleErrorResponse(error.message);
    }

    return (
        <div className="register__container">
            {isErrorAuth.isError && <div className="alert alert-danger register__alert" role="alert">
                {isErrorAuth.message}
            </div>}
            {isSuccess && <div className="alert alert-success register__alert" role="alert">
                <h5>A verification link has been sent to your email account</h5>
                <hr />
                <div>Please click on the link that has been sent to your email account to verify your email!</div>
            </div>}
            <div className="register__form-container">
                <h3 className="register__heading">Create Account</h3>
                <form>
                    <div className="form-group">                           
                        <input type="text" name="username" id="username" className="form-control register__input-field" placeholder=" " value={user.username} onChange={handleChange}/>
                        <label htmlFor="username" className="register__label">Username</label>
                    </div>
                    <div className="form-group">                           
                        <input type="text" name="email" id="email" className="form-control register__input-field" placeholder=" " value={user.email} onChange={handleChange}/>
                        <label htmlFor="email" className="register__label">Email</label>
                    </div>
                    <div className="form-group">                            
                        <input type={passwordOpen ? "password" : "text"} name="password" id="password" className="form-control register__input-field" placeholder=" " value={user.password} onChange={handleChange}/>
                        <label htmlFor="password" className="register__label">Password</label>
                        <i className={passwordOpen ?"far fa-eye register__toggle-password" : "far fa-eye-slash register__toggle-password"} onClick={() => setPasswordOpen(!passwordOpen)}></i>                        
                    </div>
                    <div className={errorConfirmPassValidate.isErrorValidate ? "form-group mb-4" : "form-group"}>                            
                        <input type={passwordOpen ? "password" : "text"} name="confirmPass" id="confirm-password" className="form-control register__input-field" placeholder=" " value={user.confirmPass} onChange={handleChange}/>
                        <label htmlFor="confirm-password" className="register__label">Confirm Password</label>
                        <i className={passwordOpen ?"far fa-eye register__toggle-password" : "far fa-eye-slash register__toggle-password"} onClick={() => setPasswordOpen(!passwordOpen)}></i>
                        {errorConfirmPassValidate.isErrorValidate && <div className="register__errorMessage">{errorConfirmPassValidate.message}</div>}
                    </div>
                    <button type="submit" className="register__submit mt-2 mb-2" onClick={submitUser} disabled={checkDisable()}>Sign up</button>
                </form>
                <div className="row d-flex justify-content-center mt-2">
                    <p style={{margin: "0"}}>Have already an account?</p>
                    <a href="/login" style={{margin: "0 5px"}}>Login here!</a>                 
                </div>
            </div>
        </div>
    );
}

export default Register;