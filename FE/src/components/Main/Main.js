import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import LinkInvitation from "../Invitation/LinkInvitation";
import axios from "axios";
import { API_URL } from "../../config";
import Modal from "react-bootstrap/Modal";
import Button1 from "react-bootstrap/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import CustomizedTables from "../CustomizedTables/CustomizedTables";

function Main({ classData }) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [lgShowPresentaion, setLgShowPresentaion] = useState(false);
  const [namePresentation, setNamePresentation] = useState("");
  const [listPresentation, setListPresentation] = useState([]);
  const form = useRef();

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length === 0) {
      document.getElementById("btn-save").disabled = true;
    } else {
      setNamePresentation(e.target.value);
    }
  };
  const handleClose = () => {
    setLgShow(false);
    setLgShowPresentaion(false);
  };
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const handleCreate = async () => {
    const token = localStorage.getItem("token");
    console.log(classData.id);

    await axios.post(
      `${API_URL}presentation/create`,
      {
        name: namePresentation,
        created_at: currentDate,
        group_id: classData.id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setLgShow(false);
    toast("The presentation is created for group!", {
      autoClose: 1000
    });

    window.location.reload();
  };

  //list presentation of group
  useEffect(() => {
    async function loadPresentation() {
      const res = await axios.get(
        `${API_URL}presentation/getbyIDGroup/${classData.id}`,
        {}
      );

      setListPresentation(Object.values(res.data));
    }
    loadPresentation();
  }, []);

  function MenuListComposition() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    function handleListKeyDown(event) {
      if (event.key === "Tab") {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }

      prevOpen.current = open;
    }, [open]);

    return (
      <Stack direction="row" spacing={2}>
        <div>
          <Button1
            className="btn-MenuList"
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            More feature
          </Button1>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      className="btn_menuList"
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose} className="btn_menuList">
                        {" "}
                        <LinkInvitation />
                        <span>Copy link group</span>
                      </MenuItem>
                      <MenuItem
                        className="btn_menuList"
                        onClick={() => {
                          setLgShow(true);
                        }}
                      >
                        <AddIcon />
                        <span className="name_menuList">New Presentation</span>
                        <ToastContainer />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setLgShowPresentaion(true);
                        }}
                      >
                        <PlaylistPlayIcon />
                        <span className="name_menuList">
                          List Presentations
                        </span>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
    );
  }

  return (
    <div className="main">
      <div className="main__wrapper">
        <div className="main__content">
          <div className="main__wrapper1">
            <div className="main__bgImage">
              <div className="main__emptyStyles" />
            </div>
            <div className="main__text">
              <h1 className="main__heading main__overflow">
                {classData.className}
              </h1>
              <div className="main__section main__overflow">
                {classData.section}
              </div>
              <div className="main__wrapper2">
                <em className="main__code">Class Code: </em>
                <span className="main__id">{classData.id}</span>
                <LinkInvitation />
                <MenuListComposition />
              </div>
            </div>
          </div>
        </div>
        <div className="main__announce">
          <div className="main__status">
            <p>Upcoming</p>
            <p className="main__subText">No work due</p>
          </div>
          <div className="main__announcements">
            <div className="main__announcementsWrapper">
              <div className="main__ancContent">
                {showInput ? (
                  <div className="main__form">
                    <TextField
                      id="filled-multiline-flexible"
                      multiline
                      label="Announce Something to class"
                      variant="filled"
                      value={inputValue}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="main__buttons">
                      <input
                        // onChange={handleChange}
                        color="primary"
                        type="file"
                      />

                      <div>
                        <Button onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>

                        <Button
                          // onClick={handleUpload}
                          color="primary"
                          variant="contained"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="main__wrapper100"
                    onClick={() => setShowInput(true)}
                  >
                    <Avatar />
                    <div>Announce Something to class</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-lg">
            Create new presentation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form ref={form} className="invitation-form">
            <input
              className="btn_input"
              type="text"
              name="name-presentation"
              value={namePresentation}
              onChange={handleChange}
              placeholder="Presentation name"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button1 variant="danger" onClick={handleClose}>
            Close
          </Button1>
          <Button1 variant="primary" id="btn-save" onClick={handleCreate}>
            Create Presentation
          </Button1>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={lgShowPresentaion}
        onHide={() => setLgShowPresentaion(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-lg">
            List Presentations of group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomizedTables listPresentation={listPresentation} />
        </Modal.Body>
        <Modal.Footer>
          <Button1 variant="danger" onClick={handleClose}>
            Close
          </Button1>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Main;
