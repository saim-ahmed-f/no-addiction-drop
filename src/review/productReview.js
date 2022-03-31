import * as React from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { LinearProgress, Button } from "@mui/material";

import ReviewCard from "./reviewCard";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";


import Link from "../../mui/Link"

const useStyle = makeStyles((theme) => ({
  zero_mag_padd: {
    margin: "0%",
    padding: "0%",
  },
  main_div: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "2%",
    marginRight: "2%",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  grid_width: {
    width: "33.33%",
  },
  progress_div: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  review_section_class: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "2%",
    marginRight: "2%",
    alignItems: "center",
    flexWrap: "wrap",
  },
  mainHeadingTypo: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
      textAlign: "left",
      marginBottom: "20px",
    },
  },
  main_div_mobile: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-between",
      marginLeft: "2%",
      marginRight: "2%",
      alignItems: "center",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  orderBtn : {
    [theme.breakpoints.down("sm")]: {
      marginTop : "20px",
      marginBottom : "20px",
    }
  },
  orderBtnGrid : {
    [theme.breakpoints.down("sm")]: {
      textAlign : "center"
    }
  }

}));

export default function ProductReview({ reviewDetail }) {
  const Style = useStyle();

  const starCount = (num) => {
    return [1, 2, 3, 4, 5].map((i, index) =>
      i === num ? (
        <StarBorderRoundedIcon key={index} color="primary" />
      ) : i <= num ? (
        <StarRoundedIcon key={index} color="secondary" />
      ) : (
        <StarBorderRoundedIcon key={index} color="primary" />
      )
    );
  };

  return (
    <>
      <div style={{ marginLeft: "2%", marginRight: "2%" }}>
        <Typography
          variant="h4"
          className={Style.mainHeadingTypo}
          color="primary"
        >
          Customer Reviews
        </Typography>
        <Divider />
      </div>
      <Grid className={`${Style.main_div}`} container spacing={0}>
        <Grid
          item
          xl={4}
          className={`${Style.zero_mag_padd} ${Style.grid_width}`}
        >
          <div style={{ display: "flex" }}>
            <Typography variant="h6" color="secondary">
              74
            </Typography>
            <Typography
              variant="h6"
              style={{ marginLeft: "15px" }}
              color="secondary"
            >
              Rating
            </Typography>
          </div>
          <div>{starCount(4 + 1)}</div>
          <Typography variant="h6" color="secondary">
            4.1 Overall rating
          </Typography>
          <Typography variant="h6" color="secondary">
            58 out of 74 (77%)
          </Typography>
          <Typography variant="h6" color="secondary">
            Customers recommended this product
          </Typography>
        </Grid>
        <Grid
          item
          xl={4}
          className={`${Style.zero_mag_padd} ${Style.grid_width}`}
        >
          <div className={`${Style.zero_mag_padd} ${Style.progress_div} `}>
            <Typography variant="h6" color="secondary">
              5
            </Typography>
            {<StarRoundedIcon />}
            <div>
              <LinearProgress variant="determinate" value={10} />
            </div>
            <Button variant="outlined" color="secondary">
              44
            </Button>
          </div>
          <div className={`${Style.zero_mag_padd} ${Style.progress_div} `}>
            <Typography variant="h6" color="secondary">
              4
            </Typography>
            {<StarRoundedIcon />}
            <LinearProgress variant="determinate" value={50} />
            <Button variant="outlined" color="secondary">
              16
            </Button>
          </div>
          <div className={`${Style.zero_mag_padd} ${Style.progress_div} `}>
            <Typography variant="h6" color="secondary">
              3
            </Typography>
            {<StarRoundedIcon />}
            <LinearProgress variant="determinate" value={50} />
            <Button variant="outlined" color="secondary">
              9
            </Button>
          </div>
          <div className={`${Style.zero_mag_padd} ${Style.progress_div} `}>
            <Typography variant="h6" color="secondary">
              2
            </Typography>
            {<StarRoundedIcon />}
            <LinearProgress variant="determinate" value={50} />
            <Button variant="outlined" color="secondary">
              4
            </Button>
          </div>
          <div className={`${Style.zero_mag_padd} ${Style.progress_div} `}>
            <Typography variant="h6" color="secondary">
              1
            </Typography>
            {<StarRoundedIcon />}
            <LinearProgress variant="determinate" value={50} />
            <Button variant="outlined" color="secondary">
              1
            </Button>
          </div>
        </Grid>
        <Grid
          item
          xl={4}
          className={`${Style.zero_mag_padd} ${Style.grid_width} `}
        >
          <Button variant="contained" component={Link} href="/#buy_section" color="secondary">
            Order Now
          </Button>
        </Grid>
      </Grid>

      {/* mobile rating */}

      <Grid className={`${Style.main_div_mobile}`} container spacing={0}>
        <Grid
          item
          xs={12}
          sm={12}
          xl={4}
          className={`${Style.zero_mag_padd} ${Style.grid_width}`}
        >
          <div style={{ display: "flex" }}>
            <Typography variant="h6" color="secondary">
              74
            </Typography>
            <Typography
              variant="h6"
              style={{ marginLeft: "15px" }}
              color="secondary"
            >
              Rating
            </Typography>
          </div>
          <div>{starCount(4 + 1)}</div>
          <Typography variant="h6" color="secondary">
            4.1 Overall rating
          </Typography>
          <Typography variant="h6" color="secondary">
            58 out of 74 (77%)
          </Typography>
          <Typography variant="h6" color="secondary">
            Customers recommended this product
          </Typography>
        </Grid>
        <Grid
          item
          xl={4}
          xs={12}
          sm={12}
          className={`${Style.zero_mag_padd} ${Style.grid_width}`}
        >
          <div className={`${Style.zero_mag_padd} ${Style.progress_div} `}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Typography variant="h6" color="secondary">
                5
              </Typography>
              {<StarRoundedIcon />}
            </div>
            <div style={{ width: "50%" }}>
              <LinearProgress variant="determinate" value={10} />
            </div>
            <div style={{ width: "20%", textAlign: "center" }}>
              <Button variant="outlined" color="secondary">
                44
              </Button>
            </div>
          </div>
          <div className={`${Style.zero_mag_padd} ${Style.progress_div} `}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Typography variant="h6" color="secondary">
                4
              </Typography>
              {<StarRoundedIcon />}
            </div>
            <div style={{ width: "50%" }}>
              <LinearProgress variant="determinate" value={50} />
            </div>
            <div style={{ width: "20%", textAlign: "center" }}>
              <Button variant="outlined" color="secondary">
                16
              </Button>
            </div>
          </div>
          <div className={`${Style.zero_mag_padd} ${Style.progress_div} `}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Typography variant="h6" color="secondary">
                3
              </Typography>
              {<StarRoundedIcon />}
            </div>
            <div style={{ width: "50%" }}>
              <LinearProgress variant="determinate" value={50} />
            </div>
            <div style={{ width: "20%", textAlign: "center" }}>
              <Button variant="outlined" color="secondary">
                9
              </Button>
            </div>
          </div>
          <div className={`${Style.zero_mag_padd} ${Style.progress_div} `}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Typography variant="h6" color="secondary">
                2
              </Typography>
              {<StarRoundedIcon />}
            </div>
            <div style={{ width: "50%" }}>
              <LinearProgress variant="determinate" value={50} />
            </div>
            <div style={{ width: "20%", textAlign: "center" }}>
              <Button variant="outlined" color="secondary">
                4
              </Button>
            </div>
          </div>
          <div className={`${Style.zero_mag_padd} ${Style.progress_div} `}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <Typography variant="h6" color="secondary">
                1
              </Typography>
              {<StarRoundedIcon />}
            </div>
            <div style={{ width: "50%" }}>
              <LinearProgress variant="determinate" value={50} />
            </div>
            <div style={{ width: "20%", textAlign: "center" }}>
              <Button variant="outlined" color="secondary">
                1
              </Button>
            </div>
          </div>
        </Grid>
        <Grid
          item
          xl={4}
          xs={12}
          sm={12}
          className={`${Style.zero_mag_padd} ${Style.grid_width} ${Style.orderBtnGrid}`}
          
        >
          
            <Button variant="contained" component={Link} href="/#buy_section" className={Style.orderBtn} color="secondary">
              Order Now
            </Button>
          
        </Grid>
      </Grid>

      <Divider />
      <div className={`${Style.review_section_class} `}>
        {reviewDetail.map((i, index) => (
          <ReviewCard
            key={index}
            userName={i.main_title}
            starValue={i.star_value}
            body={i.review_body}
          />
        ))}
      </div>
    </>
  );
}
