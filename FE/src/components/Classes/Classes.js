import { Avatar } from "@material-ui/core";
import { FolderOpen, PermContactCalendar } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

import group from "../../assets/images/training.jpg";
import "./styles.css";

function Classes({ classData }) {
  // eslint-disable-line
  return (
    <li className="class__list">
      <div className="class__wrapper">
        <div className="class__container">
          <div className="class__imgWrapper" />
          <div className="class__image" />
          <div className="class__content">
            <Link
              className="class__title"
              to={`/${classData.id}`}
              style={{ textDecoration: "none" }}
            >
              {classData.className}
            </Link>
          </div>
        </div>
        <Avatar className="class__avatar" src={group} />
      </div>
      <div className="class__bottom">
        <PermContactCalendar />
        <FolderOpen />
      </div>
    </li>
  );
}

export default Classes;
