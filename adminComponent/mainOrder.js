import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { TableHead, TextField, Button } from "@mui/material";

import { makeStyles } from "@mui/styles";

import { default as linkMui } from "../mui/Link";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Link from "next/link";

import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";


import {useRouter} from "next/router"

const useStyle = makeStyles((theme) => ({
  mainicons: {
    fontSize: "14px",
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function MainOrderFn({ orders, gettingOrderData }) {
  const Style = useStyle();
  const router = useRouter()
  const [rows, setMainRows] = React.useState(orders);
  const [inputValue, setInputValue] = React.useState("");
  const [selectStatus , setSelectStatus] = React.useState(rows.map((item) => { return { order_states : item.order_states }}))


  const sendingOrderData = (orderDataSending , indexM) => {
    
    const values = orderDataSending
    values["order_states"] = selectStatus[indexM]["order_states"]
    
    const changeMainData = [...rows]
    changeMainData[indexM]["order_states"] = selectStatus[indexM]["order_states"]
    
    if (router.pathname.includes("AllOrders") !== true){
      changeMainData = changeMainData.filter((item) => {return item.id !== orderDataSending.id })
      let statusChange = [...selectStatus]
      statusChange = statusChange.filter((item , index) => index !== indexM )
      setSelectStatus(statusChange)
    }
    setMainRows(changeMainData)

    gettingOrderData(values);
  };

  const statusHandleChange = (event, index) => {
    const value = [...selectStatus];
    value[index]["order_states"] = event.target.value;
    setSelectStatus(value)
  };

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  /*

    let paymentFilterConst = paymentFilterSeter === "Online" ? true : paymentFilterSeter === "COD" ? false: null;
    setMainRows(
      rows.filter((val) => {
        if (paymentFilterConst === null) {
          return val;
        } else {
          return paymentFilterConst === val.payment_method;
        }
      })
    );

  */

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Paper
        style={{
          marginTop: "3%",
          marginBottom: "3%",
          padding: "1%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextField
            id="search_Input"
            label="Enter the order Id"
            style={{ width: "80%" }}
            value={inputValue}
            onChange={(event) => inputChangeHandler(event)}
          />

          <IconButton style={{ width: "10%" }} onClick={() => setInputValue("")} aria-label="Clear">
            <ClearRoundedIcon />
          </IconButton>
        </div>
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead >
            <TableRow>
              <TableCell align="left">Order Id</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Payment Type</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            )
              .filter((val) => {
                if (inputValue === "") {
                  return val;
                }{
                  return Object.keys(val).some(key => {
                      return String(val[key]).toLowerCase().includes(String(inputValue).toLowerCase().trim())
                  })
              }
              })
              .map((row, index) => (
                <TableRow  key={row.id}>
                  <TableCell align="left"  scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell
                    component={linkMui}
                    href={`/admin/orders/singleOrder/${row.id}`}
                    style={{ width: 160 }}
                    align="center"
                  >
                    {new Date(row.order_date).toDateString()}
                  </TableCell>
                  <TableCell
                    component={linkMui}
                    href={`/admin/orders/singleOrder/${row.id}`}
                    style={{ width: 160 }}
                    align="center"
                  >
                    {row.product_id.product_name}
                  </TableCell>
                  <TableCell
                    component={linkMui}
                    href={`/admin/orders/singleOrder/${row.id}`}
                    style={{ width: 160 }}
                    align="center"
                  >
                    {row.shipping_id.address}
                  </TableCell>
                  <TableCell
                    component={linkMui}
                    href={`/admin/orders/singleOrder/${row.id}`}
                    style={{ width: 160 }}
                    align="center"
                  >
                    {row.payment_method === true ? "Online" : "COD"}
                  </TableCell>
                  <TableCell
                    component={linkMui}
                    href={`/admin/orders/singleOrder/${row.id}`}
                    style={{ width: 160 }}
                    align="center"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CurrencyRupeeRoundedIcon
                        className={Style.mainicons}
                        fontSize="small"
                      />
                      {`${row.total_value}`}
                    </div>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {String(row.order_states) === "Delivered" || String(row.order_states) === "Returned" ?
                     `${String(row.order_states) === "Delivered" ? "Delivered" : String(row.order_states) === "Returned" ? "Returned" : null}` :  
                       (
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id={`state_${row.order_id}`}
                          value={selectStatus[index]["order_states"]}
                          label="Status"
                          onChange={(event) => statusHandleChange(event, index)}
                        >
                          <MenuItem value={"Pending"}>Pending</MenuItem>
                          <MenuItem value={"Shipped"}>Shipped</MenuItem>
                          <MenuItem value={"Delivered"}>Delivered</MenuItem>
                          <MenuItem value={"Returned"}>Returned</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {String(row.order_states) === "Delivered" || String(row.order_states) === "Returned" ? (
                      <Link href={`/admin/orders/singleOrder/${row.id}`}>
                        <Button size="small" variant="outlined" color="primary">
                          View Detail
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        size="medium"
                        onClick={() => sendingOrderData(row , index)}
                        variant="outlined"
                        color="primary"
                      >
                        Update
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
