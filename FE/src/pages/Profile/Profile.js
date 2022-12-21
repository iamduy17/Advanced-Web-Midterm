import React from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";
import wallpaper from "../../assets/images/wallpaper.jpg";
import resume from "../../assets/images/resume.png";

export default function Profile() {
  const { name } = useParams();
  return (
    <div id="root-content">
      <Navbar />

      <div className="main">
        <div className="profile">
          <div className="user">
            <img className="img-user" src={resume} alt="avatar" />
            <div className="info-user">{name}</div>
          </div>
        </div>
        <div className="activity">
          <div className="img-container">
            <img className="img-wallpaper" src={wallpaper} alt="avatar" />
          </div>
          <div className="info-activity">Không có hoạt động nào được giao!</div>
        </div>
      </div>
    </div>
  );
}
