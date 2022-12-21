import React from "react";
import { Button } from "react-bootstrap";
import img from "../../assets/images/thank-you-for-voting.png";
import "./style.css";

function ThanksForVoting() {
  return (
    <div className="ThanksForVoting__container">
      <img src={img} alt="ThanksForVoting" className="ThanksForVoting__img" />
      <a href="/">
        <Button type="button" name="button" className="ThanksForVoting__btn">
          Go to homepage
        </Button>
      </a>
    </div>
  );
}

export default ThanksForVoting;
