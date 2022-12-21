import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

function Footer() {
  return (
    <AppBar
      position="static"
      elevation={0}
      component="footer"
      color="default"
      style={{
        position: "absolute",
        bottom: "0",
        width: "100%",
        background: "white"
      }}
    >
      <Toolbar
        style={{
          justifyContent: "center",
          minHeight: "48px!important"
        }}
      >
        <Typography
          variant="caption"
          style={{ color: "black", fontFamily: "Arial", fontWeight: "bold" }}
        >
          @DND Group
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
