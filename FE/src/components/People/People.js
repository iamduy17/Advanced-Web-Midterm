import { Avatar } from "@material-ui/core";
import EmailInvitation from "../Invitation/EmailInvitation";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { API_URL } from "../../config/index"
import "./People.css"
import Person from "./Person";


function People({ id }) {
    let [owners, setOwners] = useState([]);
    let [coOwners, setCoOwners] = useState([]);
    let [members, setMembers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        async function getGroup(id) {
            const res = await axios.get(API_URL + 'groups/' + id, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setOwners(res.data.Data.Owners);
            setCoOwners(res.data.Data.CoOwners);
            setMembers(res.data.Data.Members);
        }

        getGroup(id);
    }, [])


    return (

        <div className="container">
            <div className="role-item">
                <div className="owner-title">
                    <h1 className="title">Owner</h1>
                    <EmailInvitation />
                </div>
                <hr className="divider"></hr>
                {owners.map((item, index) => <Person key={index} name={item.username}></Person>)}

            </div >
            <div className="role-item">
                <h1 className="title">Co-Owner</h1>
                <hr className="divider"></hr>
                {coOwners.map((item, index) => <Person key={index} name={item.username}></Person>)}
            </div >
            <div className="role-item">
                <h1 className="title">Member</h1>
                <hr className="divider"></hr>
                {members.map((item, index) => <Person key={index} name={item.username}></Person>)}
            </div >
        </div >
    )
}

export default People;

