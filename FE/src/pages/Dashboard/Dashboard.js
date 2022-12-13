import React, { useEffect, useState } from "react";
import Classes from "../../components/Classes/Classes";
import Navbar from "../../components/Navbar/Navbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './styles.css';

function Dashboard({ classes }) {
    return (
        <div id="root-content">
            <Navbar></Navbar>
            <Row style={{margin: "0!important"}}>
                {classes.map((item, index) => {
                    return <Col key={index}>
                        <Classes classData={item} md="auto"></Classes>
                    </Col>

                })}
            </Row>
            
        </div>
    )
}

export default Dashboard;