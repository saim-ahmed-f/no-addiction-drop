import {makeStyles} from "@mui/styles"

import {Divider , Paper , Typography, Container, Grid} from "@mui/material"

import MainChart from "../adminComponent/Chart"

const useStyle = makeStyles((theme) => ({
    zero_mag_padd : {
        margin  :"0%",
        padding : "0%",
    },
    mainPaper : {
        padding : "2%",
        marginTop : "2%",
        marginBottom : "2%",
    },
    mainTypoPaper : {
        textAlign : "center"
    },
    mainGrid : {
        marginTop : "0.5%",
        marginBottom : "2%",
    },
    grid_class : {
        width : "50%",
        marginTop : "2%",
        marginBottom : "2%",
    }
}))

export default function MainAnalysisComp({ orderData }){

    const Style = useStyle()

  



    return<>
        <Paper elevation={3} className={Style.mainPaper} >
        <Typography variant="h5" className={Style.mainTypoPaper} color="primary">
            Market Analysis
        </Typography>
        </Paper>

        <Divider/>

        <Grid container className={`${Style.mainGrid}`} spacing={2}>
        
        
          {orderData.map((i) => {

            return  (<Grid key={i.product_id} item xl={6} className={Style.grid_class} >
                    
                        
                            <Typography  variant="h6" color="primary">
                                {i.product_name}
                            </Typography>
                            <Divider style={{marginTop : "2%" , marginBottom : "2%"}} />
                            <MainChart mainData={i.product_data}/>
                           
                    </Grid>)
          })}

        </Grid>
    </>
}