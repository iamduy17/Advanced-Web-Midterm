import React, { useState, useEffect, useRef } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  IconButton,
  Typography,
  Badge,
  TextField,
  Checkbox,
  Tooltip
} from "@mui/material";
import {
  QuestionAnswer as QuestionAnswerIcon,
  Send as SendIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
  ThumbUpAlt as ThumbUpAltIcon,
  ThumbUpOffAlt as ThumbUpOffAltIcon,
  Sort as SortIcon,
  Timeline as TimelineIcon,
  SortByAlpha as SortByAlphaIcon
} from "@mui/icons-material";

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

export default function ModalQuestion({
  id_User,
  userName,
  socket,
  dataQuestions,
  setDataQuestions,
  id_presentation,
  isMember
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
      let newDataQuestions = [...dataQuestions];
      newDataQuestions.push({
        id: id_User,
        name: userName,
        content: chatText,
        isCheckMark: false,
        isCheckUpVote: false,
        upVoteCount: 0,
        timeAsked: currentDate
      });

      socket.emit("send_question", {
        newDataQuestions,
        id_presentation
      });
    }

    setChatText("");
  };

  const handleCheckbox = (index) => (e) => {
    let newDataQuestions = [...dataQuestions];
    newDataQuestions[index].isCheckMark = e.target.checked;

    socket.emit("send_question", {
      newDataQuestions,
      id_presentation
    });
  };

  const handleCheckboxUpVote = (index) => (e) => {
    let newDataQuestions = [...dataQuestions];
    newDataQuestions[index].isCheckUpVote = e.target.checked;
    newDataQuestions[index].upVoteCount += 1;

    socket.emit("send_question", {
      newDataQuestions,
      id_presentation
    });
  };

  const handleSortByAnswer = () => {
    if (dataQuestions != null && dataQuestions.length != 0) {
      let newData = [...dataQuestions];
      newData.sort((a, b) => b.isCheckMark - a.isCheckMark);
      setDataQuestions(newData);
    }
  };

  const handleSortByVote = () => {
    if (dataQuestions != null && dataQuestions.length != 0) {
      let newData = [...dataQuestions];
      newData.sort((a, b) => b.upVoteCount - a.upVoteCount);

      setDataQuestions(newData);
    }
  };

  const handleSortByTime = () => {
    if (dataQuestions != null && dataQuestions.length != 0) {
      let newData = [...dataQuestions];
      newData.sort((a, b) => {
        if (a.timeAsked < b.timeAsked) return -1;
        if (a.timeAsked > b.timeAsked) return 1;
        return 0;
      });

      setDataQuestions(newData);
    }
  };

  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dataQuestions]);

  useEffect(() => {
    socket.on("receive_question", (newDataQuestions) => {
      setDataQuestions(newDataQuestions);
    });

    return () => socket.off("receive_question");
  }, [socket]);

  return (
    <div>
      <IconButton onClick={handleOpen} className="slideShow_btn-icon">
        <Badge badgeContent={dataQuestions.length} color="primary">
          <QuestionAnswerIcon />
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
            <Box className="modal__title">
              <Typography
                id="transition-modal-title"
                variant="h5"
                component="h2"
                sx={{ mb: 1 }}
              >
                Questions
              </Typography>
              <div className="modal__title-btn-group">
                <Tooltip title="Sort by answered/unanswer">
                  <IconButton onClick={handleSortByAnswer}>
                    <SortByAlphaIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sort by total vote">
                  <IconButton onClick={handleSortByVote}>
                    <SortIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sort by time asked">
                  <IconButton onClick={handleSortByTime}>
                    <TimelineIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </Box>
            <Box sx={{ overflowY: "auto", height: "80%" }}>
              <div className="modal__box-contain">
                {dataQuestions == null || dataQuestions.length == 0 ? (
                  <div>
                    No questions here. Start to make first question now!
                  </div>
                ) : (
                  dataQuestions?.map((item, index) => (
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
                        className="modal__single-box-question-check"
                        style={
                          item.id === id_User
                            ? { flexDirection: "row-reverse" }
                            : {}
                        }
                      >
                        <div
                          className="modal__single-box-content"
                          style={
                            item.id === id_User
                              ? { backgroundColor: "#5BC0F8", color: "white" }
                              : {}
                          }
                        >
                          {item.content}?
                        </div>
                        <div className="modal__single-box-check">
                          <Checkbox
                            icon={<BookmarkBorderIcon />}
                            checkedIcon={<BookmarkIcon />}
                            checked={item.isCheckMark}
                            onChange={handleCheckbox(index)}
                            disabled={isMember}
                          />
                        </div>
                        <div className="modal__single-box-check">
                          <Checkbox
                            icon={<ThumbUpOffAltIcon />}
                            checkedIcon={<ThumbUpAltIcon />}
                            checked={item.isCheckUpVote}
                            onChange={handleCheckboxUpVote(index)}
                          />
                        </div>
                        <div className="modal__single-box-check">
                          {item.upVoteCount}
                        </div>
                      </div>
                      <div className="modal__single-box-time">
                        {item.timeAsked}
                      </div>
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
                placeholder="Make a question"
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
