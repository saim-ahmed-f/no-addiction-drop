import {makeStyles} from "@mui/styles"
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Divider } from "@mui/material"

import ProductCard from "./productCard"


const useStyle = makeStyles((theme) => ({
    zero_padd_marg : {
        padding : "0%",
        margin : "0%",
    },
    heading_typo : {
        marginTop : "1%",
        marginBottom : "1%",
        fontSize : "30px",
        fontFamily : "Roboto",
        textAlign : "center",
    },
    mainContainer : {
        display : "flex",
        justifyContent : "space-around",
        marginTop : "1%",
        marginBottom : "2%",
    },
}))


export default function AllProductDisplay({ allProduct }){
    
    const Style = useStyle()
    


    return <>
    
        <Typography className={Style.heading_typo} variant="h5" color="primary">All Product's</Typography>

        <Divider/>

        <Container className={`${Style.zero_padd_marg} ${Style.mainContainer} `} maxWidth="xl" >
          
          {
              allProduct.map((product , index) => {
                return <ProductCard key={index} product={product} />
              })
          }

        </Container>
    
    </>
}