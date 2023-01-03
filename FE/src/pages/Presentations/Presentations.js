import React, { useState, useRef, useEffect } from "react";
import "./Presentations.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListPresentation from "../../components/ListPresentation/ListPresentation";
import axios from "axios";
import { API_URL } from "../../config";
import Navbar from "../../components/Navbar/Navbar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function Presentations() {
  const [lgShow, setLgShow] = useState(false);
  const [namePresentation, setNamePresentation] = useState("");
  const form = useRef();
  const [presentations, setPresentations] = useState([
    {
      id: "3",
      name: "namePresentation",
      slideNumber: 3,
      dateCreated: "12/12/2022"
    }
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
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

  const date = new Date();
  const currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const handleClose = () => setLgShow(false);

  const handleCreate = async () => {
    const token = localStorage.getItem("token");
    const group_id = selected == "public" ? 0 : valueCheckBox;
    console.log(selected);
    console.log(valueCheckBox);

    await axios.post(
      `${API_URL}presentation/create`,
      { name: namePresentation, created_at: currentDate, group_id: group_id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    window.location.reload();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length === 0) {
      document.getElementById("btn-save").disabled = true;
    } else {
      setNamePresentation(e.target.value);
    }
  };

  // Check user create presentaion public or group
  const options = [
    { value: "public", text: "Public" },
    { value: "group", text: "Group" }
  ];

  const [selected, setSelected] = useState(options[0].value);
  const handleChangeSelected = (event) => {
    setSelected(event.target.value);
  };

  const [checkList, setCheckList] = useState([]);
  const [valueCheckBox, setValueCheckBox] = useState("");

  const handleRadioChange = (event) => {
    setValueCheckBox(event.target.value);
    console.log(valueCheckBox);
  };

  const token = localStorage.getItem("token");
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
    <div id="root-content">
      <Navbar />
      {presentations.length === 0 ? (
        <div className="no-presentation">
          <video
            autoPlay
            muted
            playsInline
            src="https://static.mentimeter.com/static/motion/noPresentations.h264.mp4"
            width="30%"
            height="30%"
            className="presentation__video"
          />
          <h3>No presentations here yet!</h3>
          <span style={{ fontWeight: "bold" }}>
            Start creating interactive and engaging presentations to include
            your audience.
          </span>
          <button
            className="btn-new-presentation"
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
                  onChange={handleChange}
                  placeholder="Presentation name"
                />
                <select
                  value={selected}
                  onChange={handleChangeSelected}
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
              <Button variant="primary" id="btn-save" onClick={handleCreate}>
                Create Presentation
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <ListPresentation />
      )}
    </div>
  );
}
