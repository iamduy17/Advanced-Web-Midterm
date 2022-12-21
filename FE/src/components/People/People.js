import React, { useState, useEffect } from "react";
import axios from "axios";
import EmailInvitation from "../Invitation/EmailInvitation";
import { API_URL } from "../../config/index";
import "./People.css";
import Person from "./Person";

function People({ id }) {
  const [owners, setOwners] = useState([]);
  const [coOwners, setCoOwners] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function getGroup(id) {
      const res = await axios.get(`${API_URL}groups/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOwners(res.data.Data.Owners);
      setCoOwners(res.data.Data.CoOwners);
      setMembers(res.data.Data.Members);
    }

    getGroup(id);
  }, []);

  return (
    <div className="container-people">
      <div className="role-item">
        <div className="owner-title">
          <h1 className="title">Owner</h1>
          <EmailInvitation />
        </div>
        <hr className="divider" />
        {owners.map((item, index) => (
          <Person
            key={`${index.toString()}owner`}
            name={item.username}
            id={item.id}
            classID={id}
            role={1}
          />
        ))}
      </div>
      <div className="role-item">
        <h1 className="title">Co-Owner</h1>
        <hr className="divider" />
        {coOwners.map((item, index) => (
          <Person
            key={`${index.toString()}coOwner`}
            name={item.username}
            id={item.id}
            classID={id}
            role={2}
          />
        ))}
      </div>
      <div className="role-item">
        <h1 className="title">Member</h1>
        <hr className="divider" />
        {members.map((item, index) => (
          <Person
            key={`${index.toString()}members`}
            name={item.username}
            id={item.id}
            classID={id}
            role={3}
          />
        ))}
      </div>
    </div>
  );
}

export default People;
