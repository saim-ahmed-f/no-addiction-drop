import Grid from "@mui/material/Grid";

import ProductImageView from "./ProductImage";
import ProductDetail from "./productDetail"

import { makeStyles } from "@mui/styles";


const useStyle = makeStyles((theme) => ({
    zero_mag_padd : {
        margin : "0%",
        padding:  "0%",
    },
    grid_siez_50 : {
        width : "50%",
    },
    main_grid_container : {
      marginTop : "2%",
      display : "flex",
      justifyContent : "space-between",
      [theme.breakpoints.down('sm')]:{
        display : "none",
      },
    },
    product_detail_div : {
      paddingLeft : "2%"
    },
    main_grid_container_mobile : {
      [theme.breakpoints.down('sm')]:{
        marginTop : "2%",
        display : "flex",
      },
      [theme.breakpoints.up('sm')]:{
        display : "none"
      },
    }
}))


export default function ProductView({ product }) {

    const Style = useStyle()
    
  return (<>
    <Grid className={`${Style.zero_mag_padd} ${Style.main_grid_container}`} container spacing={0}>
      <Grid  className={`${Style.zero_mag_padd} ${Style.grid_siez_50} `}  item   xl={4}>
        <ProductImageView images={product.prdouct_image} />
      </Grid>
      <Grid className={`${Style.zero_mag_padd} ${Style.grid_siez_50} ${Style.product_detail_div}`} item   xl={8}>
        <ProductDetail productAllDetail = {product}/>
      </Grid>
    </Grid>

    <Grid className={`${Style.zero_mag_padd} ${Style.main_grid_container_mobile}`} container spacing={0}>
      <Grid  className={`${Style.zero_mag_padd} ${Style.grid_siez_50} `}  item xs={12}  sm={12} xl={4}>
        <ProductImageView images={product.prdouct_image} />
      </Grid>
      <Grid className={`${Style.zero_mag_padd} ${Style.grid_siez_50} ${Style.product_detail_div}`} item xs={12} sm={12}  xl={8}>
        <ProductDetail productAllDetail = {product}/>
      </Grid>
    </Grid>

    </>
  );
}
