import { Avatar, IconButton, MenuItem, Menu } from "@material-ui/core";
import { Add, Apps, Menu as MenuIcon } from "@material-ui/icons";
import React, { useState } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg"
import "./styles.css";

function NavbarDetail({ classData }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar__left">
                    <img
                        src={logo}
                        alt="DND Logo"
                        className="navbardetail__logo"
                    />{" "}
                    <span>DND Group</span>
                </div>
                <div className="navbar__center">
                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="News" component={Link} to={`/${classData.id}`}>
                            </Tab>
                            <Tab label="People" component={Link} to={`/${classData.id}/people`}>
                            </Tab>
                        </Tabs>
                    </Box>
                </div>
            </nav>
        </>
    );
}

export default NavbarDetail;
