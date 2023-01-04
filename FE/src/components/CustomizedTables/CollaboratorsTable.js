import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./CustomizedTables.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

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

export default function CollaboratorsTable({
  collaborators,
  idPresentation,
  idOwner
}) {
  const token = localStorage.getItem("token");
  const user = jwt_decode(token);
  const IDUser = user.data.id;
  const handleDeleteCollab = async (id) => {
    await axios.post(
      `${API_URL}presentation/removeCollaborator/${idPresentation}`,
      {
        account_id: id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    window.location.reload();
  };

  return (
    <div>
      {collaborators.length === 0 ? (
        <>No member collaboration</>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>No.</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {collaborators.map((collaborator, index) => (
                  <StyledTableRow key={collaborator.id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {collaborator.username}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {IDUser == idOwner ? (
                        <>
                          <DeleteOutlineIcon
                            className="btn_delete_collab"
                            onClick={() => {
                              handleDeleteCollab(collaborator.id);
                            }}
                          />
                        </>
                      ) : null}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}
