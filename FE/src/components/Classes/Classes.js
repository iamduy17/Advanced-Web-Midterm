import { Avatar } from "@material-ui/core";
import { FolderOpen, PermContactCalendar } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Classes = ({ classData }) => {
  return (
    <li className="class__list">
      <div className="class__wrapper">
        <div className="class__container">
          <div className="class__imgWrapper" />
          <div className="class__image" />
          <div className="class__content">
            <Link className="class__title" to={`/${classData.id}`}>
              <h2>{classData.className}</h2>
            </Link>
            <p className="class__owner">{classData.owner}</p>
          </div>
        </div>
        <Avatar
          className="class__avatar"
          src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg"
        />
      </div>
      <div className="class__bottom">
        <PermContactCalendar />
        <FolderOpen />
      </div>
    </li>
  );
};

export default Classes;