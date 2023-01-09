import React from "react";
import { Button } from "react-bootstrap";
import img from "../../assets/images/forbidden.png";
import "./style.css";

function Forbidden() {
  return (
    <div className="Forbidden__container">
      <img src={img} alt="Forbidden" className="Forbidden__img" />
      <a href="/">
        <Button type="button" name="button" className="Forbidden__btn">
          Go to homepage
        </Button>
      </a>
    </div>
  );
}

export default Forbidden;
