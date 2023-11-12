import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";

export { default } from "./RoomManager";



export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#000",
      color: "#fff",
      fontWeight: "bold",
      fontSize:'12px'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5",
      borderBottom: "1px solid rgba(224, 224, 224, 1)",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  