import React, { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import {
  ArrowCircleRightRounded,
  ArrowCircleLeftRounded
} from "@mui/icons-material";

import { API_URL } from "../../config";
import { SocketContext } from "../../context/socket";
import logo from "../../assets/images/logo.jpg";
import "./style.css";

function SlideMember() {
  const socket = useContext(SocketContext);
  const { id, id_slide } = useParams(); // eslint-disable-line
  const token = localStorage.getItem("token");

  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [dataChart, setDataChart] = useState([]);
  const [prevURL, setPrevURL] = useState("");
  const [nextURL, setNextURL] = useState("");
  const [isPrevShow, setIsPrevShow] = useState(true);
  const [isNextShow, setIsNextShow] = useState(true);
  const [isConnected, setIsConnected] = useState(socket.connected); // eslint-disable-line

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  const ConfigSlides = (list) => { // eslint-disable-line
    const newSlideArr = [...list];
    if (newSlideArr.length !== 0) {
      newSlideArr.map((item) => {
        if (typeof item.content !== "object") {
          item.content = JSON.parse(item.content);
        }
      });
    }
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

    const currentSlide = newSlideArr.filter((item) => item.id == id_slide);
    setTitle(currentSlide[0].content.title);
    setDataChart(currentSlide[0].content.data);

    handleNext(newSlideArr);
    handlePrevious(newSlideArr);
  };

  const handlePrevious = (slideList) => {
    let currentIndex = 0;
    slideList.forEach((item, index) => {
      if (item.id == id_slide) {
        currentIndex = index - 1;
      }
    });
    const newURL = showSlide(slideList, currentIndex);

    setPrevURL(newURL);
  };

  const handleNext = (slideList) => {
    let currentIndex = 0;
    slideList.forEach((item, index) => {
      if (item.id == id_slide) {
        currentIndex = index + 1;
      }
    });

    const newURL = showSlide(slideList, currentIndex);

    setNextURL(newURL);
  };

  const showSlide = (slideList, indexToChange) => {
    if (slideList.length == 1) {
      setIsPrevShow(false);
      setIsNextShow(false);
    } else if (indexToChange == slideList.length) {
      setIsNextShow(false);
      setIsPrevShow(true);
    } else if (indexToChange < 0) {
      setIsNextShow(true);
      setIsPrevShow(false);
    }

    return `/presentation/${id}/slide/${slideList[indexToChange]?.id}/slideshow/member`;
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

  return (
    <div id="root-content">
      <div className="slideMember__container">
        <div className="slideMember__title">
          <img src={logo} alt="Google Logo" className="slideMember__logo" />
          <span>DND Group</span>
        </div>
        <div className="slideMember__content">
          <h3>{title}</h3>
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
        </div>
        <div className="slideMember__btn-group">
          <Button
            href={prevURL}
            style={!isPrevShow ? { visibility: "hidden" } : {}}
            aria-label="prev option"
          >
            <ArrowCircleLeftRounded
              style={{ width: "unset", height: "unset" }}
            />
          </Button>
          <Button
            href={nextURL}
            style={!isNextShow ? { visibility: "hidden" } : {}}
            aria-label="next option"
          >
            <ArrowCircleRightRounded
              style={{ width: "unset", height: "unset" }}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SlideMember;
