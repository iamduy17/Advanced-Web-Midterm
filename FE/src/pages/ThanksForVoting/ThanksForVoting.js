import React, { useState, useEffect, useContext } from "react";
import img from "../../assets/images/thank-you-for-voting.png";
import './style.css';

function ThanksForVoting() {
  return (
    <div img="container__thanks_for_voting">
      <img src={img} width="100%" height="100%" className="img__thanks_for_voting"></img>
      <a href="/">
        <button type="button" name="button" className="btn__thanks_for_voting">Go to homepage</button>
      </a>
    </div>
  )
}

export default ThanksForVoting;