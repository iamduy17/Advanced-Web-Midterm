import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import {
  ArrowCircleRightRounded,
  ArrowCircleLeftRounded
} from "@mui/icons-material";

import BootstrapButton from "react-bootstrap/Button";
import SlideDetail from "../../components/SlideDetail/SlideDetail";
import { API_URL } from "../../config";
import { SocketContext } from "../../context/socket";

import "./style.css";

function SlideShow() {
  const socket = useContext(SocketContext);

  const { id, id_slide } = useParams();
  const token = localStorage.getItem("token");

  const [slideType, setSlideType] = useState(0);
  const [title, setTitle] = useState("");
  const [dataChart, setDataChart] = useState([]);
  const [prevURL, setPrevURL] = useState("");
  const [nextURL, setNextURL] = useState("");
  const [isPrevShow, setIsPrevShow] = useState(true);
  const [isNextShow, setIsNextShow] = useState(true);

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

    return `/presentation/${id}/slide/${slideList[indexToChange]?.id}/slideshow`;
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
    handleNext(newSlideArr);
    handlePrevious(newSlideArr);

    const handleReceivedSubmit = (data) => {
      const temp = [...currentSlide[0].content.data];
      for (let i = 0; i < temp.length; i += 1) {
        if (temp[i].name === data) {
          temp[i].count += 1;
          break;
        }
      }
      setDataChart(temp);
    };
    socket.on("received submit", handleReceivedSubmit);

    return () => {
      socket.off("connect");
      socket.off("received submit", handleReceivedSubmit);
    };
  };

  const handleFinishSlide = async () => {
    const content = {
      value: slideType,
      title,
      data: dataChart
    };
    await axios.post(
      `${API_URL}slide/edit/${id_slide}`,
      { content: JSON.stringify(content) },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    window.location.assign(`/presentation/${id}/slide/${id_slide}`);
  };

  return (
    <div id="root-content">
      <div className="slideShow__contain">
        <SlideDetail
          slideType={slideType}
          title={title}
          dataChart={dataChart}
        />
        <div className="slideShow__btn-group">
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
        <BootstrapButton
          className="btn btn-danger slideShow__btn-finish"
          onClick={() => handleFinishSlide()}
        >
          Stop Presentation
        </BootstrapButton>
      </div>
    </div>
  );
}

export default SlideShow;
