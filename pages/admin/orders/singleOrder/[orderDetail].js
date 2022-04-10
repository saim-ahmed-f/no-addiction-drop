import { makeStyles } from "@mui/styles";
import { Grid, Container, AppBar, Toolbar, Typography } from "@mui/material";


import SingleOrderDetail from "../../../../orderComponents/singleOrderDetails"
import MainNavigation from "../../../../adminComponent/mainNevigation";

import {useRouter} from "next/router"

import {useEffect, useState} from 'react'


import toast from "../../../../spinnerComponents/noitificationComp";

export async function getStaticPaths() {
    const res = await fetch('https://alcoban-vbk7q.ondigitalocean.app/Orders/All%20Order/')
    const allProducts = await res.json()
    
    const paths = allProducts.map((order) => ({
      params: { orderDetail : order.id.toString() },
    }))
  
    return { paths, fallback: "blocking" }
  }

export const getStaticProps = async ({params}) => {

  

    const path = String(`https://alcoban-vbk7q.ondigitalocean.app/Orders/product_detail/single_order/${params.orderDetail}/`)

  const res = await fetch(
    path
  );

  const orderData = await res.json();
  
  const res2 = await fetch(`https://alcoban-vbk7q.ondigitalocean.app/product_api/product_detail/images/${orderData.product_id.id}/`)
  const productImg = await res2.json()
  return {
    props: {
      OneOrderDetail: orderData,
      OneProductImg  : productImg,
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

export default function BasicOrderDetail({OneOrderDetail , OneProductImg}) {
  const Style = useStyle();
  const router = useRouter()
  const [orderDetail , setOrderDetail] = useState(OneOrderDetail)


  useEffect(() => {
    let userValues = localStorage.getItem("mainUserValue");
    userValues = JSON.parse(userValues);
    
    if (userValues === null) {
      router.push("/Login");
    } else if (Object.keys(userValues).length === 0) {
      router.push("/Login");
    }
  }, [router]);  

  const updateHandler = async (status , awbNumber) =>{

    let userValues = localStorage.getItem("mainUserValue");
    userValues = JSON.parse(userValues);

    const data = {
      id: OneOrderDetail.id,
      order_date: OneOrderDetail.order_date,
      payment_method: OneOrderDetail.payment_method,
      quantity: OneOrderDetail.quantity,
      total_value: OneOrderDetail.total_value,
      order_states: status,
      razorpay_order_id: OneOrderDetail.razorpay_order_id,
      razorpay_payment_id: OneOrderDetail.razorpay_payment_id,
      razorpay_signature: OneOrderDetail.razorpay_signature,
      product_id: OneOrderDetail.product_id.id,
      shipping_id: OneOrderDetail.shipping_id.id,
      product_awb_no : awbNumber
    };

    const res = await fetch(
      `https://alcoban-vbk7q.ondigitalocean.app/Orders/Update%20order/${OneOrderDetail.id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${userValues["token"]}`,
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
          <SingleOrderDetail MainOrder={orderDetail}  img = {OneProductImg}  gettingUpdateSignal = {updateHandler}/>
        </Grid>
      </Grid>
    </>
  );
}