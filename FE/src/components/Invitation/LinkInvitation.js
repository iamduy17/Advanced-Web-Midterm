import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { HiOutlineUserAdd } from 'react-icons/hi';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Invitation/Invitation.css";

export default function LinkInvitation() {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const URL = window.location.href.substring(0, window.location.href.length - 7);

    console.log(URL)

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_0g4lmqn', 'template_vemz9at', form.current, 'GKzUVk3RmV9i_U1ma')
            .then((result) => {
                console.log(result.text);
                console.log("email has been sent");
            }, (error) => {
                console.log(error.text);
            });

        setEmail("");
        toast("Email has been sent !", {
            autoClose: 1000
        });
    };

    return (
        <div>
            <HiOutlineUserAdd className='btn-add' onClick={handleShow} />
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Gửi lời mời tham gia lớp học bằng Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form ref={form} className="invitation-form">
                        <label style={{ color: "black" }}>Email:</label>
                        <input className='btn_input' type="email" name="user_email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className='btn_input' type="email" name="URL" onChange={() => { }} value={URL} style={{ display: "none" }} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: "red" }} variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button style={{ backgroundColor: "blue" }} variant="secondary" onClick={sendEmail}>
                        Send
                    </Button>
                    <ToastContainer />
                </Modal.Footer>
            </Modal>
        </div>
    )
}