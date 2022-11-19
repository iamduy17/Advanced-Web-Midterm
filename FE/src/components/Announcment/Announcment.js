import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import "./style.css";
const Announcment = ({ classData }) => {
  const [announcment, setAnnouncment] = useState([]);
  console.log(announcment);
  return (
    <div>
      {announcment.map((item) => (
        <div className="amt">
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
};

export default Announcment;