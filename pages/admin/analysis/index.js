import { makeStyles } from "@mui/styles";
import { Grid, Container, AppBar, Toolbar, Typography, Divider } from "@mui/material";

import { useRouter } from "next/router";

import MainNavigation from "../../../adminComponent/mainNevigation";
import MainAnalysisComp from "../../../analysisComponents/mainAnalysisComp"
import ShipAnalysis from "../../../analysisComponents/shipAnalysis"



import {useEffect} from 'react'


export const getStaticProps = async () => {



  const path = String(`https://alcoban-vbk7q.ondigitalocean.app/Orders/OrderData/anaylsis/perPrdouct/`)

  const res = await fetch(path);



  const OrderDataAnaylsis = await res.json();

  const Analysisres = await fetch(`https://alcoban-vbk7q.ondigitalocean.app/product_shipping_detail/Shipping_anaylsis/`);
  const shippingAnalysis = await Analysisres.json()

  return {
    props: {
      perOrderAnalysis: OrderDataAnaylsis,
      shipAnalysis : shippingAnalysis,
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

export default function AnaylsisPage({perOrderAnalysis , shipAnalysis}) {
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
          <MainAnalysisComp orderData = {perOrderAnalysis} />
          <Divider style={{marginTop : "2%" , marginBottom : "2%"}}/>
          <div>
          <ShipAnalysis shipStatus={shipAnalysis} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}