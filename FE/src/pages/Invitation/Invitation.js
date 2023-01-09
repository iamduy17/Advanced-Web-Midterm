import React from "react";
import { useParams } from "react-router-dom";
import "./Invitation.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { API_URL } from "../../config";
import io from "socket.io-client";

const socket = io.connect(API_URL);

export default function Invitation({ setIsJoined }) {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  const id_User = decoded.data.id;

  const account_group = {
    group_id: id,
    account_id: id_User,
    role: 3
  };

  async function JoinHandle() {
    setIsJoined(true);
    await axios.post(`${API_URL}account_group`, account_group).then(() => {});

    setIsJoined(false);
    console.log(account_group);
    socket.emit("memberGroup", { id_User, id });

    window.location.reload();
  }

  return (
    <div>
      <header className="header">
        <span className="textHeader">Join your group!</span>
      </header>

      <div className="ct">
        <div className="container">
          <div className="header-container">
            <img
              className="img-picture"
              src="https://www.gstatic.com/classroom/logo_square_rounded.svg"
              alt="..."
            />
            <span
              style={{
                fontSize: "30px",
                fontWeight: "bold"
              }}
            >
              DND Group
            </span>
            <span style={{ fontSize: "20px" }}>
              Group help classes communicate, save time and
            </span>
            <span style={{ fontSize: "20px" }}>always organized.</span>
          </div>

          <div className="content-container">
            <span className="txt-content" style={{ fontSize: "20px" }}>
              You are joining the group as a member.
            </span>
            <button className="btn-join" onClick={JoinHandle}>
              <span className="txt-btn">Join Group Now!</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
