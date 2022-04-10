import { makeStyles } from "@mui/styles";

import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Divider, Grid, Paper, TextField, Button } from "@mui/material";

import ProductBenefits from "./productBenefits";
import ProductWhy from "./productWhy";
import ProductHow from "./productHow";

import {useRouter} from "next/router"

import toast from "../spinnerComponents/noitificationComp"

const useStyle = makeStyles((theme) => ({
  zero_padd_marg: {
    padding: "0%",
    margin: "0%",
  },
  heading_typo: {
    textAlign: "center",
    marginTop: "1%",
    marginBottom: "1%",

    fontSize: "25px",
  },
  mainGrid: {
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: "2%",
  },
  firstGrid: {
    width: "30%",
  },
  secondGrid: {
    width: "30%",
  },
  thirdGrid: {
    width: "30%",
  },
  text_input_class: {
    marginTop: "5%",
    marginBottom: "5%",
  },
  title_typo: {
    marginTop: "1%",
    marginBottom: "1%",
    fontSize: "20px",
    fontFamily: "Roboto",
  },
  mainButton: {
    marginTop: "2%",
    marginBottom: "1%",
    textAlign: "center",
  },
}));

export default function DynamicProductUpdatePage({ productDetail }) {
  const Style = useStyle();
  const router = useRouter()
  const [basicDetail, setBasicDetail] = useState({
    productName: productDetail.product_name,
    mainPrice: productDetail.product_price,
    onlinePrice: productDetail.product_online_price,
    discountRate: productDetail.discount_value,
    deliveryPrice: productDetail.delivery_charge,
    aboutProduct: productDetail.product_about,
    wesiteHeading: productDetail.web_heading,
  });

  const basicDeatilChangeHandler = (e) => {
    const values = { ...basicDetail };
    values[`${e.target.id}`] = e.target.value;
    setBasicDetail(values);
  };

  // Update Main Basic Detail

  const UpdateEvent = async (e) => {

    let userValues = localStorage.getItem("mainUserValue")
    userValues = JSON.parse(userValues)

    const data = {
      id : productDetail.id,
      web_heading: basicDetail.wesiteHeading,
      product_name: basicDetail.productName,
      product_price: basicDetail.mainPrice,
      product_about: basicDetail.aboutProduct,
      product_online_price: basicDetail.onlinePrice,
      delivery_charge: basicDetail.deliveryPrice,
      discount_value: basicDetail.discountRate,
    };

    const res = await fetch(
      `https://alcoban-vbk7q.ondigitalocean.app/product_api/product_update/per_Product/${productDetail.id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${userValues["token"]}`
        },
        body: JSON.stringify(data),
      }
    );
    
    const call_result = await res.json()

      if (call_result[0] == true){
        toast({type : call_result[2] , message : call_result[1]})
      }else{
        toast({type : call_result[2] , message : call_result[1]})
      }

  }

  return (
    <>
      <Typography className={Style.heading_typo} variant="h5" color="primary">
        Update Product
      </Typography>
      <Divider />
      <Paper elevation={3} style={{ padding: "2%", marginTop: "4%" }}>
        <Typography variant="h6" className={Style.title_typo} color="primary">
          website Heading
        </Typography>
        <Divider />
        <TextField
          id="wesiteHeading"
          label="Website Heading"
          value={basicDetail.wesiteHeading}
          style={{ marginTop: "2%" }}
          fullWidth
          onChange={(e) => basicDeatilChangeHandler(e)}
        />
        <Typography variant="h6" color="primary" className={Style.title_typo}>
          Basic Detail's
        </Typography>
        <Divider />
        <Grid
          container
          className={`${Style.zero_padd_marg} ${Style.mainGrid} `}
          spacing={0}
        >
          <Grid
            item
            className={`${Style.zero_padd_marg} ${Style.firstGrid} `}
            xl={4}
          >
            <TextField
              id="productName"
              label="Product Name"
              fullWidth
              className={Style.text_input_class}
              value={basicDetail.productName}
              onChange={(e) => basicDeatilChangeHandler(e)}
            />
          </Grid>
          <Grid
            item
            className={`${Style.zero_padd_marg} ${Style.secondGrid} `}
            xl={4}
          >
            <TextField
              id="mainPrice"
              label="Main Price"
              type="number"
              className={Style.text_input_class}
              fullWidth
              value={basicDetail.mainPrice}
              onChange={(e) => basicDeatilChangeHandler(e)}
            />
          </Grid>
          <Grid
            item
            className={`${Style.zero_padd_marg} ${Style.thirdGrid} `}
            xl={4}
          >
            <TextField
              id="onlinePrice"
              label="Online Price"
              type="number"
              fullWidth
              className={Style.text_input_class}
              value={basicDetail.onlinePrice}
              onChange={(e) => basicDeatilChangeHandler(e)}
            />
          </Grid>
        </Grid>

        <Grid
          container
          className={`${Style.zero_padd_marg} ${Style.mainGrid} `}
          spacing={0}
        >
          <Grid
            item
            className={`${Style.zero_padd_marg} ${Style.firstGrid} `}
            xl={4}
          >
            <TextField
              id="discountRate"
              label="Discount Rate"
              fullWidth
              type="number"
              className={Style.text_input_class}
              value={basicDetail.discountRate}
              onChange={(e) => basicDeatilChangeHandler(e)}
            />
          </Grid>
          <Grid
            item
            className={`${Style.zero_padd_marg} ${Style.secondGrid} `}
            xl={4}
          >
            <TextField
              id="deliveryPrice"
              label="Delivery Charge"
              type="number"
              className={Style.text_input_class}
              fullWidth
              value={basicDetail.deliveryPrice}
              onChange={(e) => basicDeatilChangeHandler(e)}
            />
          </Grid>
        </Grid>
        <Divider />
        <TextField
          id="aboutProduct"
          label="About Product"
          value={basicDetail.aboutProduct}
          style={{ marginTop: "2%", marginBottom: "2%" }}
          fullWidth
          multiline
          rows={4}
          onChange={(e) => basicDeatilChangeHandler(e)}
        />
        <Divider />
        <div className={Style.mainButton}>
          <Button variant="contained" onClick={() => UpdateEvent()} color="primary">
            Update
          </Button>
        </div>
      </Paper>

      <Paper elevation={3} style={{ padding: "2%", marginTop: "4%" }}>
        <ProductBenefits benefits={productDetail.product_benefit} />
      </Paper>

      <Paper elevation={3} style={{ padding: "2%", marginTop: "4%" }}>
        <ProductWhy why={productDetail.product_why} />
      </Paper>

      <Paper elevation={3} style={{ padding: "2%", marginTop: "4%" }}>
        <ProductHow how={productDetail.product_how_to_use} />
      </Paper>
    </>
  );
}
