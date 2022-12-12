import React, { useState, useRef, useEffect } from 'react'
import "../ListPresentation/ListPresentation.css"
import Table from 'react-bootstrap/Table';
import { MdOutlineMoreHoriz, MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { API_URL } from "../../config";
import axios from 'axios';

export default function ListPresentation() {
    const [presentations, setPresentations] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const handleClose = () => setLgShow(false);

    const [editShow, setEditShow] = useState(false);
    const handleCloseEdit = () => setEditShow(false);

    const [namePresentation, setNamePresentation] = useState("");
    const [renamePresentation, setRenamePresentation] = useState("")

    const form = useRef();
    const date = new Date();
    const currentDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function loadGroups() {
            const res = await axios.get(API_URL + 'presentation', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setPresentations(res.data.Presentations);
        }
        loadGroups();

    }, []);


    // Create a presentation
    const handleCreate = async () => {
        setLgShow(false);

        const res = await axios.post(API_URL + 'presentation/create', { name: namePresentation, created_at: currentDate }, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        window.location.reload();
    };

    // Rename a spresentation
    const handleEdit = async (id) => {
        const res = await axios.post(API_URL + `presentation/edit/${id}`, { name: renamePresentation }, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        window.location.reload();
        console.log(res);
    }

    const handleDelete = async (id) => {
        const res = await axios.post(API_URL + `presentation/delete/${id}`, {}, {
            headers: {
                Authorization: 'Bearer ' + token,

            },
        });

        window.location.reload();
        console.log(res);
    };

    const handleLink = (id) => {
        window.location.replace(window.location.href + `/${id}`);
    };

    return (
        <div>
            <div className='header-list-presentation'>
                <div className='header-text'>My presentations</div>
                <button type="button" className='btn-add-presentation' onClick={() => setLgShow(true)}> + New Presentation</button>
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

            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>List Presentations</h5>
                </div>

                <div className='list-presentation'>
                    <Table hover className='table'>
                        <thead className='thead'>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Slide number</th>
                                <th>Date Created</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                presentations.map((presentation, index) => (
                                    <tr className='tr' key={index}>
                                        <td onClick={() => handleLink(presentation.id)}>{index + 1}</td>
                                        <td onClick={() => handleLink(presentation.id)}>{presentation.name}</td>
                                        <td onClick={() => handleLink(presentation.id)}>{presentation.slide_count}</td>
                                        <td onClick={() => handleLink(presentation.id)}>{presentation.created_at}</td>
                                        <td>
                                            <Menu menuButton={<MenuButton className='btn-more'><MdOutlineMoreHoriz /></MenuButton>} transition>
                                                <MenuItem className='btn-edit' onClick={() => { setEditShow(true) }}><AiFillEdit
                                                    style={{ "marginRight": "7px", "fontSize": "20px" }} />Edit</MenuItem>
                                                <MenuItem className='btn-del' onClick={() => handleDelete(presentation.id)}><MdDelete
                                                    style={{ "marginRight": "7px", "fontSize": "20px" }} />Detele</MenuItem>
                                                <Modal
                                                    size=""
                                                    show={editShow}
                                                    onHide={() => setEditShow(false)}
                                                    aria-labelledby="example-modal-sizes-title-lg"
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title id="example-modal-sizes-title-lg">
                                                            Rename presentation
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <form ref={form} className="invitation-form">
                                                            <input className='btn_input' type="text" name="name-presentation" value={renamePresentation}
                                                                onChange={(e) => setRenamePresentation(e.target.value)}
                                                                placeholder="Rename presentation"
                                                            />
                                                        </form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="danger" onClick={handleCloseEdit}>
                                                            Close
                                                        </Button>
                                                        <Button variant="primary" onClick={() => handleEdit(presentation.id)}>
                                                            Save
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div >
    )
}