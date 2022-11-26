import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import google from "../../assets/images/google.png";
import { API_URL } from "../../config";
import "./style.css";

function Login() {
    const navigate = useNavigate();    
    const [passwordOpen, setPasswordOpen] = useState(true);
    const [isErrorAuth, setIsErrorAuth] = useState({
        isError: false,
        message: ""
    });                         
    
    let user = {};
    const { register, handleSubmit } = useForm();               
    const onSubmit = data => {   
        user = data;
        mutate();       
    };

    const { isLoading, isError, error, mutate } = useMutation(          
        postDataLogin,
        {
            onSuccess: (res) => {    
                if (res.data.ReturnCode === 1) {   
                    localStorage.setItem("token", res.data.User.token);    
                    localStorage.setItem("provider", res.data.User.provider); 
                    //window.open("/", "_self");
                    
                    console.log(1);
                    navigate("/");
                    window.location.reload();                           
                } else {
                    console.log(res.data.Message);
                    handleErrorResponse(res.data.Message);
                }               
            },
            onError: (err) => {
                
            },
        }
    );

    async function postDataLogin() {
        return await axios.post(API_URL + 'auth/login', user);
    }

    function handleSignInGoogle() {
        window.open(API_URL + 'auth/google', "_self");
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
        <div className="login__container">
            {isErrorAuth.isError && <div className="alert alert-danger login__alert" role="alert">
                {isErrorAuth.message}
            </div>}
            <div className="login__form-container">
                <h3 className="login__heading">Login Now</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">                           
                        <input type="text" name="email" id="email" className="form-control login__input-field" placeholder=" " {...register("email")} autoComplete="off"/>
                        <label htmlFor="email" className="login__label">Email</label>
                    </div>
                    <div className="form-group">                            
                        <input type={passwordOpen ? "password" : "text"} name="password" id="password" className="form-control login__input-field" placeholder=" " {...register("password")}/>
                        <label htmlFor="password" className="login__label">Password</label>
                        <i className={passwordOpen ?"far fa-eye login__toggle-password" : "far fa-eye-slash login__toggle-password"} onClick={() => setPasswordOpen(!passwordOpen)}></i>                        
                    </div>
                        
                    <button type="submit" className="login__submit mb-2">Sign in</button>
                </form>

                <div className="login__line-border">
                    <hr className="login__line" />
                    <div className="login__text-or">or</div>
                </div>

                <div className="login__google mt-2">
                    <button className="login__google-btn btn btn-outline-danger" onClick={handleSignInGoogle}>
                        <img src={google} alt="Google" className="login__google-img"></img>
                        <div className="login__google-text">Sign in with Google</div>
                    </button>
                </div>

                <div className="row d-flex justify-content-center mt-5">
                    <p>New member? <a href="/register"> Create Account!</a></p>                 
                </div> 
            </div>
        </div>
    );
}

export default Login;