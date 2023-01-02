import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState, useRef } from "react";
import "./styles.css";
import LinkInvitation from "../Invitation/LinkInvitation";
import axios from "axios";
import { API_URL } from "../../config";
import Modal from "react-bootstrap/Modal";
import Button1 from "react-bootstrap/Button";

function Main({ classData }) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [namePresentation, setNamePresentation] = useState("");
  const form = useRef();

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length === 0) {
      document.getElementById("btn-save").disabled = true;
    } else {
      setNamePresentation(e.target.value);
    }
  };
  const handleClose = () => setLgShow(false);
  const currentDate = "2023-02-01 20:24:18";

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

    window.location.reload();
  };

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
                <button
                  className="btn-add-presentation"
                  onClick={() => {
                    setLgShow(true);
                  }}
                >
                  + New presentation
                </button>
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
    </div>
  );
}

export default Main;
