import React from "react";
import "./Invitation.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";

export default function InvitationCollaborator() {
  const { userID, presentationID } = useParams();
  //const token = localStorage.getItem("token");
  async function handleJoinPresentation() {
    console.log(userID, presentationID);
    await axios.post(`${API_URL}presentation/ConfirmAddCollaborator`, {
      presentationID: presentationID,
      userID: userID
    });

    window.location.replace("http://localhost:3000/presentation");
  }

  return (
    <div>
      <header className="header">
        <span className="textHeader">Invitation to join collaborators</span>
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
              You have an invitation to become a collaborator.
            </span>
            <span style={{ fontSize: "20px" }}>
              {" "}
              You can see the presentation.{" "}
            </span>
          </div>

          <div className="content-container">
            <span className="txt-content" style={{ fontSize: "20px" }}>
              Simply click the big blue button below to become a collaborator.
            </span>
            <button className="btn-join" onClick={handleJoinPresentation}>
              <span className="txt-btn">Join now!</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
