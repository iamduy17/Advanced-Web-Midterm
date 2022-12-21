import React, { useState, useRef, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert, Edit, Delete } from "@mui/icons-material";
import axios from "axios";

import { API_URL } from "../../config";

import "./ListPresentation.css";

export default function ListPresentation() {
  const [presentations, setPresentations] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const handleClose = () => setLgShow(false);
  const [idEdit, setIdEdit] = useState(0);

  const [editShow, setEditShow] = useState(false);
  const handleCloseEdit = () => setEditShow(false);

  const [namePresentation, setNamePresentation] = useState("");
  const [renamePresentation, setRenamePresentation] = useState("");

  const form = useRef();
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadGroups() {
      const res = await axios.get(`${API_URL}presentation`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPresentations(res.data.Presentations);
    }

    loadGroups();
  }, []);

  // Create a presentation
  const handleCreate = async () => {
    setLgShow(false);

    await axios.post(
      `${API_URL}presentation/create`,
      { name: namePresentation, created_at: currentDate },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    window.location.reload();
  };

  // Rename a spresentation
  const handleEdit = (id) => async () => {
    setEditShow(false);

    const dateTime = new Date()
      .toLocaleString("en-US", { hour12: false, timeZone: "Asia/Bangkok" })
      .split(", ");
    dateTime[0] = `${dateTime[0].split("/")[2]}-${dateTime[0].split("/")[0]}-${
      dateTime[0].split("/")[1]
    }`;

    if (dateTime[1].substring(0, 2) === "24") {
      dateTime[1] = `00${dateTime[1].substring(2)}`;
    }
    const updateTime = `${dateTime[0]} ${dateTime[1]}`;

    const res = await axios.post(
      `${API_URL}presentation/edit/${id}`,
      { name: renamePresentation, updated_at: updateTime },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    window.location.reload();
    console.log(res);
  };

  const handleDelete = async (id) => {
    await axios.post(
      `${API_URL}presentation/delete/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    window.location.reload();
  };

  const handleLink = async (id) => {
    const { data } = await axios.get(`${API_URL}presentation/edit/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    window.location.replace(
      `${window.location.href}/${id}/slide/${data.Data.Slides[0].id}`
    );
  };

  function IsolatedMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.target);
    };
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button"
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0
              }
            }
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            id={props.id}
            onClick={() => {
              setRenamePresentation(props.name);
              setIdEdit(props.id);
              setEditShow(true);
              handleCloseMenu();
            }}
          >
            <Edit />
            <span style={{ paddingLeft: "10px" }}>Edit</span>
          </MenuItem>
          <MenuItem onClick={() => handleDelete(props.id)}>
            <Delete />
            <span style={{ paddingLeft: "10px" }}>Delete</span>
          </MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <div>
      <div className="header-list-presentation">
        <div className="header-text">My presentations</div>
        <button
          type="button"
          className="btn-add-presentation"
          onClick={() => setLgShow(true)}
        >
          {" "}
          + New Presentation
        </button>
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
                onChange={(e) => setNamePresentation(e.target.value)}
                placeholder="Presentation name"
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Create Presentation
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title">List Presentations</h5>
        </div>

        <div className="list-presentation">
          <Table hover striped>
            <thead className="thead">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Slide number</th>
                <th>Date Created</th>
                <th>Date Updated</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {presentations.map((presentation, index) => (
                <tr className="tr" key={index}>
                  <td onClick={() => handleLink(presentation.id)}>
                    {index + 1}
                  </td>
                  <td onClick={() => handleLink(presentation.id)}>
                    {presentation.name}
                  </td>
                  <td onClick={() => handleLink(presentation.id)}>
                    {presentation.slide_count}
                  </td>
                  <td onClick={() => handleLink(presentation.id)}>
                    {presentation.created_at}
                  </td>
                  <td onClick={() => handleLink(presentation.id)}>
                    {presentation.updated_at}
                  </td>
                  <td>
                    <IsolatedMenu
                      id={presentation.id}
                      name={presentation.name}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal
            size=""
            show={editShow}
            onHide={() => setEditShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header>
              <Modal.Title id="example-modal-sizes-title-lg">
                Rename presentation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form ref={form} className="invitation-form">
                <input
                  className="btn_input"
                  type="text"
                  name="name-presentation"
                  value={renamePresentation}
                  onChange={(e) => {
                    if (e.target.value.length !== 0) {
                      setRenamePresentation(e.target.value);
                    }
                  }}
                  placeholder="Rename presentation"
                />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseEdit}>
                Close
              </Button>
              <Button
                variant="primary"
                id={idEdit}
                onClick={handleEdit(idEdit)}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
