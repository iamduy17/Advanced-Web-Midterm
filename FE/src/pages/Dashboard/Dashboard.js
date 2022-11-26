import React from "react";
import Classes from "../../components/Classes/Classes";
import Navbar from "../../components/Navbar/Navbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles.css';

function Dashboard({ classes }) {
    const logOut = (event) => {
        event.preventDefault();

        localStorage.removeItem("token");    
        localStorage.removeItem("provider"); 
        // const {data} = await axios.get(`${API_URL}auth/logout`);
        // if(data.ReturnCode === 1)       
        window.location.assign("/login");
    }
    return (
        <>
            <Navbar></Navbar>
            <Row className="justify-content-md-center">
            {classes.map((item, index)=>{
                return <Col key={index}>
                        <Classes classData={item} md="auto"></Classes>
                    </Col>
                
            })}
            </Row>
            <button onClick={logOut}>Logout</button>
        </>
    )
}

export default Dashboard;