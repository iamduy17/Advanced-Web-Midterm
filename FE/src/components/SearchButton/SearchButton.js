import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useState } from "react";
import axios from "axios";

import { API_URL } from "../../config";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.75),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 1.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    marginRight: "5px",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "35ch",
      height: "30px"
    }
  }
}));

export default function SearchButton({ idPresentation }) {
  const [inputValue, setInputValue] = useState("");
  const token = localStorage.getItem("token");

  const handleInviteCollab = async () => {
    await axios.post(
      `${API_URL}presentation/addCollaborator/${idPresentation}`,
      { email: inputValue },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <div style={{ color: "black", fontWeight: "bold", fontSize: "17px" }}>
            Invite collaborator:{" "}
          </div>
          <Search>
            <SearchIconWrapper>
              <PersonAddAltIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Invite..."
              inputProps={{ "aria-label": "search" }}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </Search>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleInviteCollab}
            style={{ marginLeft: "15px" }}
          >
            Invite
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
