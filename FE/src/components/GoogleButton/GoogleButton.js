import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';
import {API_URL, GOOGLE_ID} from "../../config/index"
import google from "../../assets/images/google.png";
import "./style.css";


const GoogleButton = ({setIsErrorAuth}) => {
    const clientId = GOOGLE_ID;

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId.toString(),
                scope: 'profile email'
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = async (res) => {
        const {data} = await axios.post(API_URL + 'auth/login/google', res.profileObj);
        if(data.ReturnCode === 1) {
            localStorage.setItem("token", data.User.token);    
            localStorage.setItem("provider", data.User.provider);
            window.location.reload();
        } else {
            setIsErrorAuth({
                isError: true,
                message: "Sign in with Google failed. Please sign in again!"
            })
        }
    };

    const onFailure = (err) => {
        setIsErrorAuth({
            isError: true,
            message: "err"
        })
    };

    return (
        <>
            <GoogleLogin
                    clientId={clientId}
                    render={renderProps => (
                        <button onClick={renderProps.onClick} className="login__google-btn btn btn-outline-danger" style={{color: "red"}}>                          
                            <img src={google} alt="Google" className="login__google-img"></img>
                            <div className="login__google-text">Sign in with Google</div>
                        </button>
                    )}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
        </>
    );
};

export default GoogleButton;