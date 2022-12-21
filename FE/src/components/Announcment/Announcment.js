import { Avatar } from "@material-ui/core";
import React, { useState } from "react";

import "./styles.css";

function Announcment() {
  const [announcment, setAnnouncment] = useState([]); // eslint-disable-line
  return (
    <div>
      {announcment.map((item, index) => (
        <div className="amt" key={index}>
          <div className="amt__Cnt">
            <div className="amt__top">
              <Avatar />
              <div>{item.sender}</div>
            </div>
            <p className="amt__txt">{item.text}</p>
            <img className="amt__img" src={item.imageUrl} alt={item.text} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Announcment;
