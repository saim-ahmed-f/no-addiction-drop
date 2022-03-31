import { Card, Divider, Typography, Button } from "@mui/material";

import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";

import Link from "../../mui/Link"

import { makeStyles } from "@mui/styles";

import {useRouter} from "next/router"

import {useState , useEffect} from "react"

const useStyle = makeStyles((theme) => ({
  account_div: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  typo_div_element: {
    fontSize: "16px",
    fontFamily: "Roboto",
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  total_typo: {
    paddingTop: "15px",
    paddingBottom: "15px",
    fontFamily: "Roboto",
  },
  subDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buy_btn: {
    paddingTop: "12px",
    paddingBottom: "12px",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: "16px",
  },
}));

export default function FinalRate({ productDetail, postFunc }) {
  const Style = useStyle();

  const router = useRouter();

  const [queryValue , setQueryValue] = useState(router.query)

  useEffect(() =>{
    if(router.isReady) {
    
    setQueryValue(router.query)
  }
  } , [router.isReady])


  const [mainAmount , setMainAmount] = useState(0)

  
  

  useEffect(() => {
    const amountValue = queryValue.paymentType === undefined ? null : String(queryValue.paymentType) === "Online"? productDetail.product_online_price  : productDetail.product_price
    setMainAmount(amountValue)
  } , [queryValue])



  const onSubmitClcik = () => {
    postFunc(true , queryValue);
  };

  
  

  return (
    <div>
      <Card>
        <Typography
          variant="h5"
          style={{
            textAlign: "center",
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
          color="primary"
        >
          Bill Overview
        </Typography>
        <Divider />
        <div className={Style.account_div}>
          <Typography
            variant="h6"
            className={Style.typo_div_element}
            color="secondary"
          >
            {productDetail.product_name}
          </Typography>
          <Typography
            variant="h6"
            className={Style.typo_div_element}
            color="secondary"
          >
            x
          </Typography>
          <div className={Style.subDiv}>
            {<CurrencyRupeeRoundedIcon fontSize={"16"} />}
            <Typography
              variant="h6"
              className={Style.typo_div_element}
              color="secondary"
            >
              {mainAmount} 
            </Typography>
          </div>
        </div>
        <div className={Style.account_div}>
          <Typography
            variant="h6"
            className={Style.typo_div_element}
            color="secondary"
          >
            Quantity
          </Typography>
          <Typography
            variant="h6"
            className={Style.typo_div_element}
            color="secondary"
          >
            x
          </Typography>
          <div className={Style.subDiv}>
            <Typography
              variant="h6"
              className={Style.typo_div_element}
              color="secondary"
            >
              {queryValue.paymentType === undefined ? null : queryValue.quantity} 
            </Typography>
          </div>
        </div>
        <div className={Style.account_div}>
          <Typography
            variant="h6"
            className={Style.typo_div_element}
            color="secondary"
          >
            Delivery fees
          </Typography>
          <Typography
            variant="h6"
            className={Style.typo_div_element}
            color="secondary"
          >
            x
          </Typography>
          <div className={Style.subDiv}>
            {<CurrencyRupeeRoundedIcon fontSize={"16"} />}
            <Typography
              variant="h6"
              className={Style.typo_div_element}
              color="secondary"
            >
              {productDetail.delivery_charge}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={Style.account_div}>
          <Typography variant="h5" className={Style.total_typo} color="primary">
            Total
          </Typography>
          <Typography variant="h5" className={Style.total_typo} color="primary">
            :
          </Typography>
          <div className={Style.subDiv}>
            {<CurrencyRupeeRoundedIcon color="primary" />}
            <Typography
              variant="h5"
              className={Style.total_typo}
              color="primary"
            >
              {queryValue.paymentType === undefined ? null : productDetail.delivery_charge + (mainAmount * queryValue.quantity)}
            </Typography>
          </div>
        </div>
      </Card>
      <Button
        className={Style.buy_btn}
        onClick={() => onSubmitClcik()}
        variant="contained"
        fullWidth
        color="primary"
      >
        place order
      </Button>
    </div>
  );
}
