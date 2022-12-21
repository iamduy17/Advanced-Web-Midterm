import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Classes from "../../components/Classes/Classes";
import Navbar from "../../components/Navbar/Navbar";

import "./styles.css";

function Dashboard({ classes }) {
  return (
    <div id="root-content">
      <Navbar />
      <Row style={{ margin: "0!important" }}>
        {classes.map((item, index) => (
          <Col key={index}>
            <Classes classData={item} md="auto" />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Dashboard;
