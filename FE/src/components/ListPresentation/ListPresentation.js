import React, { useState, useRef, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert, Edit, Delete } from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import SearchButton from "../../components/SearchButton/SearchButton";
import CollaboratorsTable from "../../components/CustomizedTables/CollaboratorsTable";
import jwt_decode from "jwt-decode";

import { API_URL } from "../../config";

import "./ListPresentation.css";

export default function ListPresentation() {
  const [presentations, setPresentations] = useState([]);
  const [lgShow, setLgShow] = useState(false);

  const [collaborators, setCollaborators] = useState([]);
  const [idPresentation, setIdPresentation] = useState(0);
  const [idOwner, setIdOwner] = useState(0);
  const [listCollabShow, setlistCollabShow] = useState(false);
  const handleCloseListCollab = () => setlistCollabShow(false);

  const handleClose = () => setLgShow(false);
  const [idEdit, setIdEdit] = useState(0);

  const [editShow, setEditShow] = useState(false);
  const handleCloseEdit = () => setEditShow(false);

  const [namePresentation, setNamePresentation] = useState("");
  const [renamePresentation, setRenamePresentation] = useState("");

  const form = useRef();
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
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

  // set Owner presentaion
  const decode = jwt_decode(token);
  const IDUser = decode.data.id;

  presentations.map((presentation) => {
    presentation.owner.id === IDUser
      ? (presentation.owner.username = "me")
      : null;
  });

  // Create a presentation
  const handleCreate = async () => {
    setLgShow(false);

    const group_id = selected == "public" ? 0 : valueCheckBox;

    const res = await axios.post(
      `${API_URL}presentation/create`,
      { name: namePresentation, created_at: currentDate, group_id: group_id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    window.location.reload();
    console.log(res);
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
    console.log(id);
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

  // Show list collab
  const handleShowListCollab = async (id) => {
    const { data } = await axios.get(`${API_URL}presentation/edit/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setCollaborators(data.Data.Collaborators);
    setIdPresentation(id);
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
          {props.idOwner == IDUser ? (
            <>
              <MenuItem onClick={() => handleDelete(props.id)}>
                <Delete />
                <span style={{ paddingLeft: "10px" }}>Delete</span>
              </MenuItem>
            </>
          ) : null}

          <MenuItem
            onClick={() => {
              setlistCollabShow(true);
              handleShowListCollab(props.id);
              setIdOwner(props.idOwner);
            }}
          >
            <FormatListBulletedIcon />
            <span style={{ paddingLeft: "10px" }}>List collaborators</span>
          </MenuItem>
        </Menu>
      </>
    );
  }

  // Check user create presentaion public or group
  const options = [
    { value: "public", text: "Public" },
    { value: "group", text: "Group" }
  ];

  const [selected, setSelected] = useState(options[0].value);
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const [checkList, setCheckList] = useState([]);
  const [valueCheckBox, setValueCheckBox] = useState("");

  const handleRadioChange = (event) => {
    setValueCheckBox(event.target.value);
  };

  useEffect(() => {
    async function loadGroups() {
      const res = await axios.get(`${API_URL}groups`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCheckList(res.data.Groups);
    }

    loadGroups();
  }, []);

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
          size=""
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
              <select
                value={selected}
                onChange={handleChange}
                className="select"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              {selected === "group" ? (
                <div className="listCheckBox">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      <span className="txtCheckbox">Your list group</span>
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={handleRadioChange}
                      className="radioGroup"
                    >
                      {checkList.map((item, index) => (
                        <FormControlLabel
                          className="btn_checkbox"
                          key={index}
                          value={item.id}
                          control={<Radio />}
                          label={item.className}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              ) : null}
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
                <th>Owner</th>
                <th>Date Created</th>
                <th>Type</th>
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
                  <td
                    onClick={() => handleLink(presentation.id)}
                    style={{ fontStyle: "italic", color: "#615F5F" }}
                  >
                    {presentation.owner.username}
                  </td>
                  <td onClick={() => handleLink(presentation.id)}>
                    {presentation.created_at}
                  </td>
                  <td onClick={() => handleLink(presentation.id)}>
                    {presentation.group_id == 0 ? "Public" : "Group"}
                  </td>
                  <td>
                    <IsolatedMenu
                      id={presentation.id}
                      name={presentation.name}
                      idOwner={presentation.owner.id}
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
          <Modal
            size="lg"
            show={listCollabShow}
            onHide={() => setlistCollabShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header>
              <Modal.Title
                id="example-modal-sizes-title-lg"
                style={{ margin: "0 auto" }}
              >
                List Collaborator of Presentation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {IDUser == idOwner ? (
                <>
                  <SearchButton idPresentation={idPresentation} />
                  <div className="_space"></div>
                </>
              ) : null}
              <CollaboratorsTable
                collaborators={collaborators}
                idPresentation={idPresentation}
                idOwner={idOwner}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseListCollab}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
/* 
  API
  1. list collab presentation
  2. get id user of owner's presentation
*/
