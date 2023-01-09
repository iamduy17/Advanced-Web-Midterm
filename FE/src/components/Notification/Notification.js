import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./Notification.css";
import axios from "axios";

import { API_URL } from "../../config";
import io from "socket.io-client";
const socket = io.connect(API_URL);
socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});

export default function Notification({
  setNotification,
  groupID,
  presentationID,
  URL_Presentation
}) {
  const [nameGroup, setNameGroup] = useState("");
  const [namePresentation, setNamePresentation] = useState("");
  const token = localStorage.getItem("token");
  console.log(groupID, presentationID, URL_Presentation);
  useEffect(() => {
    const loadGroup = async () => {
      const res = await axios.get(`${API_URL}groups/${groupID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNameGroup(res.data.Data.Group.name);
    };

    const loadPresentaion = async () => {
      const res = await axios.get(
        `${API_URL}presentation/edit/${presentationID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setNamePresentation(res.data.Data.Presentation.name);
    };

    loadGroup();
    loadPresentaion();
  }, []);

  useEffect(() => {
    socket.on("receive_presenting", (data) => {
      console.log(data);
    });
  }, [socket]);

  const handleLink = () => {
    window.location.replace(URL_Presentation);
  };

  const handleMark = () => {
    console.log("marked");
    setNotification(false);
  };

  return (
    <div className="container_notification">
      <div className="notification2">
        <span className="txt_notification">
          Now, Group &nbsp;{" "}
          <span style={{ fontWeight: "bold" }}>{nameGroup}</span>&nbsp; has a
          &nbsp; <span style={{ fontWeight: "bold" }}>{namePresentation}</span>{" "}
          &nbsp;presenting..!
        </span>
        <div className="button_notification">
          <Button
            className="btn_notification"
            variant="contained"
            color="primary"
            style={{
              width: "200px",
              textTransform: "none",
              marginBottom: "1rem",
              height: "45px"
            }}
            onClick={handleLink}
          >
            Go to presentation
          </Button>
          <Button
            className="btn_notification"
            variant="contained"
            color="error"
            style={{
              width: "200px",
              textTransform: "none",
              height: "45px"
            }}
            onClick={handleMark}
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
}
