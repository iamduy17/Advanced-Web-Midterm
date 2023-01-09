import { InputGroup, Form } from "react-bootstrap";
import { Button, IconButton } from "@mui/material";
import { Add, Close, Delete, Save } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import multiple from "../../assets/images/bar-graph.png";
import paragraph from "../../assets/images/paragraph.png";
import heading from "../../assets/images/heading.png";
import NavbarSlide from "../../components/NavbarSlide/NavbarSlide";
import SlideDetail from "../../components/SlideDetail/SlideDetail";
import { API_URL } from "../../config";

import "./style.css";

const dataChartShow = [
  {
    name: "Option 1",
    count: 0
  },
  {
    name: "Option 2",
    count: 0
  },
  {
    name: "Option 3",
    count: 0
  }
];

const slideTypes = [
  {
    value: 1,
    title: "Multiple Choice",
    data: dataChartShow
  },
  {
    value: 2,
    title: "Heading",
    data: {
      Subheading: ""
    }
  },
  {
    value: 3,
    title: "Paragraph",
    data: {
      Paragraph: ""
    }
  }
];

function PresentationDetail() {
  const { id, id_slide } = useParams();

  const token = localStorage.getItem("token");

  const [presentationName, setPresentationName] = useState("");
  const [slideTypeList, setSlideTypeList] = useState(slideTypes);
  const [slideType, setSlideType] = useState(slideTypeList[0].value);
  const [presentationGroupID, setPresentationGroupID] = useState(0);
  const [title, setTitle] = useState(slideTypeList[0].title);
  const [dataChart, setDataChart] = useState(slideTypeList[0].data);
  const [slides, setSlides] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSlides() {
      const { data } = await axios.get(`${API_URL}presentation/edit/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPresentationName(data.Data.Presentation.name);
      addPropToSlides(data.Data.Slides);
      setPresentationGroupID(data.Data.Presentation.group_id);
    }
    loadSlides();
  }, []);

  const addPropToSlides = (list) => {
    const newSlideArr = [...list];
    if (newSlideArr.length !== 0) {
      newSlideArr.map((item) => {
        if (typeof item.content !== "object") {
          item.content = JSON.parse(item.content);
        }
      });
    }

    setSlides(newSlideArr);

    const currentSlide = newSlideArr.filter((item) => item.id == id_slide);
    setSlideType(currentSlide[0].content.value);
    setTitle(currentSlide[0].content.title);
    setDataChart(currentSlide[0].content.data);

    let newSlideTypeList = [...slideTypeList];
    newSlideTypeList.map((item) => {
      if (item.value === currentSlide[0].content.value) {
        item.title = currentSlide[0].content.title;
        item.data = currentSlide[0].content.data;
      }
    });

    setSlideTypeList(newSlideTypeList);
  };

  const handleClickSlideItem = (index) => () => {
    const newSlideArr = [...slides];
    newSlideArr.map((item) => (item.active = false));
    newSlideArr[index].active = true;

    setSlides(newSlideArr);
  };

  const handleTitleChange = (e) => {
    if (e.target.value.length !== 0) {
      setTitle(e.target.value);
    }
  };

  const handleOptionChange = (index) => (e) => {
    const newData = [...dataChart];
    newData[index].name = e.target.value;
    setDataChart(newData);
  };

  const handleCloseOption = (index) => () => {
    const newData = [...dataChart];
    newData.splice(index, 1);
    setDataChart(newData);
  };

  const handleAddingOption = () => {
    const newData = [...dataChart];
    const number = newData.length + 1;
    const newOption = {
      name: `Option ${number}`,
      count: 0
    };

    newData.push(newOption);
    setDataChart(newData);
  };

  const handleEditSlide = async () => {
    const newContent = {
      value: slideType,
      title,
      data: dataChart
    };

    const { data } = await axios.post(
      `${API_URL}slide/edit/${id_slide}`,
      {
        slide_type_id: slideType,
        content: JSON.stringify(newContent)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (data.ReturnCode !== 200) {
      setError(data.Message);
      handleErrorResponse(data.Message);
    } else {
      window.location.reload();
    }
  };

  const handleDeleteSlide = async () => {
    if (slides.length === 1) {
      const message = "Can't delete all slides!";
      setError(message);
      handleErrorResponse(message);
      return;
    }

    const { data } = await axios.post(
      `${API_URL}slide/delete/${id_slide}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (data.ReturnCode !== 200) {
      setError(data.Message);
      handleErrorResponse(data.Message);
    } else {
      const index = slides?.filter((item) => item.id != id_slide);

      const currentUrl = window.location.href;
      const newURL =
        currentUrl.substring(0, currentUrl.length - 2) + index[0].id;
      window.location.assign(newURL);
    }
  };

  function handleErrorResponse(error) {
    setError(error);

    setTimeout(() => {
      setError("");
    }, 5000);
  }

  const handleChangeSlideType = (e) => {
    const value = parseInt(e.target.value);
    const slideTypeItem = slideTypeList.filter((item) => item.value === value);

    setSlideType(value);
    setTitle(slideTypeItem[0].title);
    setDataChart(slideTypeItem[0].data);
  };

  const handleSubheadingAndParagraph = (e) => {
    const { value } = e.target;

    if (slideType === 2)
      setDataChart({
        Subheading: value
      });
    else if (slideType === 3) {
      setDataChart({
        Paragraph: value
      });
    }
  };

  return (
    <div id="root-content">
      {error.length !== 0 && (
        <div
          className="alert alert-danger login__alert"
          style={{ background: "red", top: "3rem", color: "white" }}
          role="alert"
        >
          {error}
        </div>
      )}
      <NavbarSlide
        name={presentationName}
        handleErrorResponse={handleErrorResponse}
        setError={setError}
        id={id}
        presentationGroupID={presentationGroupID}
      />
      <div className="slide__container">
        <div className="slide__col1">
          {slides.length !== 0 &&
            slides.map((item, index) => (
              <Button
                key={index}
                onClick={handleClickSlideItem(index)}
                className={
                  item.id == id_slide
                    ? "slide__list-item slide__list-item-focus"
                    : "slide__list-item"
                }
                href={`/presentation/${id}/slide/${item.id}`}
                style={{ textDecoration: "none" }}
              >
                <span className="slide__slide-item-text">{index + 1}</span>
                <div className="slide__slide-item">
                  <img
                    alt="multiple-choice"
                    src={
                      item.content.value === 1
                        ? multiple
                        : item.content.value === 2
                        ? heading
                        : paragraph
                    }
                  />
                  <p
                    style={{
                      margin: "0.5rem",
                      textAlign: "center",
                      textTransform: "none"
                    }}
                  >
                    {item.content.title}
                  </p>
                </div>
              </Button>
            ))}
        </div>
        <div className="slide__col2">
          <SlideDetail
            slideType={slideType}
            title={title}
            dataChart={dataChart}
          />
        </div>
        <div className="slide__col3">
          <div className="slide__detail">
            <p className="slide__type-text">Slide Type</p>
            <Form.Select
              className="form-control mb-3"
              value={slideType}
              onChange={handleChangeSlideType}
            >
              <option value="1">Multiple Choice</option>
              <option value="2">Heading</option>
              <option value="3">Paragraph</option>
            </Form.Select>
          </div>
          <hr />
          <div className="slide__detail">
            {slideType === 1 ? (
              <>
                <p className="slide__type-text">Slide Title</p>
                <InputGroup className="mb-3">
                  <Form.Control value={title} onChange={handleTitleChange} />
                </InputGroup>
              </>
            ) : (
              <>
                <p className="slide__type-text">Heading</p>
                <InputGroup className="mb-3">
                  <Form.Control value={title} onChange={handleTitleChange} />
                </InputGroup>
              </>
            )}
          </div>
          <hr />
          <div className="slide__detail">
            {slideType === 1 ? (
              <>
                <p className="slide__type-text">Options</p>
                {dataChart.map((item, index) => (
                  <div className="mb-3 slide__option-item" key={index}>
                    <InputGroup className="slide__input-group">
                      <Form.Control
                        value={item.name}
                        name={item.name}
                        onChange={handleOptionChange(index)}
                      />
                    </InputGroup>
                    <IconButton
                      onClick={handleCloseOption(index)}
                      aria-label="close option"
                    >
                      <Close />
                    </IconButton>
                  </div>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  style={{ width: "100%", textTransform: "none" }}
                  onClick={handleAddingOption}
                >
                  Add option
                </Button>
              </>
            ) : slideType === 2 ? (
              <>
                <p className="slide__type-text">Subheading</p>
                <InputGroup className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    maxLength={500}
                    value={dataChart.Subheading}
                    onChange={handleSubheadingAndParagraph}
                  />
                </InputGroup>
              </>
            ) : (
              <>
                <p className="slide__type-text">Paragraph</p>
                <InputGroup className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={dataChart.Paragraph}
                    maxLength={800}
                    onChange={handleSubheadingAndParagraph}
                  />
                </InputGroup>
              </>
            )}
          </div>
          <hr />
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            style={{
              width: "100%",
              textTransform: "none",
              marginBottom: "1rem"
            }}
            onClick={handleEditSlide}
          >
            Save Your Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            style={{ width: "100%", textTransform: "none" }}
            onClick={handleDeleteSlide}
          >
            Delete Slide
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PresentationDetail;
