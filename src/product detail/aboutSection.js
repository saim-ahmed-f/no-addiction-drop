import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Image from "next/image";


const useStyle = makeStyles((theme) => ({
  zero_mag_padd: {
    padding: "0%",
    margin: "0%",
  },
  main_grid : {
      marginTop : "5%",
      [theme.breakpoints.down('sm')]:{
        display : "none",
      },
  },
  first_grid: {
    width: "50%",
    paddingLeft : "30px",
  },
  second_grid: {
    width: "50%",
    alignItems : "center",
    alignContent : "center",
    paddingLeft : "120px"
  },
  productHeadingTypo  :{
    fontFamily : "Roboto",
    marginBottom : "2%"
  },
  productAboutTypo : {
    fontSize:"21px",
    fontFamily : "Roboto",
    fontWeight : "350",
  },
  main_grid_mobile : {
    [theme.breakpoints.down('sm')]:{
      marginTop : "5%",
    },
    [theme.breakpoints.up('sm')]:{
      display : "none"
    },
},
}));

export default function ProductAboutSection({ productDetails }) {
  const Style = useStyle();

  return (<>
    <Grid className={`${Style.zero_mag_padd} ${Style.main_grid}`} container spacing={0}>
      <Grid
        item
        className={`${Style.zero_mag_padd} ${Style.first_grid} `}
        
        xl={6}
      >
        <Typography className={Style.productHeadingTypo} variant="h4" color="primary">
          About {productDetails.product_name}
        </Typography>
        <Typography variant="h6" className={Style.productAboutTypo} color="secondary">
            {productDetails.product_about}    
        </Typography>
      </Grid>
      <Grid
        item
        className={`${Style.zero_mag_padd} ${Style.second_grid} `}
        
        xl={6}
      >
        <Image src={productDetails.prdouct_image[0].get_image} alt={productDetails.prdouct_image[0].alt} width={500} height={450}/>
      </Grid>
    </Grid>

    {/* Mobile View */}

    <Grid className={`${Style.zero_mag_padd} ${Style.main_grid_mobile}`} container spacing={0}>
    <Grid
        item
        className={`${Style.zero_mag_padd} ${Style.second_grid} `}
        xs={12}
        sm={12}
        xl={6}
      >
        <Image src={productDetails.prdouct_image[0].get_image} alt={productDetails.prdouct_image[0].alt} width={500} height={450}/>
      </Grid>

      <Grid
        item
        className={`${Style.zero_mag_padd} ${Style.first_grid} `}
        xs={12}
        sm={12}
        xl={6}
      >
        <Typography className={Style.productHeadingTypo} variant="h4" color="primary">
          About {productDetails.product_name}
        </Typography>
        <Typography variant="h6" className={Style.productAboutTypo} color="secondary">
            {productDetails.product_about}    
        </Typography>
      </Grid>
      
    </Grid>
    </>
  );
}
