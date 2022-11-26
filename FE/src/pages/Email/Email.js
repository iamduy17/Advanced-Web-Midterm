import React, { useState} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import emailSuccess from "../../assets/images/email-success.png";
import success from "../../assets/images/success.png";
import { API_URL } from "../../config";
import "./style.css";

const EmailVerifyStatusRender = {
	Not_Fetch: 0,
	Success: 1,
	Fail: 2
}

function Email() {
    const [validUrl, setValidUrl] = useState(EmailVerifyStatusRender.Not_Fetch);
    const param = useParams();

    useEffectOnce(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `${API_URL}auth/${param.id}/verify/${param.token}`;
				const {data} = await axios.get(url);
				if(data.ReturnCode === 1)
					setValidUrl(EmailVerifyStatusRender.Success);
				else
					setValidUrl(EmailVerifyStatusRender.Fail);
			} catch (error) {
				setValidUrl(EmailVerifyStatusRender.Fail);
			}
		};
		verifyEmailUrl();
	});

    return (
        <>
            { validUrl === EmailVerifyStatusRender.Not_Fetch ? 
			(<div className="email__container"></div>) 
			:				
			validUrl === EmailVerifyStatusRender.Success? (
				<div className="email__container">
					<div className="email__main-content">
						<h3 className="email__heading">Congratulations</h3>
						<img src={success} alt="Success" className="email__img-success"/>
						<img src={emailSuccess} alt="Email-Success" className="email__img-email-success"/>
						<p className="email__message1">
							Your account is verified successfully!
						</p>
						<p className="email__message2">Are you ready to join with us?</p>
						<Link to={"/login"}>
							<button className="btn btn-outline-success email___login">Login</button>
						</Link>
					</div>
				</div>
				) : (
				<div className="email__container">
					<h2 className="email__404">
						404
					</h2>
					<p className="email__404-des">
						Page not found!
					</p>
					<p className="email__404-des1">
					It appears that you have an invalid email verification URL T_T
					</p>
				</div>
			)}
			
        </>
    )
}

export default Email;