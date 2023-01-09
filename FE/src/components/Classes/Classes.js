import { Avatar } from "@material-ui/core";
import { FolderOpen, PermContactCalendar } from "@material-ui/icons";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { API_URL } from "../../config/index";
import group from "../../assets/images/training.jpg";
import "./styles.css";

function Classes({ classData }) {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const id_User = decoded.data.id;
  const [roleUser, setRoleUser] = useState();

  useEffect(() => {
    const getRoleUser = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        API_URL + "account_group/roleUser",
        { group_id: classData.id, account_id: id_User },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      setRoleUser(res.data.role);
    };

    getRoleUser();
  }, []);

  const handleDeleteGroup = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      API_URL + "groups/removeGroup",
      { group_id: classData.id, account_id: id_User },
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    window.location.reload();
  };

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
        {roleUser === 1 ? (
          <DeleteIcon className="deleteicon" onClick={handleDeleteGroup} />
        ) : null}
      </div>
    </li>
  );
}

export default Classes;
