import React from 'react';
import { BiCopy } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LinkInvitation() {
    const handleCopy = () => {
        const URL = window.location.href;
        navigator.clipboard.writeText(URL);
        console.log(URL);
        toast("Đã sao chép đường liên kết!",
            {
                autoClose: 1000
            });
    };

    return (
        <div>
            <BiCopy className='btn-copy' onClick={handleCopy} />
            <ToastContainer />
        </div>
    )
}

export default LinkInvitation;