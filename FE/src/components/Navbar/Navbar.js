import { Button } from "@material-ui/core";
import { Add, Slideshow, Group, ExitToApp } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

import { GoogleLogout } from "react-google-login";
import { API_URL, GOOGLE_ID } from "../../config/index";
import logo from "../../assets/images/logo.jpg";

import "./styles.css";

function Navbar() {
  const [value, setValue] = useState(0);

  const clientId = GOOGLE_ID;
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("provider")?.toString() === "google") {
      setIsGoogleSignIn(true);
    } else {
      setIsGoogleSignIn(false);
    }

    if (window.location.href.includes("presentation")) {
      setValue(1);
    } else {
      setValue(0);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("provider");
    setIsGoogleSignIn(false);
    window.location.reload();
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateGroup = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      `${API_URL}groups/create`,
      { name: className, description },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    window.location.reload();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__left">
          <a
            href="/"
            className="navbar__logo-link"
            style={{ textDecoration: "none" }}
          >
            <img src={logo} alt="Google Logo" className="navbar__logo" />{" "}
            <span style={{ fontWeight: "500" }}>DND Group</span>
          </a>
        </div>
        <div className="navbar__center" style={{ flex: "1" }}>
          {value === 0 ? (
            <Button
              variant="contained"
              href="/presentation"
              color="primary"
              style={{ textTransform: "none" }}
              startIcon={<Slideshow />}
            >
              My Presentations
            </Button>
          ) : (
            <Button
              variant="contained"
              href="/"
              color="primary"
              style={{ textTransform: "none" }}
              startIcon={<Group />}
            >
              My Groups
            </Button>
          )}
        </div>
        <div className="navbar__right">
          {value === 0 && (
            <>
              {" "}
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                variant="contained"
                color="secondary"
                onClick={() => {
                  handleShowModal();
                }}
                startIcon={<Add />}
                style={{ textTransform: "none", marginRight: "1.5rem" }}
              >
                Create Group
              </Button>
            </>
          )}

          {isGoogleSignIn ? (
            <GoogleLogout
              clientId={clientId}
              onLogoutSuccess={logOut}
              render={(renderProps) => (
                <Button
                  startIcon={<ExitToApp />}
                  variant="contained"
                  color="primary"
                  style={{ textTransform: "none" }}
                  onClick={renderProps.onClick}
                >
                  Logout
                </Button>
              )}
            />
          ) : (
            <Button
              startIcon={<ExitToApp />}
              variant="contained"
              color="primary"
              style={{ textTransform: "none" }}
              onClick={logOut}
            >
              Logout
            </Button>
          )}
        </div>
      </nav>

      <Modal show={showModal} onHide={handleCloseModal}>
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
                onChange={(e) => setClassName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            color="secondary"
            style={{ textTransform: "none" }}
            onClick={handleCloseModal}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: "none" }}
            onClick={() => handleCreateGroup()}
          >
            Create Group
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Navbar;
