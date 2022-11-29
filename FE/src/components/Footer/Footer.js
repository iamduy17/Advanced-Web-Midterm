import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
} from "@material-ui/core";

const Footer = () => <>
    <AppBar position="static" elevation={0} component="footer" color="default" style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        background: "linear-gradient(to right, #77A1D3 0%, #79CBCA  51%, #77A1D3  100%)",
        maxHeight: "50px",
    }}>
        <Toolbar style={{
            justifyContent: "center",
            minHeight: "48px!important"
        }}>
            <Typography variant="caption" style={{ color: "black", fontFamily: "Arial", fontWeight: "bold" }}>@DND Group</Typography>
        </Toolbar>
    </AppBar>
</>

export default Footer;