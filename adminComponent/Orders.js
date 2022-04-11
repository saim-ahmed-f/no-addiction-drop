import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


import Link from "next/link"

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';


import { makeStyles } from "@mui/styles";
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'


import  toast  from "../spinnerComponents/noitificationComp";


const useStyle= makeStyles((theme) => ({
  mainicons : {
    fontSize :"14px",
  }
}))


function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({ order }) {
  
  const Style = useStyle()
  const [recentOrder , setRecentOrder] = React.useState(order)
  

  const updateHandler = async (e , item) => {
    
    let userValues = localStorage.getItem("mainUserValue");
    userValues = JSON.parse(userValues);
    const data = {
      id: item.id,
      order_date: item.order_date,
      payment_method: item.payment_method,
      quantity: item.quantity,
      total_value: item.total_value,
      order_states: item.order_states,
      razorpay_order_id: item.razorpay_order_id,
      razorpay_payment_id: item.razorpay_payment_id,
      razorpay_signature: item.razorpay_signature,
      product_id: item.product_id.id,
      shipping_id: item.shipping_id.id,
      product_awb_no : item.product_awb_no
    };

    const res = await fetch(
      `https://alcoban-vbk7q.ondigitalocean.app/Orders/Update%20order/${item.id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userValues["token"]}`,
        },
        body: JSON.stringify(data),
      }
    );

    const gettingstatus = await res.json()
    
    if (gettingstatus[0] === true){
      toast({type : gettingstatus[2] , message : gettingstatus[1]})
    }else{
      toast({type : gettingstatus[2] , message : gettingstatus[1]})
    }
    
  }


  const statusHandleChange = (event , index) => {
    //setStatus(event.target.value);
    const value = [...recentOrder]
    value[index]["order_states"] = event.target.value
    setRecentOrder(value)
  };

  return (
    <React.Fragment>
      <Typography style={{textAlign : "center" , marginTop : "2%" , marginBottom : "2%"}} variant="h5" color="primary">
        Recent Order's
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Order Id</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Product Name</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Payment Type</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentOrder.map((item , index) => (
            <Link key={item.id} href="#">
              <TableRow >
                <TableCell align="left">{item.id}</TableCell>
                <TableCell align="center">{new Date(item.order_date).toDateString()}</TableCell>
                <TableCell align="center">{item.product_id.product_name}</TableCell>
                <TableCell align="center">{item.shipping_id.address}</TableCell>
                <TableCell align="center">{item.shipping_id.phone_no}</TableCell>
                <TableCell align="center">{item.payment_method === true ? "Online" : "COD"}</TableCell>
                <TableCell align="center"><div style={{alignItems : "center"}}><CurrencyRupeeRoundedIcon className={Style.mainicons} fontSize="small"/> {`${item.total_value}`}</div></TableCell>
                <TableCell align="center">
                  {item.order_states === "Delivered" ? "Delevired" : 
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id={`${item.id}`}
                          value={item.order_states}
                          label="Status"
                          onChange={(e) => statusHandleChange(e , index)}
                        >
                          <MenuItem value={"Pending"}>Pending</MenuItem>
                          <MenuItem value={"Shipped"}>Shipped</MenuItem>
                          <MenuItem value={"Delivered"}>Delivered</MenuItem>
                          <MenuItem value={"Returned"}>Returned</MenuItem>
                        </Select>
                    </FormControl>
                  }
                </TableCell>
                <TableCell align="right">
                {
                item.order_states === "Delivered" ? 
                <Link href={`/admin/orders/singleOrder/${item.id}`}>
                  <Button variant="outlined"   size="small" color="primary">
                    View Detail
                  </Button>
                </Link>
                :
                  <Button variant="outlined" onClick={(event) => updateHandler(event , item)} size="small" color="primary">
                    Update
                  </Button>
                }  
                </TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/admin/orders/AllOrders" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
