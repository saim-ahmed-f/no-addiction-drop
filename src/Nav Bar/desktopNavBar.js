import { makeStyles } from "@mui/styles";

import Image from "next/image";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { Divider, IconButton } from "@mui/material";

import update_main_logo from "../../public/update_main_logo.jpg";

import Container from "@mui/material/Container";

import Link from "../../mui/Link";

import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

import {useState} from "react"

const useStyle = makeStyles((theme) => ({
  zero_mag_padd: {
    margin: "0%",
    padding: "0%",
  },
  first_div: {
    width: "50%",
  },
  second_div: {
    width: "30%",
  },
  third_div: {
    width: "50%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    [theme.breakpoints.down('md')]: {
      display : "none"
    },
  },
  nav_typo: {
    fontSize: "20px",
    marginRight: "2%",
    color: theme.palette.secondary.light,
    borderBottom: `solid 1px ${theme.palette.secondary.light}`,
    fontFamily: "monospace",
    paddingBottom: "2px",
    "&:hover": {
      color: theme.palette.secondary.main,
      fontSize: "22px",
      borderColor: theme.palette.secondary.main,
    },
  },
  nav_btn: {
    fontFamily: "monospace",
    fontSize: "15px",
    borderRadius: "20px",
    marginRight: "2%",
  },
  logo_class: {
    marginLeft: "2%",
  },
  sub_div_main: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "1%",
  },
  sub_div_2: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mobileViewPort : {
    [theme.breakpoints.down('sm')]: {
      display : "flex",
      justifyContent : "flex-end",
      width: "50%",
    },
    [theme.breakpoints.up('sm')]: {
      display : "none"
    },
    
  },
  mobileIconButton : {
    color : theme.palette.secondary.light
  },
  websiteHeading : {
    [theme.breakpoints.down('sm')]: {
      fontSize : "16px"
    },
  },
  mainHeadercolor : {
    
  }
}));

//backgroundColor : "#ffc0cb",

export default function MainNavBar({ mainHeading }) {
  const Style = useStyle();


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const mobileView = (
    <div>
      <IconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <FormatAlignRightIcon className={Style.mobileIconButton} />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Home</MenuItem>
        <MenuItem onClick={handleClose}>About Us</MenuItem>
        <MenuItem onClick={handleClose}>Features</MenuItem>
        <MenuItem onClick={handleClose}>Review's</MenuItem>
        <Divider/>
        <MenuItem onClick={handleClose}><Button variant="contained" color="primary">
          Buy Now
        </Button></MenuItem>
      </Menu>
    </div>
  );

  return (
    <div >
      <Container
        className={`${Style.zero_mag_padd} ${Style.sub_div_main} `}
        maxWidth="xl"
      >
        <div className={`${Style.zero_mag_padd} `} style={{ width: "50%" }}>
          <Typography variant="h5" className={Style.websiteHeading}  color="primary">
            {mainHeading}
          </Typography>
        </div>
        <div className={`${Style.zero_mag_padd} ${Style.sub_div_2}`}>
          <LocalPhoneRoundedIcon />
          <Typography
            style={{ marginRight: "8%", fontSize: "20px" }}
            variant="h5"
            color="primary"
          >
            +911234567899
          </Typography>
        </div>
      </Container>
      <AppBar
        className={`${Style.zero_mag_padd} ${Style.mainHeadercolor}`}
        position="static"
        
      >
        <Toolbar className={`${Style.zero_mag_padd} `} >
          <Grid className={`${Style.zero_mag_padd} `} style={{alignItems : "center"}} container spacing={0}>
            <Grid
              className={`${Style.zero_mag_padd} ${Style.first_div} `}
              
              item
              xl={6}
            >
              <Image src={update_main_logo} alt="logo" width={100} height={60} />
            </Grid>

            <Grid
              className={`${Style.zero_mag_padd} ${Style.third_div} `}
              item
              xl={10}
            >
              <Typography
                className={`${Style.nav_typo} `}
                variant="h5"
                color="secondary"
              >
                Home
              </Typography>

              <Typography
                className={`${Style.nav_typo} `}
                variant="h5"
                color="secondary"
              >
                About Us
              </Typography>
              <Typography
                className={`${Style.nav_typo} `}
                variant="h5"
                color="secondary"
              >
                Features
              </Typography>
              <Typography
                className={`${Style.nav_typo} `}
                variant="h5"
                color="secondary"
              >
                Reviews
              </Typography>

              <Button
                className={`${Style.nav_btn} `}
                variant="contained"
                color="secondary"
                component={Link}
                noLinkStyle
                href="/#buy_section"
              >
                Buy Now
              </Button>
            </Grid>
            <Grid
              className={`${Style.zero_mag_padd} ${Style.mobileViewPort} `}
              item
              xl={6}
            >{mobileView}</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
