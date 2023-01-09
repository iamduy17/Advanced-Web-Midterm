import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import {
  ArrowCircleRightRounded,
  ArrowCircleLeftRounded
} from "@mui/icons-material";
import jwt_decode from "jwt-decode";

import BootstrapButton from "react-bootstrap/Button";
import SlideDetail from "../../components/SlideDetail/SlideDetail";
import { API_URL } from "../../config";
import { SocketContext } from "../../context/socket";
import ModalQuestion from "../../components/Modals/ModalQuestion";
import ModalChat from "../../components/Modals/ModalChat";
import ModalVote from "../../components/Modals/ModalVote";

import "./style.css";

function SlideShow() {
  const socket = useContext(SocketContext);

  const { id, id_slide } = useParams();
  const token = localStorage.getItem("token");
  const data = jwt_decode(token).data;
  const id_User = data.id;
  const userName = data.username;

  const [slideType, setSlideType] = useState(1);
  const [title, setTitle] = useState("");
  const [dataChart, setDataChart] = useState([]);
  const [votings, setVotings] = useState([]);

  const [dataChats, setDataChats] = useState([]);
  const [dataQuestions, setDataQuestions] = useState([]);
  const [prevURL, setPrevURL] = useState("");
  const [nextURL, setNextURL] = useState("");
  const [isPrevShow, setIsPrevShow] = useState(true);
  const [isNextShow, setIsNextShow] = useState(true);
  const [ownerID, setOwnerID] = useState(0);
  const decoded = jwt_decode(token);

  const userID = decoded.data.id;
  const [isMember, setIsMember] = useState(true);

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
      const { data } = await axios.get(`${API_URL}presentation/edit/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOwnerID(data.Data.Owners[0].id);
      ConfigSlides(data.Data.Slides);
      GetChatsAndQuestions(data.Data.Presentations);
      CheckIsMember(data.Data);
    }
    loadSlides();

    socket.emit("join-slide", {
      slideID: id_slide
    });

    return () => {
      socket.off("connect");
      socket.off("received submit");
    };
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
    setVotings(currentSlide[0].content.votings);

    handleNext(newSlideArr);
    handlePrevious(newSlideArr);

    const saveToDB = async () => {
      const content = {
        value: currentSlide[0].content.value,
        title: currentSlide[0].content.title,
        data: currentSlide[0].content.data,
        votings: currentSlide[0].content.votings
      };
      await axios.post(
        `${API_URL}slide/edit/${id_slide}`,
        { slide_type_id: slideType, content: JSON.stringify(content) },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    };

    const handleReceivedSubmit = async (data) => {
      const tempDataChart = [...currentSlide[0].content.data];
      for (let i = 0; i < tempDataChart.length; i += 1) {
        if (tempDataChart[i].name === data.data) {
          tempDataChart[i].count += 1;
          break;
        }
      }
      setDataChart(tempDataChart);

      currentSlide[0].content.votings = [
        ...currentSlide[0].content.votings,
        data
      ];

      setVotings(currentSlide[0].content.votings);
      await saveToDB();
    };
    socket.on("received submit", handleReceivedSubmit);
  };

  const handleFinishSlide = async () => {
    window.location.assign(`/presentation/${id}/slide/${id_slide}`);
  };
  const goToHomePage = async () => {
    window.location.assign(`/`);
  };

  const GetChatsAndQuestions = (data) => {
    if (data !== undefined) {
      let { chats, questions } = data;
      if (chats != null && !Array.isArray(chats)) {
        setDataChats(JSON.parse(chats));
      }

      if (questions != null && !Array.isArray(questions)) {
        setDataQuestions(JSON.parse(questions));
      }
    }
  };

  const CheckIsMember = (data) => {
    const { Owners, Collaborators } = data;

    if (Owners?.length != 0) {
      let findOwnerById = Owners.filter((item) => item.id === id_User);

      if (findOwnerById.length != 0) {
        setIsMember(false);
        return;
      }
    }

    if (Collaborators?.length != 0) {
      let findCollabById = Collaborators.filter((item) => item.id === id_User);

      if (findCollabById.length != 0) {
        setIsMember(false);
        return;
      }
    }

    setIsMember(true);
  };

  useEffect(() => {
    socket.emit("join_presentation_room", {
      id_presentation: id,
      id_User,
      userName
    });
  }, []);

  useEffect(() => {
    socket.on("load_chats_and_questions", (data) => {
      GetChatsAndQuestions(data);
    });
  }, [socket]);

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
        <div className="slideShow__btn-realtime-group">
          <ModalQuestion
            id_User={id_User}
            userName={userName}
            socket={socket}
            dataQuestions={dataQuestions}
            setDataQuestions={setDataQuestions}
            id_presentation={id}
            isMember={isMember}
          />
          <ModalChat
            id_User={id_User}
            userName={userName}
            socket={socket}
            dataChats={dataChats}
            setDataChats={setDataChats}
            id_presentation={id}
          />
          <ModalVote slideType={slideType} votings={votings} />
        </div>
        {userID === ownerID ? (
          <BootstrapButton
            className="btn btn-danger slideShow__btn-finish"
            onClick={() => handleFinishSlide()}
          >
            Stop Presentation
          </BootstrapButton>
        ) : (
          <BootstrapButton
            className="btn btn-info slideShow__btn-finish"
            onClick={() => goToHomePage()}
          >
            Go to HomePage
          </BootstrapButton>
        )}
      </div>
    </div>
  );
}

export default SlideShow;
