import React, { useState, useRef } from 'react'
import logo from "../../assets/images/logo.jpg"
import "../Presentations/Presentations.css"
import imgPresentaion from "../../assets/images/nopresentation.jpg"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListPresentation from '../../components/ListPresentation/ListPresentation';

export default function Presentations() {
    const [lgShow, setLgShow] = useState(false);
    const [namePresentation, setNamePresentation] = useState("")
    const form = useRef();
    const [presentations, setPresentations] = useState([
        {
            id: "3",
            name: "namePresentation",
            slideNumber: 3,
            dateCreated: "12/12/2022"
        }
    ]);

    const handleClose = () => setLgShow(false);

    const handleCreate = () => {
        setPresentations([presentations, {
            id: "3",
            name: "namePresentation",
            slideNumber: 3,
            dateCreated: "12/12/2022"
        }]);
        setNamePresentation("");
        setLgShow(false);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar__left">
                    <a href="/">
                        <img
                            src={logo}
                            alt="DND Logo"
                            className="navbardetail__logo"
                            style={{ cursor: "pointer" }}
                        />
                    </a>{" "}
                    <span>DND Group</span>
                </div>
            </nav>

            <div className='presentation'>
                <div className='menu-presentations'>
                    <div className='btn-menu'><span className='title-btn-menu'>My presentations</span></div>
                    <div className='btn-menu'><span className='title-btn-menu'>Tempalates</span></div>
                    <div className='btn-menu'><span className='title-btn-menu'>Logout</span></div>
                </div>

                <div className='content-presentations'>
                    {
                        presentations.length === 0 ?
                            <div>
                                <div className='no-presentation'>
                                    <img className='img-presentaion' src={imgPresentaion} alt='...'></img>
                                    <span style={{ "fontWeight": "bold" }}>
                                        Start creating interactive and engaging presentations to include your audience.
                                    </span>
                                    <button className='btn-new-presentation' onClick={() => setLgShow(true)}> + New Presentation</button>
                                    <Modal
                                        size="lg"
                                        show={lgShow}
                                        onHide={() => setLgShow(false)}
                                        aria-labelledby="example-modal-sizes-title-lg"
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title id="example-modal-sizes-title-lg">
                                                Create new presentation
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <form ref={form} className="invitation-form">
                                                <input className='btn_input' type="text" name="name-presentation" value={namePresentation}
                                                    onChange={(e) => setNamePresentation(e.target.value)}
                                                    placeholder="Presentation name"
                                                />
                                            </form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="danger" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={handleCreate}>
                                                Create Presentation
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                            :
                            <div>
                                <ListPresentation />
                            </div>
                    }

                </div>
            </div>
        </div>
    )
}
