import React from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import "./styles.css";

function NavbarDetail({ classData }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <a href="/" className="navbar__logo-link">
          <img
            src={logo}
            alt="DND Logo"
            className="navbardetail__logo"
            // onClick={handleClick}
            style={{ cursor: "pointer" }}
          />
          <span style={{ fontWeight: "500" }}>DND Group</span>
        </a>
      </div>
      <div className="navbar__center">
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="News" component={Link} to={`/${classData.id}`} />
            <Tab
              label="People"
              component={Link}
              to={`/${classData.id}/people`}
            />
          </Tabs>
        </Box>
      </div>
      <div className="navbar__right" />
    </nav>
  );
}

export default NavbarDetail;
