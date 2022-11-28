import test from "react";
import NavbarDetail from "../../components/NavbarDetail/NavbarDetail";
import { useParams, Route, Routes } from "react-router-dom";
import Main from "../../components/Main/Main";
import './styles.css';
import People from "../../components/People/People";


function ClassDetail({ classes }) {
    const { id } = useParams()
    let index = classes.findIndex(element => element.id == id);
    
    return (
        <>
            <NavbarDetail classData={classes[index]}></NavbarDetail>
            <Routes>
                <Route index path="" element={<Main classData={classes[index]} />} />
                <Route index path="/people" element={<People id = {id}></People>} />
            </Routes>


        </>
    )
}

export default ClassDetail;