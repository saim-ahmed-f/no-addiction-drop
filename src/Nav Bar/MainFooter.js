import {makeStyles} from "@mui/styles"
import Grid from '@mui/material/Grid'

import Image from 'next/image'

import update_main_logo from "../../public/update_main_logo.jpg";
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'



import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import WhatsappRoundedIcon from '@mui/icons-material/WhatsappRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const useStyle = makeStyles((theme) => ({
    zero_mag_padd : {
        padding : "0%",
        margin : "0%",
    },
    mainGrid : {
        display :"flex",
        justifyContent : "space-between",
        alignItems : "center",
        paddingLeft : "8%",
        paddingRight : "8%",
        backgroundColor : theme.palette.primary.main,
        height : "50vh"
    },
    basic_grid_class : {
        width : "30%",
        display : "block"
    },
    iconsDiv : {
        display :"flex",
        justifyContent : "flex-start",
        alignItems : "center",
    },
    iconbtnClass : {
        backgroundColor : theme.palette.secondary.light,
        marginRight : "4%",
    },
    iconClass : {
        fontSize : "25px",
        color : "#1a1a1a"
    },
    headingtypo : {
        color : theme.palette.secondary.light,
        marginBottom : "10px",

    },
    subheadingtypo : {
        color : "#D3D3D3"
    },
    linkclass : {
        color : theme.palette.secondary.light,
        cursor : "pointer",
    }
}))


export default function MainFooter(){

    const Style = useStyle()


    return <Grid className={`${Style.zero_mag_padd} ${Style.mainGrid} `} container spacing={0}>
      <Grid item className={`${Style.zero_mag_padd} ${Style.basic_grid_class} `} xl={4}>
            <Image src={update_main_logo} alt={"Main Logo"} height={100} width={150}/>
            <Typography variant="h5" className={Style.headingtypo} color="secondary">
                About Us
            </Typography>
            <Typography variant="subtitle1" className={Style.subheadingtypo} color="secondary">
            Here you can use rows and columns here to organize your footer content.
            </Typography>
      </Grid>
      <Grid item className={`${Style.zero_mag_padd} ${Style.basic_grid_class} `} style={{textAlign : "center"}} xl={4}>
            <Typography variant="h5" color="secondary"  className={Style.headingtypo}>Page Link's</Typography>
            <Typography variant="subtitle1" color="secondary" className={Style.linkclass} >Home</Typography>
            <Typography variant="subtitle1" color="secondary" className={Style.linkclass}>About Us</Typography>
            <Typography variant="subtitle1" color="secondary" className={Style.linkclass}>Features</Typography>
            <Typography variant="subtitle1" color="secondary" className={Style.linkclass}>Reviews</Typography>
            <Typography variant="subtitle1" color="secondary" className={Style.linkclass}>Home</Typography>
            <Typography variant="subtitle1" color="secondary" className={Style.linkclass}>Home</Typography>
      </Grid>
      <Grid item className={`${Style.zero_mag_padd} ${Style.basic_grid_class} `} xl={4}>
            <Typography variant="h5" color="secondary"  className={Style.headingtypo}>Social Network</Typography>
            <div className={`${Style.zero_mag_padd} ${Style.iconsDiv}`}>
                <IconButton aria-label="Facebook" className={Style.iconbtnClass} >
                    <FacebookRoundedIcon className={Style.iconClass} />
                </IconButton>
                <IconButton aria-label="Whatsapp" className={Style.iconbtnClass}>
                    <WhatsappRoundedIcon className={Style.iconClass}/>
                </IconButton>
                <IconButton aria-label="Instagram" className={Style.iconbtnClass}>
                    <InstagramIcon className={Style.iconClass}/>
                </IconButton>
                <IconButton aria-label="LinkedIn" className={Style.iconbtnClass}>
                    <LinkedInIcon className={Style.iconClass}/>
                </IconButton>
            </div>
      </Grid>
      
    </Grid>
}