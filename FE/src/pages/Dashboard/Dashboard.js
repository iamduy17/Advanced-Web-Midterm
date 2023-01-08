import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Classes from "../../components/Classes/Classes";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Notification from "../../components/Notification/Notification";

import { API_URL } from "../../config";

import io from "socket.io-client";
const socket = io.connect(API_URL);
socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});

import "./styles.css";

function Dashboard({ classes }) {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const id_User = decoded.data.id;

  const [notification, setNotification] = useState(false);
  const [data, setData] = useState();
  let isPresenting = true;

  useEffect(() => {
    socket.on("receive_presenting", (data) => {
      console.log(data);
      setData(data);

      const loadAccount_Group = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          API_URL + "account_group/getByGroupID",
          { presentationGroupID: data.presentationGroupID },
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
        console.log(res);

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].account_id == id_User) setNotification(true);
        }
      };

      loadAccount_Group();
    });
  }, [socket]);

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
      {!notification ? null : (
        <>
          {!isPresenting ? null : (
            <Notification
              setNotification={setNotification}
              groupID={data.presentationGroupID}
              presentationID={parseInt(data.id)}
              URL_Presentation={data.URL_Presentation}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
