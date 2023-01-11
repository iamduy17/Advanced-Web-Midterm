import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@mui/material";
import {
  ArrowBack,
  Share,
  PlayArrow,
  ContentCopy,
  Close,
  Add
} from "@mui/icons-material";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import Notification from "../Notification/Notification";

import { API_URL } from "../../config";

import io from "socket.io-client";
const socket = io.connect(API_URL);
socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});

import "./style.css";

const dataChartShow = [
  {
    name: "Option 1",
    count: 0
  },
  {
    name: "Option 2",
    count: 0
  },
  {
    name: "Option 3",
    count: 0
  }
];

export default function NavbarSlide({
  name,
  handleErrorResponse,
  setError,
  id,
  presentationGroupID
}) {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const id_User = decoded.data.id;
  const [showModal, setShowModal] = useState(false);
  const URL_Presentation = `${window.location.href}/slideshow/member`;

  const handleCopy = () => {
    const URL = `${window.location.href}/slideshow/member`;
    navigator.clipboard.writeText(URL);
    toast("The link has been copied!", {
      autoClose: 1000
    });
  };

  const createNewSlide = () => {
    const content = {
      value: 1, // sua
      title: "Multiple Choice",
      data: dataChartShow,
      votings: []
    };

    async function addSLide() {
      const { data } = await axios.post(
        `${API_URL}slide/create`,
        {
          presentation_id: parseInt(id),
          slide_type_id: 1, // sua
          content: JSON.stringify(content)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (data.ReturnCode !== 200) {
        setError(data.Message);
        handleErrorResponse(data.Message);
      } else {
        const currentUrl = window.location.href;
        const newURL =
          currentUrl.substring(0, currentUrl.lastIndexOf("/") + 1) +
          data.Data.Slide.id;
        window.location.assign(newURL);
      }
    }
    addSLide();
  };

  const [notification, setNotification] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    socket.on("receive_presenting", (data) => {
      console.log("receive_presenting: ", data);
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

  const handlePresenting = (id) => {
    if (presentationGroupID != 0) {
      console.log("clicked");
      socket.emit("presenting", { id, presentationGroupID, URL_Presentation });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          background: "#FFFFFF",
          boxShadow: "none",
          borderBottom: "1px solid #dcdcdc"
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="black"
            href="/presentation"
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ color: "black" }}
          >
            {name}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            style={{ margin: "0 0.5rem" }}
            onClick={createNewSlide}
          >
            New Slide
          </Button>
          <Button
            variant="outlined"
            startIcon={<Share />}
            style={{ margin: "0 0.5rem" }}
            onClick={() => setShowModal(true)}
          >
            Share Link
          </Button>
          <Button
            variant="outlined"
            startIcon={<PlayArrow />}
            style={{ margin: "0 0.5rem" }}
            href={`${window.location.href}/slideshow`}
            onClick={() => {
              handlePresenting(id);
            }}
          >
            Present
          </Button>
        </Toolbar>

        {notification ? (
          <>
            <Notification
              setNotification={setNotification}
              groupID={data.presentationGroupID}
              presentationID={parseInt(data.id)}
              URL_Presentation={data.URL_Presentation}
            />
          </>
        ) : null}

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header>
            <Modal.Title>Share to everyone</Modal.Title>
            <IconButton aria-label="close" onClick={() => setShowModal(false)}>
              <Close />
            </IconButton>
          </Modal.Header>
          <Modal.Body>
            <p className="nbSlide__title">Your Sharing Link: </p>
            <div className="nbSlide__share">
              <span className="inbSlide__text">{`${window.location.href}/slideshow/member`}</span>
              <Button
                variant="outlined"
                startIcon={<ContentCopy />}
                style={{ margin: "0 0.5rem" }}
                onClick={handleCopy}
              >
                Copy Link
              </Button>
            </div>
            <ToastContainer />
          </Modal.Body>
        </Modal>
      </AppBar>
    </Box>
  );
}
