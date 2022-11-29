import React, { useEffect, useState } from "react";
import Classes from "../../components/Classes/Classes";
import Navbar from "../../components/Navbar/Navbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './styles.css';

function Dashboard({ classes }) {
    
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
            
        </>
    )
}

export default Dashboard;