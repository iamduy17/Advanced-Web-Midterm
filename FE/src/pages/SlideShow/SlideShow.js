import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { ArrowCircleRightRounded, ArrowCircleLeftRounded } from '@mui/icons-material';

import SlideDetail from "../../components/SlideDetail/SlideDetail";
import { API_URL } from "../../config";
import { SocketContext } from '../../context/socket';
import BootstrapButton from "react-bootstrap/Button";

import './style.css';

function SlideShow() {
    const socket = useContext(SocketContext);
    const { id, id_slide } = useParams();
    let token = localStorage.getItem("token");

    const [title, setTitle] = useState("");
    const [dataChart, setDataChart] = useState([]);
    const [prevURL, setPrevURL] = useState("");
    const [nextURL, setNextURL] = useState("");
    const [isPrevShow, setIsPrevShow] = useState(true);
    const [isNextShow, setIsNextShow] = useState(true);

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        async function loadSlides() {
            const { data } = await axios.get(API_URL + `presentation/get/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            ConfigSlides(data.Data.Slide);
        }
        loadSlides();
    }, []);

    const ConfigSlides = (list) => {
        let newSlideArr = [...list];
        if (newSlideArr.length !== 0) {
            newSlideArr.map(item => {
                item.content = JSON.parse(item.content);
            });
        }

        const currentSlide = newSlideArr.filter(item => item.id == id_slide);
        setTitle(currentSlide[0].content.title);
        setDataChart(currentSlide[0].content.data);
        handleNext(newSlideArr);
        handlePrevious(newSlideArr);
        const handleReceivedSubmit = (data) => {
            const temp = [...currentSlide[0].content.data];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].name === data) {
                    temp[i].count++;
                    break;
                }
            }
            setDataChart(temp);
        }
        socket.on('received submit', handleReceivedSubmit);

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            socket.off('connect');
            socket.off('received submit', handleReceivedSubmit);
            socket.off('disconnect');
        };
    }

    const handlePrevious = (slideList) => {
        let currentIndex = 0;
        slideList.forEach((item, index) => {
            if (item.id == id_slide) {
                currentIndex = index - 1;
            }
        });
        const newURL = showSlide(slideList, currentIndex);

        setPrevURL(newURL);
    }

    const handleNext = (slideList) => {
        let currentIndex = 0;
        slideList.forEach((item, index) => {
            if (item.id == id_slide) {
                currentIndex = index + 1;
            }
        });

        const newURL = showSlide(slideList, currentIndex);

        setNextURL(newURL);
    }

    const showSlide = (slideList, indexToChange) => {
        if (slideList.length == 1) {
            setIsPrevShow(false);
            setIsNextShow(false);
        }
        else if (indexToChange == slideList.length) {
            setIsNextShow(false);
            setIsPrevShow(true);

        }
        else if (indexToChange < 0) {
            setIsNextShow(true);
            setIsPrevShow(false);
        }


        return `/presentation/${id}/slide/${slideList[indexToChange]?.id}/slideshow`
    }

    const handleFinishSlide = async() => {
        const content = {
            title: title,
            data: dataChart
        };
        await axios.post(API_URL + `slide/edit/${id_slide}`, { content: JSON.stringify(content)}, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        window.location.assign(`/presentation/${id}/slide/${id_slide}`);
    }

    return (
        <div id="root-content">
            <div className="slideShow__contain">
                <SlideDetail title={title} dataChart={dataChart}></SlideDetail>
                <div className="slideShow__btn-group">
                    <Button href={prevURL} style={!isPrevShow ? { visibility: "hidden" } : {}} aria-label="prev option">
                        <ArrowCircleLeftRounded style={{ width: "unset", height: "unset" }} />
                    </Button>
                    <Button href={nextURL} style={!isNextShow ? { visibility: "hidden" } : {}} aria-label="next option">
                        <ArrowCircleRightRounded style={{ width: "unset", height: "unset" }} />
                    </Button>
                    
                </div>
                
            </div>
            <BootstrapButton className="slideShow__btn-finish" onClick={() => handleFinishSlide()}>Finish</BootstrapButton>
        </div>
    )
}

export default SlideShow;