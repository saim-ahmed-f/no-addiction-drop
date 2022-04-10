import { Divider,  Grid } from "@mui/material"
import { makeStyles } from "@mui/styles"

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const useStyle = makeStyles(() => ({
    zero_padd_mag : {
        padding : "0%",
        margin : "0%",
    },
    price_typo : {

    },
    price_heading_typo : {
        fontSize :'18px'
    } ,
    mainGrid : {
        display : "flex",
        justifyContent : "space-between",
        alignItems : "center",
    },
    first_grid : {
        display : "flex",
        justifyContent : "space-between",
        alignItems : "center",
    },
    second_grid : {
        display : "flex",
        justifyContent : "space-between",
        alignItems : "center",
    },
    image_class : {
        objectFit : "cover",
    },
    about_typo : {
        fontSize :'14px',
    },
}))

import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import Link from "next/link";


export default function ProductCard({product}){

    const Style = useStyle()

   


    const priceValue = (price) => { 
    
    return (<div  style={{ alignItems  : "center" , display: "flex",justifyContent : "center" }} >
        {<CurrencyRupeeRoundedIcon color="primary" fontSize="small"/>}
        <Typography className={Style.price_typo} variant="h6" color="primary">{price}</Typography>
    </div>)}

    const discountPer = <div  style={{ alignItems  : "center" , display: "flex",justifyContent : "center" }} >
    <Typography className={Style.price_typo} variant="h6" color="primary">{product.discount_value}</Typography>
    {<PercentRoundedIcon color="primary" fontSize="small"/>}
</div>

    return <>
       
    <Card elevation={3} sx={{ maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="200"
        className={Style.image_class}
        image={product.prdouct_image[1].get_image}
        alt={product.prdouct_image[1].alt}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.product_name}
        </Typography>
        <Typography className={Style.about_typo} variant="body2" color="text.secondary">
          {String(product.product_about).slice(0,200)} ....
        </Typography>
        <Divider/>
        <Grid className={`${Style.zero_padd_mag} ${Style.mainGrid} `} container spacing={0}>
          <Grid className={`${Style.zero_padd_mag} ${Style.first_grid} `} item xl={6}>
            <Typography className={Style.price_heading_typo} variant="h5" color="primary">Main Price : </Typography>
            {priceValue(product.product_price)}
          </Grid>
          <Grid className={`${Style.zero_padd_mag} ${Style.second_grid} `} item xl={6}>
            <Typography variant="h5" className={Style.price_heading_typo} color="primary">Online Price : </Typography>
            {priceValue(product.product_online_price)}
          </Grid>
        </Grid>
        
        <Grid className={`${Style.zero_padd_mag} ${Style.mainGrid} `} container spacing={0}>
          <Grid className={`${Style.zero_padd_mag} ${Style.first_grid} `} item xl={6}>
            <Typography className={Style.price_heading_typo} variant="h5" color="primary">Discount Per : </Typography>
            {discountPer}
          </Grid>
          <Grid className={`${Style.zero_padd_mag} ${Style.second_grid} `} item xl={6}>
            <Typography variant="h5" className={Style.price_heading_typo} color="primary">Delivery Charge : </Typography>
            {priceValue(product.delivery_charge)}
          </Grid>
        </Grid>

        <Divider/>
      </CardContent>
      <CardActions>
        <Link href={`/admin/products/${product.id}`} >
        <Button size="medium" variant="contained">Update</Button>
        </Link>
      </CardActions>
    </Card>
 
    </>
}


