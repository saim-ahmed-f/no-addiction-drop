import * as React from "react";
import Container from "@mui/material/Container";

import MainNavBar from "../src/Nav Bar/desktopNavBar";

import ProductView from "../src/product/productView";
import ProductAboutSection from "../src/product detail/aboutSection";
import WhyChooseAndBenefits from "../src/product detail/whyChooseAndBenefits";
import ProductReview from "../src/review/productReview";
import Grid from '@mui/material/Grid'

import MainFooter from "../src/Nav Bar/MainFooter"



// Fetch Data of Product

export const getStaticProps = async () => {
  const res = await fetch(
    "https://alcoban-vbk7q.ondigitalocean.app/product_api/product_detail/1/"
  );
  const data = await res.json();
  const res2 = await fetch(
    "https://alcoban-vbk7q.ondigitalocean.app/product_review/review_detail/1/"
  );
  const dataReview = await res2.json();

  return {
    props: {
      product_detail: data,
      review_detail: dataReview,
    },
  };
};

export default function Index({ product_detail, review_detail }) {
  console.log(product_detail)

  return (
    <Container
      style={{ padding: "0%", margin: "0%", alignItems: "center" , overflow : "hidden" , flexWrap : "wrap" }}
      maxWidth="xl"
    >
      <MainNavBar mainHeading = {product_detail["web_heading"]} />
      
      <ProductView product={product_detail} />
      <ProductAboutSection productDetails={product_detail} />
      <WhyChooseAndBenefits productDetails={product_detail} />
      <ProductReview reviewDetail={review_detail} />
      <MainFooter/>
    </Container>
  );
}
