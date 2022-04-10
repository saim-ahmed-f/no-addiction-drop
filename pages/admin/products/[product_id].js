import { makeStyles } from "@mui/styles";
import { Grid, Container, AppBar, Toolbar, Typography } from "@mui/material";

import MainNavigation from "../../../adminComponent/mainNevigation";
import DynamicProductUpdatePage from "../../../productComponents/dynamicProductUpdate"

import {useRouter} from "next/router"

import {useEffect} from 'react'

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


export async function getStaticPaths() {
    
    const res = await fetch('https://alcoban-vbk7q.ondigitalocean.app/product_api/product_detail/AllProductDetail/')
    const allProducts = await res.json()
    
    const paths = allProducts.map((product) => ({
      params: { product_id : product.id.toString() },
    }))
  
    return { paths, fallback: "blocking" }
  }

export const getStaticProps = async ({params}) => {

  

    const path = String(`https://alcoban-vbk7q.ondigitalocean.app/product_api/product_detail/${params.product_id}/`)

  const res = await fetch(
    path
  );
  const ProductData = await res.json();
  return {
    props: {
      OneProductDetail: ProductData,
    },
  };
};


export default function Product({OneProductDetail}) {
  const Style = useStyle();
  
  const router = useRouter()

  useEffect(() => {
    let userValues = localStorage.getItem("mainUserValue");
    userValues = JSON.parse(userValues);
    
    if (userValues === null) {
      router.push("/Login");
    } else if (Object.keys(userValues).length === 0) {
      router.push("/Login");
    }
  }, [router]);
  
    

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
          <DynamicProductUpdatePage productDetail={OneProductDetail} />
        </Grid>
      </Grid>
    </>
  );
}