import {
  Avatar,
  IconButton,
  MenuItem,
  Menu,
  CardHeader
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";

import React, { useState } from "react";
import "./Person.css";
import { Link } from "react-router-dom";
import { API_URL } from "../../config/index";

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function Person({ id, name, classID, role }) {
  const roleMap = {
    1: "Owner",
    2: "Co-Owner",
    3: "Member"
  };
  const generateMenu = () => {
    const roles = [];
    for (let i = 1; i < 4; i++) {
      if (i == role) {
        continue;
      }
      roles.push(i);
    }
    return roles.map((role, index) => (
      <MenuItem
        key={index}
        onClick={() => {
          const newRole = getKeyByValue(roleMap, roleMap[role]);
          handleChangeRole(newRole);
        }}
      >
        {roleMap[role]}
      </MenuItem>
    ));
  };
  const handleChangeRole = async (newRole) => {
    const token = localStorage.getItem("token");

    await axios.post(
      `${API_URL}groups/changeRole`,
      { group_id: classID, account_id: id, role: newRole },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    window.location.reload();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="person">
      <Link to={`/profile/${name}`}>
        <CardHeader className="person-card" avatar={<Avatar />} title={name} />
      </Link>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {generateMenu()}
      </Menu>
    </div>
  );
}

export default Person;
