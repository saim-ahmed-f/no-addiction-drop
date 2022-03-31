import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Divider, Paper } from "@mui/material";

import { makeStyles } from "@mui/styles";

import MainChart from "./Chart";
import Orders from "./Orders"

const useStyle = makeStyles((theme) => ({
  AppBar_typo: {
    color: theme.palette.secondary.light,
  },
  main_paper_class: {
    padding: "15px",
    alignItems: "center",
    textAlign: "center",
    width: "250px",
  },
  paper_text: {
    fontSize: "18px",
    fontFamily: "Roboto",
  },
  number_typo: {
    fontSize: "25px",
    fontFamily: "Roboto",
  },
}));

export default function BasicAdminDisplay({mainDatas , orders}) {
  const Style = useStyle();

 

  return (
    <>
      <Grid
        style={{
          marginTop: "2%",
          marginBottom: "2%",
          justifyContent: "space-around",
        }}
        container
        spacing={2}
      >
        <Grid item xl={4}>
          <Paper elevation={3} className={Style.main_paper_class}>
            <Typography
              className={Style.paper_text}
              variant="h6"
              color="primary"
            >
              Total Active Order's
            </Typography>

            <Typography
              className={Style.number_typo}
              variant="h5"
              color="primary"
            >
              {mainDatas[3]}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xl={4}>
          <Paper elevation={3} className={Style.main_paper_class}>
            <Typography
              className={Style.paper_text}
              variant="h6"
              color="primary"
            >
              Pending Order's
            </Typography>

            <Typography
              className={Style.number_typo}
              variant="h5"
              color="primary"
            >
              {mainDatas[1]}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xl={4}>
          <Paper elevation={3} className={Style.main_paper_class}>
            <Typography
              className={Style.paper_text}
              variant="h6"
              color="primary"
            >
              Shipped Order's
            </Typography>

            <Typography
              className={Style.number_typo}
              variant="h5"
              color="primary"
            >
              {mainDatas[2]}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Divider />
      <Container style={{ marginBottom: "2%" }} maxWidth="xl">
        <Typography
          style={{ textAlign: "center", marginTop: "1%", marginBottom: "1%" }}
          variant="h5"
          color="primary"
        >
          OverAll Sale's
        </Typography>
        <MainChart mainData={mainDatas[0]} />
      </Container>
      <Divider />
      <Container maxWidth="xl">
        <Orders order={orders} />
      </Container>
    </>
  );
}
