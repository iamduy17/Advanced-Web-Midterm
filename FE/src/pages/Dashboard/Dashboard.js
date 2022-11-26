import React from "react";
import './styles.css';

function Dashboard() { 

    const logOut = (event) => {
        event.preventDefault();

        localStorage.removeItem("token");    
        localStorage.removeItem("provider"); 
        // const {data} = await axios.get(`${API_URL}auth/logout`);
        // if(data.ReturnCode === 1)       
        window.location.assign("/login");
    }

    return (
        <>
            <h1>Hello World</h1>
            <button onClick={logOut}>Logout</button>
        </>
    )
}

export default Dashboard;