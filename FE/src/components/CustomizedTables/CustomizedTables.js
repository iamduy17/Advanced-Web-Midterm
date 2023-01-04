import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

import "./CustomizedTables.css";

import { API_URL } from "../../config";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontFamily: "Raleway, Arial"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

export default function CustomizedTables({ listPresentation }) {
  const handleLink = async (id) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${API_URL}presentation/edit/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    let url = window.location.href;
    let subURL = url.substring(0, url.length - 3);

    window.location.replace(
      `${subURL}/presentation/${id}/slide/${data.Data.Slides[0].id}`
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell>Name presentation</StyledTableCell>
            <StyledTableCell align="center">Number Slide</StyledTableCell>
            <StyledTableCell align="center">Created Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listPresentation.map((presentation, index) => (
            <StyledTableRow
              key={presentation.id}
              style={{ cursor: "pointer" }}
              className="btn_TableRow"
            >
              <StyledTableCell align="left">{index + 1}</StyledTableCell>
              <StyledTableCell
                component="th"
                scope="row"
                onClick={() => handleLink(presentation.id)}
              >
                {presentation.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                {presentation.slide_count}
              </StyledTableCell>
              <StyledTableCell align="center">
                {presentation.created_at}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
