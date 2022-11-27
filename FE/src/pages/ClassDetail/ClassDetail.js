import NavbarDetail from "../../components/NavbarDetail/NavbarDetail";
import { useParams, Route, Routes } from "react-router-dom";
import Main from "../../components/Main/Main";
import './styles.css';
import People from "../../components/People/People";
import { API_URL } from "../../config";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import React, { useState } from "react";
import Invitation from "../Invitation/Invitation";


function ClassDetail({ classes }) {
    const [isJoined, setIsJoined] = useState(false);
    const { id } = useParams();
    let index = classes.findIndex(element => element.id == id);


    let token = localStorage.getItem("token");
    var decoded = jwt_decode(token);

    const id_User = decoded.data.id;
    console.log("tokenAcess: ", decoded.data.id);

    async function doGetRequest() {
        let res = await axios.get(API_URL + 'account_group/t', {
        });

        let data = res.data;
        console.log(data);
        const id1 = 10;
        const id_User1 = 1;

        let count = 0;
        for (let i = 0; i < data.length; i++) {
            if (id1 === data[i].group_id && id_User1 === data[i].account_id) {
                count++;
            }
        }

        if (count !== 0) {
            setIsJoined(true);
        }

    }
    doGetRequest();

    return (
        <>
            {
                !isJoined ? <Invitation setIsJoined={setIsJoined} /> :
                    <div>
                        <NavbarDetail classData={classes[index]}></NavbarDetail>
                        <Routes>
                            <Route index path="" element={<Main classData={classes[index]} />} />
                            <Route index path="/people" element={<People></People>} />
                        </Routes>
                    </div>
            }

        </>
    )
}

export default ClassDetail;