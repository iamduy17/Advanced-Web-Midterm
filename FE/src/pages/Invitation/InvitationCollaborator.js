import React from "react";
import "./Invitation.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";

export default function InvitationCollaborator() {
  const { userID, presentationID } = useParams();
  //const token = localStorage.getItem("token");
  const handleJoinPresentation = async () => {
    console.log(userID, presentationID);
    await axios.post(`${API_URL}presentation/ConfirmAddCollaborator`, {
      presentationID: parseInt(presentationID),
      userID: parseInt(userID)
    });

    window.location.replace("http://localhost:3000/presentation");
  };

  return (
    <div>
      <header className="header1">
        <span className="textHeader">Invitation to join collaborators</span>
      </header>

      <div className="ct">
        <div className="container">
          <div className="header-container2">
            <img
              className="img-picture2"
              src="https://img.icons8.com/external-filled-outline-satawat-anukul/512/external-card-wedding-filled-outline-satawat-anukul-2.png"
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
              Simply click the big blue button belowto become a collaborator.
            </span>
            <span
              className="txt-content2"
              style={{ fontSize: "18px", fontStyle: "italic" }}
            >
              You can view and edit the presentation.
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
