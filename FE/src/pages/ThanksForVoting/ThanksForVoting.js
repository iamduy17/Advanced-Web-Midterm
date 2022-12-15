import React, { useState, useEffect, useContext } from "react";
import img from "../../assets/images/thank-you-for-voting.png";
import {Button} from 'react-bootstrap';
import './style.css';

function ThanksForVoting() {
  return (
    <div className="ThanksForVoting__container">
      <img src={img} className="ThanksForVoting__img"></img>
      <a href="/">
        <Button type="button" name="button" className="ThanksForVoting__btn">Go to homepage</Button>
      </a>
    </div>
  )
}

export default ThanksForVoting;