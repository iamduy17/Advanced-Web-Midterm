import { Avatar, IconButton, MenuItem, Menu } from "@material-ui/core";
import { Add, Apps, Menu as MenuIcon } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { API_URL, GOOGLE_ID } from "../../config/index"
import logo from "../../assets/images/logo.jpg"
import { GoogleLogout } from 'react-google-login';

import "./styles.css";

function Navbar() {
  //const [user, loading, error] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);
  //const [createOpened, setCreateOpened] = useRecoilState(createDialogAtom);
  //const [joinOpened, setJoinOpened] = useRecoilState(joinDialogAtom);

  const clientId = GOOGLE_ID;
    const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("provider")?.toString() === 'google') {
            setIsGoogleSignIn(true);
        } else {
            setIsGoogleSignIn(false);
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem("token");    
        localStorage.removeItem("provider");
        setIsGoogleSignIn(false);    
        window.location.reload();
    }

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
          <img
            src={logo}
            alt="Google Logo"
            className="navbar__logo"
          />{" "}
          <span>DND Group</span>
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
              Create Group
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
          {isGoogleSignIn ? 
            <GoogleLogout clientId={clientId} onLogoutSuccess={logOut} 
                render={renderProps => (
                        <Button onClick={renderProps.onClick}>Logout</Button>
                    )}
            /> 
            : 
            <Button variant="primary" onClick={logOut}>Logout</Button>}
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
