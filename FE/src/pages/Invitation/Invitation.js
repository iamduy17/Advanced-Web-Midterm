import React from 'react'
import "../Invitation/Invitation.css";

export default function Invitation({ setIsJoined }) {

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
                        <button className='btn-join' onClick={() => {
                            setIsJoined(true)
                        }}><span className='txt-btn'>Tham gia lớp học</span></button>
                    </div>
                </div>
            </div>
        </div >
    )
}
