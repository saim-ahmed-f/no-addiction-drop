import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import PercentIcon from "@mui/icons-material/Percent";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import Button from "@mui/material/Button";

import Link from "../../mui/Link";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";


import {useRouter} from "next/router"

const useStyle = makeStyles((theme) => ({
  zero_mag_padd: {
    margin: "0%",
    padding: "0%",
  },

  radio_text_typo_price: {
    fontSize: "40px",
    fontFamily: "Roboto",
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
    },
  },
  radio_text_typo_payment: {
    fontSize: "25px",
    paddingLeft: "20px",
    fontFamily: "Roboto",
    [theme.breakpoints.down("sm")]: {
      fontSize: "22px",
    },
  },
  buy_now_btn: {
    
    paddingLeft: "120px",
    paddingRight: "120px",
    fontFamily: "Roboto",
    fontSize: "18px",
    [theme.breakpoints.down('sm')]:{
      fontSize: "15px",
      paddingLeft: "80px",
      paddingRight: "80px",
    }
  },
  buy_btn_arrow: {
    marginLeft: "30px",
    "&:hover": {
      marginLeft: "40px",
    },
  },
  mainProductTypo: {
    fontSize: "40px",
    fontFamily: "Roboto",
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
    },
  },

  quantityClass: {
    width: "20%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
}));

export default function ProductDetail({ productAllDetail }) {

  const Router = useRouter()

  const [value, setValue] = useState("Cash On Delivery");
  const [quantitys, setquantity] = useState(1);
  const [passdata , setPassData] = useState({
    paymentype :  value,
    quantity : quantitys,
})

  const Style = useStyle();

  const ChangeQuantityHandler = (e, type) => {
    e.preventDefault()
    if (type === "add") {
      if (quantitys === 10) {
        setquantity(10);
      } else {
        setquantity(quantitys + 1);
      }
    } else if (type === "sub") {
      if (quantitys === 1) {
        setquantity(1);
      } else {
        setquantity(quantitys - 1);
      }
    }

    let values = {...passdata}
    values.quantity = quantitys
    setPassData(values)
  };

  const selectTextOption = (option) => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: option === "COD" ? "30px" : "50px",
          }}
        >
          <CurrencyRupeeRoundedIcon color="primary" fontSize="large" />
          <Typography
            variant="h5"
            className={`${Style.radio_text_typo_price} `}
            color="primary"
          >
            {option === "COD"
              ? productAllDetail.product_price
              : productAllDetail.product_online_price}
          </Typography>
          <Typography
            variant="h6"
            className={`${Style.radio_text_typo_payment}`}
            color="secondary"
          >
            {option === "COD" ? "--- Cash On Delivery" : "--- Online Payment"}
          </Typography>
        </div>
        {option === "COD" ? (
          ""
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                style={{
                  alignContent: "center",
                  fontSize: value === "Online" ? "30px" : "20px",
                }}
                color="primary"
              >
                Flat {productAllDetail.discount_value}
              </Typography>
              <PercentIcon
                color="primary"
                fontSize={value === "Online" ? "large" : "medium"}
              />
              <Typography
                variant="h6"
                style={{
                  alignContent: "center",
                  fontSize: value === "Online" ? "30px" : "20px",
                }}
                color="primary"
              >
                OFF
              </Typography>
            </div>
            <Typography variant="h6" color="secondary">
              (If you Pay By Debit/Credit Cards/NetBanking)
            </Typography>
          </div>
        )}
        <div>
          <Typography variant="h6" color="primary">
            Delivery Charges Rs. {productAllDetail.delivery_charge}/- extra
          </Typography>
        </div>
      </div>
    );
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    let values = {...passdata}
    values.paymentype = event.target.value
    setPassData(values)
  };

  const sendModeCheckoutPage = (mode) => {
    Router.push({
      pathname: '/checkoutPage',
      query: {paymentType : passdata.paymentype , quantity :quantitys },
    });
  };

  return (
    <>
      <Grid
        container
        id="buy_section"
        className={`${Style.zero_mag_padd} `}
        spacing={0}
      >
        <Grid item xs={12} sm={12} xl={12}>
          <Typography
            variant="h5"
            className={Style.mainProductTypo}
            color="primary"
          >
            {productAllDetail.product_name}
          </Typography>
          <Typography variant="h5" color="primary"></Typography>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Price :
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={(e) => handleChange(e)}
            >
              <FormControlLabel
                style={{ alignContent: "top" }}
                value="Cash On Delivery"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 40,
                      },
                    }}
                  />
                }
                label={selectTextOption("COD")}
              />
              <FormControlLabel
                style={{ alignContent: "top" }}
                value="Online"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 40,
                      },
                    }}
                  />
                }
                label={selectTextOption("online")}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop : "30px",
        }}
      >
        <div className={Style.quantityClass}>
          <IconButton
            id="sub_quantity"
            onClick={(e) => ChangeQuantityHandler(e, "sub")}
          >
            <RemoveRoundedIcon />
          </IconButton>
          <Paper style={{padding : "8%"}} elevation={2}>
            <Typography variant="h5" color="primary">
              {quantitys}
            </Typography>
          </Paper>
          <IconButton
            id="add_quantity"
            onClick={(e) => ChangeQuantityHandler(e, "add")}
          >
            <AddRoundedIcon />
          </IconButton>
        </div>
        <div style={{ width: "70%" , display : "flex" , justifyContent : "center"  , alignItems : "center"}}>
          <Button
            className={`${Style.buy_now_btn} `}
            onClick={() => sendModeCheckoutPage(value)}
            variant="contained"
            color="primary"
          >
            Buy Now
            {<ChevronRightRoundedIcon className={Style.buy_btn_arrow} />}
          </Button>
        </div>
      </div>
    </>
  );
}
