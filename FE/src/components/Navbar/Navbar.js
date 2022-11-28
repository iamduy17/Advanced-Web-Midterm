import { Avatar, IconButton, MenuItem, Menu } from "@material-ui/core";
import { Add, Apps, Menu as MenuIcon } from "@material-ui/icons";
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { API_URL } from "../../config/index"

import "./styles.css";

function Navbar() {
  //const [user, loading, error] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);
  //const [createOpened, setCreateOpened] = useRecoilState(createDialogAtom);
  //const [joinOpened, setJoinOpened] = useRecoilState(joinDialogAtom);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const handleCreateGroup = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.post(API_URL + 'groups/create', { name: className, description: description }, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    window.location.reload();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__left">
          <IconButton>
            <MenuIcon />
          </IconButton>
          <img
            src="https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png"
            alt="Google Logo"
            className="navbar__logo"
          />{" "}
          <span>Classroom</span>
        </div>
        <div className="navbar__right">
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Add />
          </IconButton>
          <IconButton>
            <Apps />
          </IconButton>
          <IconButton>

          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleShowModal();
                handleClose();
              }}
            >
              Create Class
            </MenuItem>
            <MenuItem
              onClick={() => {
                //setJoinOpened(true);
                handleClose();
              }}
            >
              Join Class
            </MenuItem>
          </Menu>
        </div>
      </nav>

      <Modal show={showModal} onHide={handleCloseModal} >
        <Modal.Header>
          <Modal.Title>Create Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={className}
                onChange={e => setClassName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleCreateGroup()}>
            Create Group
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Navbar;
