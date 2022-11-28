import React, { useEffect, useState } from "react";
import Classes from "../../components/Classes/Classes";
import Navbar from "../../components/Navbar/Navbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GoogleLogout } from 'react-google-login';
import './styles.css';

function Dashboard({ classes }) {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("provider")?.toString() === 'google') {
            setIsGoogleSignIn(true);
        } else {
            setIsGoogleSignIn(false);
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem("token");    
        localStorage.removeItem("provider");
        setIsGoogleSignIn(false);    
        window.location.reload();
    }
    return (
        <>
            <Navbar></Navbar>
            <Row>
            {classes.map((item, index)=>{
                return <Col key={index}>
                        <Classes classData={item} md="auto"></Classes>
                    </Col>
                
            })}
            </Row>
            {isGoogleSignIn ? 
            <GoogleLogout clientId={clientId} onLogoutSuccess={logOut} 
                render={renderProps => (
                        <button onClick={renderProps.onClick}>Logout</button>
                    )}
            /> 
            : 
            <button onClick={logOut}>Logout</button>}
        </>
    )
}

export default Dashboard;