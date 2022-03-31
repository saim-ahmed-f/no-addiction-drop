import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import { makeStyles } from '@mui/styles';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';

import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import Grid from '@mui/material/Grid'
import Image from 'next/image';

import Link from "next/link"

import {useRouter} from 'next/router'

const drawerWidth = 240;

import update_main_logo from "../public/update_main_logo.jpg";


const useStyle = makeStyles((theme) => ({
    icons_class : {
        fontSize : "28px",
    },
    menu_typo : {
        fontSize : "20px",
    },
    main_container : {
        display : "flex",
        justifyContent : "space-between",
        alignItems : "center",
    }
}))

export default function MainNavigation() {

    const Style = useStyle()
    const router = useRouter()

    const [usernameView , setUsernameView] = React.useState("")

    React.useEffect(() =>  {
      let userValue = localStorage.getItem("mainUserValue")
      userValue = JSON.parse(userValue);
      if (userValue === null){
        router.push("/Login")
      }else{
      setUsernameView(userValue['username'])}
    } , [])

    const logoutFunc = async (e) => {
      const user_info = localStorage.getItem("mainUserValue")
      localStorage.removeItem("mainUserValue")
      const res = await fetch("https://alcoban-vbk7q.ondigitalocean.app/accounts/Logout-user/")
      router.push("/Login")
    }

    

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Grid container className={Style.main_container} spacing={0}>
            <Grid item xl={4} >
                <Image src={update_main_logo} alt={"logo"} width={80} height={50}/>
            </Grid>
            <Grid item xl={8} >
                <Typography variant="h5" style={{color : "#f9f9f9"}} color="secondary">
                    Hii , {usernameView}
                </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Admin Panel', "Order's", "Product's", 'Analysis'].map((text, index) => (
              <Link key={index} href={index === 0 ? "/admin" : index === 1 ? "/admin/orders/AllOrders" : index === 2 ? "/admin/products" : index === 3 ? "/admin/analysis" : null}>
                <ListItem button >
                  <ListItemIcon>
                    {index === 0 ? <HomeRoundedIcon className={Style.icons_class} /> : null}
                    {index === 1 ? <Inventory2RoundedIcon className={Style.icons_class} /> : null}
                    {index === 2 ? <LocalMallOutlinedIcon className={Style.icons_class} /> : null}
                    {index === 3 ? <AutoGraphRoundedIcon className={Style.icons_class} /> : null}
                  </ListItemIcon>
                  <ListItemText  primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
              {['Pending Order', 'Shipped Order', 'Delivered Order', 'Returned Order'].map((text, index) => (
                <Link key={index} href={index === 0 ? "/admin/orders/PendingOrder" : index === 1 ? "/admin/orders/ShippedOrder" : index === 2 ? "/admin/orders/DeliveredOrder" : index === 3 ? "/admin/orders/ReturnedOrders" : null}>
                <ListItem button >
                  <ListItemIcon>
                      {index === 0 ? <PendingActionsRoundedIcon className={Style.icons_class} /> : null}
                      {index === 1 ? <LocalShippingRoundedIcon className={Style.icons_class} /> : null}
                      {index === 2 ? <BookmarkAddedRoundedIcon className={Style.icons_class} /> : null}
                      {index === 3 ? <RotateLeftRoundedIcon className={Style.icons_class} /> : null}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <ListItem button key={"logout"}>
                <ListItemIcon>
                    <LogoutRoundedIcon className={Style.icons_class} />
                </ListItemIcon>
                <ListItemText onClick={(e) => logoutFunc(e)} primary={"Logout"} />
              </ListItem>
        </Box>
      </Drawer>
    </Box>
  );
}
