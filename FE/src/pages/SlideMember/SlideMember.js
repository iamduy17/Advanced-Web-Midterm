import React, { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { Favorite } from "@mui/icons-material";

import { API_URL } from "../../config";
import { SocketContext } from "../../context/socket";
import logo from "../../assets/images/logo.jpg";
import "./style.css";
import jwt_decode from "jwt-decode";

function SlideMember() {
  const socket = useContext(SocketContext);
  const { id, id_slide } = useParams();
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  const username = decoded.data.username;
  const userID = decoded.data.id;
  const [value, setValue] = useState("");
  const [slideType, setSlideType] = useState(0);
  const [title, setTitle] = useState("");
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    async function loadSlides() {
      const { data } = await axios.get(`${API_URL}presentation/edit/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data.Data.group_id !== null) {
        const isInGroup = await axios.post(
          `${API_URL}groups/isInGroup`,
          { group_id: data.Data.Presentation.group_id },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (!isInGroup.data.Data) {
          window.location.assign(`/Forbidden`);
          return;
        }
      }

      ConfigSlides(data.Data.Slides);
    }
    loadSlides();
    socket.emit("join-slide", {
      slideID: id_slide
    });
  }, []);

  const ConfigSlides = (list) => {
    const newSlideArr = [...list];
    if (newSlideArr.length !== 0) {
      newSlideArr.map((item) => {
        if (typeof item.content !== "object") {
          item.content = JSON.parse(item.content);
        }
      });
    }

    const currentSlide = newSlideArr.filter((item) => item.id == id_slide);
    setSlideType(currentSlide[0].content.value);
    setTitle(currentSlide[0].content.title);
    setDataChart(currentSlide[0].content.data);
    const votings = currentSlide[0].content.votings;
    const isVoted = votings.filter((item) => item.userID == userID);
    if (isVoted.length > 0) {
      window.location.assign(`/thanksForVoting`);
    }
  };

  const handleChange = (e) => {
    e.persist();

    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("submit", {
      username: username,
      data: value,
      slideID: id_slide,
      userID: userID
    });
    window.location.assign(`/presentation/${id}/slide/${id_slide}/slideshow`);
  };

  const handleSubmitParagraphHeading = () => {
    socket.emit("submit-paragraph-heading", {
      username: username,
      slideID: id_slide,
      userID: userID
    });
    window.location.assign(`/presentation/${id}/slide/${id_slide}/slideshow`);
  };

  return (
    <div id="root-content">
      <div className="slideMember__container">
        <div className="slideMember__title">
          <img src={logo} alt="Google Logo" className="slideMember__logo" />
          <span>DND Group</span>
        </div>
        <div className="slideMember__content">
          <h3>{title}</h3>
          {slideType === 1 ? (
            <Form onSubmit={handleSubmit} className="slideMember__form">
              <Form.Group controlId="name">
                {dataChart.map((item, index) => (
                  <div
                    key={`default-${index}`}
                    className="slideMember__form-radio mb-3"
                    onClick={() => setValue(item.name)}
                  >
                    <input
                      type="radio"
                      value={item.name}
                      onChange={handleChange}
                      checked={value === item.name}
                      className="slideMember__form-radio-input"
                    />
                    <label className="slideMember__form-radio-label">
                      {item.name}
                    </label>
                  </div>
                ))}
              </Form.Group>

              <Button
                variant="contained"
                color="primary"
                size="lg"
                type="submit"
                className="slideMember__submit"
              >
                Submit
              </Button>
            </Form>
          ) : slideType === 2 ? (
            <>
              <div
                style={{ width: "70%", textAlign: "center", marginTop: "1rem" }}
              >
                {dataChart[0]?.Subheading}
              </div>
              <button
                className="slidemember__button-submit"
                onClick={handleSubmitParagraphHeading}
              >
                <Favorite style={{ color: "rgb(255, 199, 56)" }} />
              </button>
            </>
          ) : (
            <>
              <div
                style={{ width: "70%", textAlign: "center", marginTop: "1rem" }}
              >
                {dataChart[0]?.Paragraph}
              </div>
              <button
                className="slidemember__button-submit"
                onClick={handleSubmitParagraphHeading}
              >
                <Favorite style={{ color: "rgb(255, 199, 56)" }} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SlideMember;
