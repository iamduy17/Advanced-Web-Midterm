import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  IconButton,
  Typography,
  Badge,
  TextField
} from "@mui/material";
import { Chat as ChatIcon, Send as SendIcon } from "@mui/icons-material";
import jwt_decode from "jwt-decode";

import "./styles.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function ModalChat() {
  const token = localStorage.getItem("token");
  const data = jwt_decode(token).data;
  const id_User = data.id;
  const userName = data.username;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [fakeData, setFakeData] = useState([
    {
      id: 1,
      name: "Duy",
      content: "sdfsdfs"
    },
    {
      id: 8,
      name: "Thais Duy Do",
      content: "fsdfsdfsd"
    },
    {
      id: 13,
      name: "Duy",
      content: "hjghjghjghj"
    },
    {
      id: 13,
      name: "Duy",
      content: "hjghjghjghj"
    },
    {
      id: 13,
      name: "Duy",
      content: "hjghjghjghj"
    }
  ]);

  const [chatText, setChatText] = useState("");

  const handleSubmitChat = () => {
    if (chatText.length != 0) {
      let newData = [...fakeData];
      newData.push({
        id: id_User,
        name: userName,
        content: chatText
      });
      setFakeData(newData);
    }

    setChatText("");
  };

  return (
    <div>
      <IconButton onClick={handleOpen} className="slideShow_btn-icon">
        <Badge badgeContent={fakeData.length} color="primary">
          <ChatIcon />
        </Badge>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h2"
              sx={{ mb: 1 }}
            >
              Chat
            </Typography>
            <Box sx={{ overflowY: "auto", height: "80%" }}>
              <div className="modal__box-contain">
                {fakeData?.map((item, index) => (
                  <Box
                    className="modal__single-box"
                    style={
                      item.id === id_User
                        ? { alignItems: "flex-end", alignSelf: "flex-end" }
                        : {}
                    }
                    key={index}
                  >
                    <div className="modal__single-box-name">{item.name}</div>
                    <div
                      className="modal__single-box-content"
                      style={
                        item.id === id_User
                          ? { backgroundColor: "#5BC0F8", color: "white" }
                          : {}
                      }
                    >
                      {item.content}
                    </div>
                  </Box>
                ))}
              </div>
            </Box>
            <div
              id="transition-modal-detail"
              className="modal__input-chat-question"
            >
              <TextField
                id="outlined-basic"
                placeholder="Chat something"
                variant="outlined"
                size="small"
                className="modal__input"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
              />
              <IconButton
                className="modall__icon-btn"
                onClick={handleSubmitChat}
              >
                <SendIcon />
              </IconButton>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
