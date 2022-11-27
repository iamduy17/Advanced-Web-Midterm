import React from 'react'
import { useParams } from "react-router-dom";
import "../Invitation/Invitation.css";
import { API_URL } from "../../config";
import jwt_decode from "jwt-decode";
import axios from 'axios';

export default function Invitation({ setIsJoined }) {
    const { id } = useParams();
    let token = localStorage.getItem("token");
    var decoded = jwt_decode(token);

    const id_User = decoded.data.id;

    let account_group = {
        group_id: id,
        account_id: id_User,
        role: 1
    };

    async function JoinHandle() {
        setIsJoined(true);
        await axios.post(API_URL + 'account_group', account_group)
            .then((res) => {
                console.log(res);
            });
    }

    return (
        <div>
            <header className='header'>
                <span className='textHeader'>Tham gia lớp học của bạn</span>
            </header>

            <div className='ct'>
                <div className='container'>
                    <div className='header-container'>
                        <img className='img-picture' src="https://www.gstatic.com/classroom/logo_square_rounded.svg" alt="..." />
                        <img src="https://www.gstatic.com/classroom/product_name.svg" alt="..." />
                        <span>Lớp học giúp các lớp học giao tiếp, tiết kiệm thời gian và</span>
                        <span>luôn có tổ chức.</span>
                    </div>

                    <div className='content-container'>
                        <span className='txt-content'>Bạn đang tham gia lớp học với tư cách thành viên.</span>
                        <button className='btn-join' onClick={JoinHandle}><span className='txt-btn'>Tham gia lớp học</span></button>
                    </div>
                </div>
            </div>
        </div >
    )
}
