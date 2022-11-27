import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";
import wallpaper from "../../assets/images/wallpaper.jpg"
import { useParams } from 'react-router-dom';

export default function Profile() {
    const { id_user } = useParams()
    console.log(id_user);
    return (
        <div className='main'>
            <Navbar />
            <div className='profile'>
                <div className='user'>
                    <img className='img-user' src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg" alt="avatar" />
                    <div className='info-user'>
                        Duong Nam
                    </div>
                </div>
            </div>
            <div className='activity'>
                <div className='img-container'>
                    <img className='img-wallpaper' src={wallpaper} alt="avatar" />
                </div>
                <div className='info-activity'>
                    Không có hoạt động nào được giao!
                </div>
            </div>
        </div>
    )
}
