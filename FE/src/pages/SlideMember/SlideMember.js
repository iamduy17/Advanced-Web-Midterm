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

function SlideMember() {
  const socket = useContext(SocketContext);
  const { id, id_slide } = useParams();
  const token = localStorage.getItem("token");

  const [value, setValue] = useState("");
  const [slideType, setSlideType] = useState(0);
  const [title, setTitle] = useState("");
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    async function loadSlides() {
      const { data } = await axios.get(`${API_URL}presentation/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      ConfigSlides(data.Data.Slide);
    }
    loadSlides();
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
  };

  const handleChange = (e) => {
    e.persist();

    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("submit", value);
    window.location.href = "/ThanksForVoting";
  };

  const handleSubmitParagraphHeading = () => {
    socket.emit("submit-paragraph-heading");
    window.location.href = "/ThanksForVoting";
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
                {dataChart.Subheading}
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
                {dataChart.Paragraph}
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
