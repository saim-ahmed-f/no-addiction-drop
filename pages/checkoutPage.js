import * as React from "react";
import Container from "@mui/material/Container";

import NextLink from "next/link";

import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import MainNavBar from "../src/Nav Bar/desktopNavBar";

import DetailForm from "../checkoutComponent/main/DetailForm";
import FinalRate from "../checkoutComponent/main/finalRate";

import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

import toast from "../spinnerComponents/noitificationComp";

import displayRazorpay from "../razorPay Components/displayRazorpay";

import LoadRazorPay from "../razorPay Components/loadRazorpay";

export const getStaticProps = async () => {
  const res = await fetch(
    "https://alcoban-vbk7q.ondigitalocean.app/product_api/product_amount_deatil/1/"
  );
  const data = await res.json();

  return {
    props: {
      product_detail: data,
    },
  };
};

const useStyle = makeStyles((theme) => ({
  mainDiv: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mainDiv_mobile: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
      marginTop: "30px",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default function CheckoutPage({ product_detail }) {
  const Style = useStyle();
  const router = useRouter();

  const [postValue, setPostValue] = useState(null);

  const gettingValue = (values) => {
    setPostValue(values);
  };


  const phoneValidator = (phone_number) => {
    const lengthOfNumber = String(phone_number).length
    if (lengthOfNumber === 10){
      return [true , String(phone_number)]
    }else if (lengthOfNumber === 12){
      return [true , String(phone_number).slice(2)]
    }else if (lengthOfNumber === 13){
      return [true , String(phone_number).slice(3)]
    }
    return [false]
  }

  const CreateOrder = async (
    paymentCredential,
    placeOrder = false,
    collectingAllData = null
  ) => {

    const validatingNumber = phoneValidator(postValue.phone_no)
    if (validatingNumber[0] === false){
      toast({ type: "error", message: "Please enter valid phone number !!!" });
      return false
    }
    

    const genrateName = postValue.first_name + " " + postValue.last_name;

    const shipData = {
      name: genrateName,
      email: postValue.email_id,
      phone_no: validatingNumber[1],
      address: postValue.address,
      city: postValue.city,
      pincode: postValue.pincode,
      state: postValue.state,
    };

    if (
      shipData.phone_no.trim() === "" ||
      shipData.email.trim() === "" ||
      shipData.address.trim() === "" ||
      shipData.pincode === "" ||
      shipData.city.trim() === "" ||
      shipData.state.trim() === ""
    ) {
      toast({ type: "error", message: "Please fill all Fields !!!" });
      return false;
    }



    const shipRes = await fetch(
      `https://alcoban-vbk7q.ondigitalocean.app/product_shipping_detail/create_shipping_detail/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(shipData),
      }
    );
    const shippingId = await shipRes.json();


    {/*placeOrder*/}

    if (shippingId[0] === true) {
      const amountGenrate =
        paymentCredential.paymentType === "Online"
          ? product_detail.product_online_price * paymentCredential.quantity +
            product_detail.delivery_charge
          : product_detail.product_price * paymentCredential.quantity +
            product_detail.delivery_charge;

      const data = {
        payment_method: paymentCredential.paymentType === "Online" ? true : false ,
        quantity: 1,
        total_value: amountGenrate,
        order_states: "Pending",
        razorpay_order_id:
          paymentCredential.paymentType === "Online"
            ? collectingAllData[1]
            : null,
        razorpay_payment_id:
          paymentCredential.paymentType === "Online"
            ? collectingAllData[0]
            : null,
        razorpay_signature:
          paymentCredential.paymentType === "Online"
            ? collectingAllData[2]
            : null,
        product_id: product_detail.id,
        shipping_id: shippingId[1],
        product_awb_no: null,
      };

      const res = await fetch(
        `https://alcoban-vbk7q.ondigitalocean.app/Orders/Create_Basic_Order/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const Status = await res.json();

      if (Status[0] === true) {
        toast({ type: Status[2], message: Status[1] });
      } else {
        toast({ type: Status[2], message: Status[1] });
      }

      return Status[0];
    } else {
      toast({ type: "error", message: "Failed To create Order!!!" });
    }
  };

  const postDataFunc = async (placeOrder, paymentCredential) => {

    const validatingNumber = phoneValidator(postValue.phone_no)
    if (validatingNumber[0] === false){
      toast({ type: "error", message: "Please enter valid phone number !!!" });
      return false
    }

    const genrateNameForCheck = postValue.first_name + " " + postValue.last_name;

    const chechDeatils = {
      name: genrateNameForCheck,
      email: postValue.email_id,
      phone_no: validatingNumber[1],
      address: postValue.address,
      city: postValue.city,
      pincode: postValue.pincode,
      state: postValue.state,
    };

    if(chechDeatils.phone_no.trim() === "" || chechDeatils.email.trim() === ""){
      toast({ type: "error", message: "Fill all the detail !!!" });
      return false
    }
    

    if (paymentCredential.paymentType === "Online") {
      const logoRes = await fetch(
        "https://alcoban-vbk7q.ondigitalocean.app/product_api/brand_logo/"
      );
      const imageData = await logoRes.json();

      {
        /* Razor Pay Section */
      }

      let collectingAllData = [];

      const res = await LoadRazorPay(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        toast({ type: "error", message: "Razorpay SDK failed to load !!!" });
      }

      const RezorPayres = await fetch(
        `https://alcoban-vbk7q.ondigitalocean.app/Orders/Razorpay_Order_creation/${paymentCredential.quantity}/${product_detail.id}/`
      );

      const MainPaymentDetail = await RezorPayres.json();

      const genrateName = postValue.first_name + " " + postValue.last_name;

      const options = {
        key: "rzp_test_OmeeTYyShQf7Lg",
        currency: "INR",
        amount: MainPaymentDetail.amount,
        order_id: MainPaymentDetail.id,
        name: "SRPN",
        description: "Thank you for nothing. Please give us some money",
        image: imageData[0]["get_Logo"],
        handler: async function (response) {
          collectingAllData.push(response.razorpay_payment_id);
          collectingAllData.push(response.razorpay_order_id);
          collectingAllData.push(response.razorpay_signature);
          const responseForRedirect = await CreateOrder(
            paymentCredential,
            true,
            collectingAllData
          );
          if (responseForRedirect === true) {
            router.push("/");
          }
        },
        prefill: {
          name: genrateName,
          email: postValue.email_id,
          phone_number: validatingNumber[1],
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      const responseForRedirect = await CreateOrder(
        paymentCredential,
        placeOrder
      );
      if (responseForRedirect === true) {
        router.push("/");
      }
    }
  };

  return (
    <Container style={{ margin: "0%", padding: "0%" }} maxWidth="xl">
      <MainNavBar mainHeading={product_detail.web_heading} />
      <Grid container spacing={0} className={Style.mainDiv}>
        <Grid item style={{ width: "60%", margin: "0", padding: "0" }} xl={8}>
          <DetailForm getIt={gettingValue} />
        </Grid>

        <Grid style={{ width: "30%" }} item xl={4}>
          <FinalRate productDetail={product_detail} postFunc={postDataFunc} />
        </Grid>
      </Grid>

      {/* mobile View */}

      <Grid container spacing={0} className={Style.mainDiv_mobile}>
        <Grid
          item
          style={{ width: "60%", margin: "0", padding: "0" }}
          xs={12}
          sm={12}
          xl={8}
        >
          <DetailForm getIt={gettingValue} />
        </Grid>

        <Grid style={{ width: "30%" }} item xs={12} xl={4} sm={12}>
          <FinalRate productDetail={product_detail} postFunc={postDataFunc} />
        </Grid>
      </Grid>
    </Container>
  );
}
