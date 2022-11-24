import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import emailSuccess from "../../assets/images/email-success.png";
import success from "../../assets/images/success.png";
import "./style.css";

function Email() {
    const [validUrl, setValidUrl] = useState(true);
    const param = useParams();

    useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
                console.log(param.token);
				const url = `${process.env.REACT_APP_BACKEND_URL}auth/${param.id}/verify/${param.token}`;
				const {data} = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

    return (
        <>
            {validUrl ? (
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