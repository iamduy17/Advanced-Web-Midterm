import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { ArrowBack, Share, PlayArrow, ContentCopy, Close, Add } from "@mui/icons-material";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API_URL } from "../../config";

import "./style.css";

const dataChartShow = [
  {
      'name': 'Option 1',
      'count': 0
  },
  {
      'name': 'Option 2',
      'count': 0
  },
  {
      'name': 'Option 3',
      'count': 0
  }
];

export default function NavbarSlide({name, handleErrorResponse, setError, id}) {

  let token = localStorage.getItem("token");  

  const [showModal, setShowModal] = useState(false);

  const handleCopy = () => {

    const URL = window.location.href + "/slideshow/member";
    navigator.clipboard.writeText(URL);
    toast("The link has been copied!", {
      autoClose: 1000,
    });
  };

  const createNewSlide = () => {
    const content = {
      title: "Multiple Choice",
      data: dataChartShow
    };

    async function addSLide() {
      const {data} = await axios.post(API_URL + 'slide/create', {
        "presentation_id": parseInt(id),
        "slide_type_id": 1,
        "content": JSON.stringify(content)
      }, {
          headers: {
              Authorization: 'Bearer ' + token,
          },          
      });      

      if(data.ReturnCode !== 200) {
        setError(data.Message);
        handleErrorResponse(data.Message);
      } else {
        const currentUrl = window.location.href;
        let newURL = currentUrl.substring(0, currentUrl.length - 2) + data.Data.Slide.id;
        window.location.assign(newURL);
      }
    }
    addSLide();
    
  };

  return (
    <>    
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
          <IconButton size="large" edge="start" color="black" href="/presentation">
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
            href={window.location.href + '/slideshow'}
          >
            Present
          </Button>
        </Toolbar>

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
              <span className="inbSlide__text">{window.location.href + "/slideshow/member"}</span>
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
    </>
  );
}
