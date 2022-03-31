import { makeStyles } from "@mui/styles";
import { Grid, Container, AppBar, Toolbar, Typography } from "@mui/material";

import MainNavigation from "./mainNevigation";
import BasicAdminDisplay from "./basicaAdminDisplay";

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

export default function DashBoard({orderData ,orderDetail }) {
  const Style = useStyle();

  

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
          <BasicAdminDisplay mainDatas = {orderData} orders = {orderDetail}/>
        </Grid>
      </Grid>
    </>
  );
}
