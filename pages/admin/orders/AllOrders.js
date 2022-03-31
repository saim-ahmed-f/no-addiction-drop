import { makeStyles } from "@mui/styles";
import { Grid, Container, AppBar, Toolbar, Typography } from "@mui/material";

import { useRouter } from "next/router";

import MainNavigation from "../../../adminComponent/mainNevigation";
import MainOrderFn from "../../../adminComponent/mainOrder";

import { useEffect } from "react";


import toast from "../../../spinnerComponents/noitificationComp"

export const getStaticProps = async () => {
  const path = String(`https://alcoban-vbk7q.ondigitalocean.app/Orders/All Order/`);

  const res = await fetch(path);
  const OrderData = await res.json();
  return {
    props: {
      OrderDetails: OrderData,
    },
  };
};

const useStyle = makeStyles((theme) => ({
  zero_mar_padd: {
    margin: "0%",
    padding: "0%",
  },
  main_container: {
    display: "flex",
    justifyContent: "center",
  },
  first_grid: {
    width: "20%",
  },
  second_grid: {
    width: "80%",
  },
}));

export default function AllOrders({ OrderDetails }) {
  const Style = useStyle();

  const router = useRouter();

  useEffect(() => {
    let userValues = localStorage.getItem("mainUserValue");
    userValues = JSON.parse(userValues);
    if (userValues === null) {
      router.push("/Login");
    } else if (Object.keys(userValues).length === 0) {
      router.push("/Login");
    }
  }, []);

  const updateOrderStatus = async (orderData) => {
    let userValues = localStorage.getItem("mainUserValue");
    userValues = JSON.parse(userValues);
    const data = {
      id: orderData.id,
      order_date: orderData.order_date,
      payment_method: orderData.payment_method,
      quantity: orderData.quantity,
      total_value: orderData.total_value,
      order_states: orderData.order_states,
      razorpay_order_id: orderData.razorpay_order_id,
      razorpay_payment_id: orderData.razorpay_payment_id,
      razorpay_signature: orderData.razorpay_signature,
      product_id: orderData.product_id.id,
      shipping_id: orderData.shipping_id.id,
      product_awb_no : orderData.product_awb_no
    };

    const res = await fetch(
      `https://alcoban-vbk7q.ondigitalocean.app/Orders/Update%20order/${orderData.id}/`,
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

  };  

  return (
    <>
      <Container maxWidth="xl" style={{ margin: "0%", padding: "0%" }}>
        <AppBar
          position="static"
          style={{ margin: "0%", padding: "0%" }}
          color="primary"
        >
          <Toolbar style={{ margin: "0%", padding: "0%" }}>
            <Grid
              container
              style={{
                margin: "0%",
                padding: "0%",
                paddingLeft: "1%",
                paddingRight: "1%",
                display: "flex",
                justifyContent: "space-between",
              }}
              spacing={0}
            >
              <Grid
                style={{
                  margin: "0%",
                  padding: "0%",
                  width: "50%",
                  alignItems: "left",
                }}
                item
                xl={6}
              >
                <Typography
                  className={`${Style.AppBar_typo} `}
                  variant="h5"
                  color="secondary"
                >
                  Admin Panel
                </Typography>
              </Grid>
              <Grid
                item
                style={{
                  margin: "0%",
                  padding: "0%",
                  width: "50%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                xl={6}
              >
                <Typography
                  variant="h5"
                  color="secondary"
                  className={`${Style.AppBar_typo} `}
                >
                  Hii , Saim Ahmed
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Container>
      <Grid
        className={`${Style.zero_mar_padd} ${Style.main_container} `}
        container
        spacing={0}
      >
        <Grid
          className={`${Style.zero_mar_padd} ${Style.first_grid} `}
          item
          xl={4}
        >
          <MainNavigation />
        </Grid>
        <Grid
          className={`${Style.zero_mar_padd} ${Style.second_grid} `}
          item
          xl={8}
        >
          <MainOrderFn
            orders={OrderDetails}
            gettingOrderData={updateOrderStatus}
          />
        </Grid>
      </Grid>
    </>
  );
}
