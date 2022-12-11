import React from 'react'
import "../ListPresentation/ListPresentation.css"
import Table from 'react-bootstrap/Table';
import { MdOutlineMoreHoriz, MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export default function ListPresentation() {
    return (
        <div>
            <div className='header-list-presentation'>
                <div className='header-text'>My presentations</div>
                <button type="button" className='btn-add-presentation'> + New Presentation</button>
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
                            <tr className='tr'>
                                <td>1</td>
                                <td>presentation</td>
                                <td>2</td>
                                <td>22/11/2022</td>
                                <td>
                                    <Menu menuButton={<MenuButton className='btn-more'><MdOutlineMoreHoriz /></MenuButton>} transition>
                                        <MenuItem className='btn-edit'><AiFillEdit style={{ "marginRight": "7px", "fontSize": "20px" }} />Edit</MenuItem>
                                        <MenuItem className='btn-del'><MdDelete style={{ "marginRight": "7px", "fontSize": "20px" }} />Detele</MenuItem>
                                    </Menu>
                                </td>
                            </tr>

                            <tr className='tr'>
                                <td>2</td>
                                <td>abc</td>
                                <td>3</td>
                                <td>22/11/2022</td>
                                <td>
                                    <Menu menuButton={<MenuButton className='btn-more'><MdOutlineMoreHoriz /></MenuButton>} transition>
                                        <MenuItem className='btn-edit'><AiFillEdit style={{ "marginRight": "7px", "fontSize": "20px" }} />Edit</MenuItem>
                                        <MenuItem className='btn-del'><MdDelete style={{ "marginRight": "7px", "fontSize": "20px" }} />Detele</MenuItem>
                                    </Menu>
                                </td>
                            </tr>

                            <tr className='tr'>
                                <td>3</td>
                                <td>def</td>
                                <td>1</td>
                                <td>22/11/2022</td>
                                <td>
                                    <Menu menuButton={<MenuButton className='btn-more'><MdOutlineMoreHoriz /></MenuButton>} transition>
                                        <MenuItem className='btn-edit'><AiFillEdit style={{ "marginRight": "7px", "fontSize": "20px" }} />Edit</MenuItem>
                                        <MenuItem className='btn-del'><MdDelete style={{ "marginRight": "7px", "fontSize": "20px" }} />Detele</MenuItem>
                                    </Menu>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

        </div>
    )
}
