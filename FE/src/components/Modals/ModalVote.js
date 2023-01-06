import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  IconButton,
  Typography,
  Badge
} from "@mui/material";
import { Poll as PollIcon } from "@mui/icons-material";

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

export default function ModalChat({ votings }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen} className="slideShow_btn-icon">
        <Badge badgeContent={votings?.length} color="primary">
          <PollIcon />
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
              Voting
            </Typography>
            <Box sx={{ overflowY: "auto", height: "90%" }}>
              <div className="modal__box-contain">
                {votings?.map((item, index) => (
                  <Box className="modal__single-box" key={index}>
                    <div className="modal__single-box-name">
                      {item.username}
                    </div>
                    <div className="modal__single-box-content">{item.data}</div>
                  </Box>
                ))}
              </div>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
