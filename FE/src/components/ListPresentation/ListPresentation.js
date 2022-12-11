import React, { useState, useRef } from 'react'
import "../ListPresentation/ListPresentation.css"
import Table from 'react-bootstrap/Table';
import { MdOutlineMoreHoriz, MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ListPresentation() {
    const [presentations, setPresentations] = useState([
        {
            id: "1",
            name: "presentation",
            slideNumber: 2,
            dateCreated: "12/12/2022"
        },
        {
            id: "2",
            name: "abc",
            slideNumber: 3,
            dateCreated: "12/12/2022"
        },
    ]);

    const [lgShow, setLgShow] = useState(false);
    const [namePresentation, setNamePresentation] = useState("")
    const form = useRef();
    const handleClose = () => setLgShow(false);

    const handleCreate = () => {
        setPresentations([...presentations, {
            id: "3",
            name: namePresentation,
            slideNumber: 3,
            dateCreated: "12/12/2022"
        }]);
        setNamePresentation("");
        setLgShow(false);
        console.log(presentations);
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
                                        <td>{index + 1}</td>
                                        <td>{presentation.name}</td>
                                        <td>{presentation.slideNumber}</td>
                                        <td>{presentation.dateCreated}</td>
                                        <td>
                                            <Menu menuButton={<MenuButton className='btn-more'><MdOutlineMoreHoriz /></MenuButton>} transition>
                                                <MenuItem className='btn-edit'><AiFillEdit style={{ "marginRight": "7px", "fontSize": "20px" }} />Edit</MenuItem>
                                                <MenuItem className='btn-del'><MdDelete style={{ "marginRight": "7px", "fontSize": "20px" }} />Detele</MenuItem>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
