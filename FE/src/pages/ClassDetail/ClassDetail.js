import NavbarDetail from "../../components/NavbarDetail/NavbarDetail";
import { useParams, Route, Routes } from "react-router-dom";
import Main from "../../components/Main/Main";
import './styles.css';
import People from "../../components/People/People";
import { API_URL } from "../../config";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Invitation from "../Invitation/Invitation";
import Loader from "../../components/Loader/Loader";


function ClassDetail() {
    const [isJoined, setIsJoined] = useState(false);
    const [loading, setLoading] = useState(true);
    let [classes, setClasses] = useState([])
    let [index, setIndex] = useState(0)
    const { id } = useParams();
    //let index = classes.findIndex(element => element.id == id);

    let token = localStorage.getItem("token");
    var decoded = jwt_decode(token);

    const id_User = decoded.data.id;

    async function doGetRequest() {
        let res = await axios.get(API_URL + 'account_group/t', {
        });

        let data = res.data;

        let count = 0;
        for (let i = 0; i < data.length; i++) {
            if (id == data[i].group_id && id_User == data[i].account_id) {
                count++;
            }
        }

        if (count !== 0) {
            setIsJoined(true);
        }

    }


    useEffect(() => {
        const token = localStorage.getItem("token");
        async function loadGroups() {
            const res = await axios.get(API_URL + 'groups', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setClasses(res.data.Groups);
            //setIndex(classes.findIndex(element => element.id == id));
            for (let i = 0; i < res.data.Groups.length; i++) {
                if (res.data.Groups[i].id == id) {
                    setIndex(i);
                    break;
                }
            }
        }
        loadGroups();
        doGetRequest();
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            {
                loading ? <Loader></Loader>
                    :
                    !isJoined ?
                        <div>
                            <Invitation setIsJoined={setIsJoined} />
                        </div>
                        :
                        <div>
                            <NavbarDetail classData={classes[index]}></NavbarDetail>
                            <Routes>
                                <Route index path="" element={<Main classData={classes[index]} />} />
                                <Route index path="/people" element={<People id={id}></People>} />
                            </Routes>
                        </div>
            }

        </>
    )
}

export default ClassDetail;
// user profile