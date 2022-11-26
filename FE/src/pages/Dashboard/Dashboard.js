import React from "react";
import Classes from "../../components/Classes/Classes";
import Navbar from "../../components/Navbar/Navbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles.css';

function Dashboard({ classes }) {
    return (
        <>
            <Navbar></Navbar>
            <Row className="justify-content-md-center">
            {classes.map((item)=>{
                return <Col>
                        <Classes classData={item} md="auto"></Classes>
                    </Col>
                
            })}
            </Row>
            <button onClick={logOut}>Logout</button>
            
        </>
    )
}

export default Dashboard;