import React, { useState, useEffect, useRef } from "react";
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

export default function ModalChat({
  id_User,
  userName,
  socket,
  dataChats,
  setDataChats,
  id_presentation
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dataChats]);

  useEffect(() => {
    socket.on("receive_message_chat", (newDataChats) => {
      setDataChats(newDataChats);
    });

    return () => socket.off("receive_message_chat");
  }, [socket]);

  const [chatText, setChatText] = useState("");

  const changeDigit = (number) => {
    if (number < 10 && number > 0) return "0" + number;
    return number;
  };

  const handleSubmitChat = () => {
    const date = new Date();
    const currentDate = `${changeDigit(date.getFullYear())}-${changeDigit(
      date.getMonth() + 1
    )}-${changeDigit(date.getDate())} ${changeDigit(
      date.getHours()
    )}:${changeDigit(date.getMinutes())}:${changeDigit(date.getSeconds())}`;

    if (chatText.length != 0) {
      let newDataChats = [...dataChats];
      newDataChats.push({
        id: id_User,
        name: userName,
        content: chatText,
        time: currentDate
      });

      socket.emit("send_message_chat", {
        newDataChats,
        id_presentation
      });
    }

    setChatText("");
  };

  return (
    <div>
      <IconButton onClick={handleOpen} className="slideShow_btn-icon">
        <Badge badgeContent={dataChats.length} color="primary">
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
                {dataChats == null || dataChats.length == 0 ? (
                  <div>No message here. Start chatting now!</div>
                ) : (
                  dataChats?.map((item, index) => (
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
                      <div className="modal__single-box-time">{item.time}</div>
                    </Box>
                  ))
                )}
                <div ref={messageRef} />
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
