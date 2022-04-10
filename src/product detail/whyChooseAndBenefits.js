import { makeStyles } from "@mui/styles";
import Image from "next/image";

import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const useStyle = makeStyles((theme) => ({
  zero_padd_mag: {
    margin: "0%",
    padding: "0%",
  },
  main_grid: {
    marginLeft: "10px",
    marginRight: "10px",
  },
  first_grid: {
      
  },
  second_grid: {
    marginLeft: "40px",
    
},
  productHeading_typo: {
    fontFamily: "Roboto",
    marginBottom: "2%",
    fontWeight: "600",
    [theme.breakpoints.down('sm')]:{
      textAlign : "left",
      fontSize : "25px",
    },
  },
  productContentTypo: {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "400",
    marginBottom: "2%",
    [theme.breakpoints.down('sm')]:{
      textAlign : "left",
      fontSize : "18px",
    },
  },
}));

export default function WhyChooseAndBenefits({ productDetails }) {
  const Style = useStyle();

  const gettingListFormat = (productList, listName) => {
    return productList.map((i, index) => (
      <li className={Style.productContentTypo} key={index}>
        {i[listName]}
      </li>
    ));
  };

  

  return (
    <>
      <Grid
        className={`${Style.zero_padd_mag} ${Style.main_grid} `}
        container
        spacing={0}
        id="features_section"
      >
        <Grid
          item
          className={`${Style.zero_padd_mag} ${Style.first_grid} `}
          xl={6}
        >
          <Image
            src={productDetails.prdouct_image[1].get_image}
            alt={productDetails.prdouct_image[1].alt}
            width={500}
            height={450}
          />
        </Grid>
        <Grid
          item
          className={`${Style.zero_padd_mag} ${Style.second_grid} `}
          xl={6}
        >
          <Typography
            variant="h4"
            className={Style.productHeading_typo}
            color="primary"
          >
            Why Choose {productDetails.product_name}
          </Typography>
          <ul>
            {gettingListFormat(
              productDetails.product_benefit,
              "product_benefit"
            )}
          </ul>
          <Typography
            variant="h4"
            className={Style.productHeading_typo}
            color="primary"
          >
            Benefits of {productDetails.product_name}
          </Typography>
          <ul>
            {gettingListFormat(productDetails.product_why, "why_to_choose")}
          </ul>
        </Grid>
      </Grid>
      <div className={`${Style.zero_padd_mag} ${Style.second_grid} `}>
        <Typography
          variant="h4"
          className={Style.productHeading_typo}
          color="primary"
        >
          How to Use ?
        </Typography>
        <ul>
          {gettingListFormat(productDetails.product_how_to_use, "how_to_use")}
        </ul>
      </div>
    </>
  );
}
