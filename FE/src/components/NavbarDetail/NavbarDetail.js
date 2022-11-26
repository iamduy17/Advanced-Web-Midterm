import { Avatar, IconButton, MenuItem, Menu } from "@material-ui/core";
import { Add, Apps, Menu as MenuIcon } from "@material-ui/icons";
import React, { useState } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import "./styles.css";

function NavbarDetail({classData}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar__left">
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                    <img
                        src="https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png"
                        alt="Google Logo"
                        className="navbar__logo"
                    />{" "}
                    <span>Classroom</span>
                </div>
                <div className="navbar__center">
                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="Bảng tin" component={Link} to={`/${classData.id}`}>
                            </Tab>
                            <Tab label="Mọi người" component={Link} to={`/${classData.id}/people`}>
                            </Tab>
                        </Tabs>
                    </Box>
                </div>
            </nav>
        </>
    );
}

export default NavbarDetail;
