import { Divider, Paper, TextField, IconButton, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";

import {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const useStyle = makeStyles((theme) => ({
  zero_mag_pad: {
    margin: "0%",
    padding: "0%",
  },
  paper_containter: {},
}));

export default function ShipAnalysis({ shipStatus }) {
  const Style = useStyle();

  const [searchBar , setSearchBar] = useState("")


  return (
    <>
        <Typography style={{textAlign : "center" , marginBottom : "1%"}} variant="h5" color="primary">Mostly Product Sell Area</Typography>

        <Paper style={{padding : "2%" , display : "flex" , justifyContent : "space-evenly" , alignItems : "center"}} elevation={3} >
            <TextField
              id="searchBar"
              label="Enter the value here ..."
              value={searchBar}
              onChange={(e) => setSearchBar(e.target.value)}
              fullWidth
              style={{width : "70%"}}
            />
            <IconButton aria-label="Clear" onClick={(e) => setSearchBar("")}>
                <ClearRoundedIcon/>
            </IconButton>
        </Paper>
        <Divider style={{marginTop : "1%" , marginBottom : "1%"}} />
      <Paper className={Style.paper_containter} elevation={3}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Pincode</TableCell>
                <TableCell align="center">City</TableCell>
                <TableCell align="right">Total Order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipStatus.filter((val) => {
                if (searchBar === "") {
                  return val;
                }else{
                    return Object.keys(val).some(key => {
                        return val[key].toString().toLowerCase().includes(String(searchBar).toLowerCase().trim())
                    })
                }
              })
              
              .map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.pincode}
                  </TableCell>
                  <TableCell align="center">{item.city}</TableCell>
                  <TableCell align="right">{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
