import { makeStyles } from "@mui/styles";
import {useRouter} from "next/router"
import Typography from "@mui/material/Typography";
import { Divider, TextField, Button, IconButton, Grid, Container } from "@mui/material";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import UpgradeRoundedIcon from '@mui/icons-material/UpgradeRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { useState } from "react";

const useStyle = makeStyles((theme) => ({
  zero_mag_pad: {
    padding: "0%",
    margin: "0%",
  },
  mainGrid : {
    display :"flex",
    justifyContent : "space-evenly",
    marginTop : "2%",

  },
  firstGrid : {
    width : "80%",
    textAlign : "center",
  },
  secondGrid : {
    width : "10%",
    textAlign : "center",
  },
  thirdGrid : {
    width : "10%",
    textAlign : "center",
  },
}));

export default function ProductWhy({ why }) {

    const Style = useStyle()
    const router = useRouter()

    const [benefit , setBenefit] = useState(why)
    const [newBenefit , setNewBenefit] = useState("")

    const benefitOnChange = (e , index) => {
        const values = [...benefit]
        values[index]["why_to_choose"] = e.target.value
        setBenefit(values)
    }


    // Update Event
    const updateEvent =async (item ,index) => {
      let userValues = localStorage.getItem("mainUserValue")
      userValues = JSON.parse(userValues)
      const data = {
        id : item.id,
        why_to_choose: benefit[index]["why_to_choose"],
        product_id: item.product_id,
      };
  
      const res = await fetch(
        `http://127.0.0.1:8000/product_api/product_why_update/${item.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${userValues["token"]}`
          },
          body: JSON.stringify(data),
        }
      );
    }


    // Delete Event
    const DeleteEvent = async (item) => {
      let userValues = localStorage.getItem("mainUserValue")
      userValues = JSON.parse(userValues) 
      const res = await fetch(
        `http://127.0.0.1:8000/product_api/product_why_delete/${item.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${userValues["token"]}`
          },
        }
      );
      const values = [...benefit]
      setBenefit(values.filter((val) => val.id != item.id))
    }


    const onAddBenefits = (e) => {
        setNewBenefit(e.target.value)
    }


    // Add Event
    const AddNewBenefit = async () => {
      const product_id_value = Number(router.query.product_id);
      let userValues = localStorage.getItem("mainUserValue")
      userValues = JSON.parse(userValues)

      const data = {
        why_to_choose: newBenefit,
        product_id: product_id_value,
      };
  
      const res = await fetch(
        "http://127.0.0.1:8000/product_api/product_why_create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${userValues["token"]}`
          },
          body: JSON.stringify(data),
        }
      );
  
      const displayOutput = await res.json();
      
      setNewBenefit("");
  
      if (displayOutput[0] === true) {
        const values = [...benefit];
        values.push({
          id: displayOutput[1],
          why_to_choose: newBenefit,
          product_id: product_id_value,
        });
        setBenefit(values);
      }
    }

  return (
    <>
      <Typography variant="h5" color="primary">
        Product Why To use
      </Typography>
      <Divider />
        {
            benefit.map((item , index) => {
                
                return (
                    <Grid key={item.id} className={`${Style.zero_mag_pad} ${Style.mainGrid} `} container spacing={0}>
                      <Grid className={`${Style.zero_mag_pad} ${Style.firstGrid} `} item xl={8}>
                          <TextField
                            id={`item${item.id}`}
                            label={`Why To Use ${item.id}`}
                            value={item.why_to_choose}
                            fullWidth
                            onChange={(e) => benefitOnChange(e , index)}
                          />
                      </Grid>
                      <Grid item className={`${Style.zero_mag_pad} ${Style.secondGrid} `} xl={2}>
                          <IconButton aria-label="Update" color="secondary" onClick={() => updateEvent(item , index)}>
                            <UpgradeRoundedIcon/>
                          </IconButton>
                      </Grid>
                      <Grid item className={`${Style.zero_mag_pad} ${Style.thirdGrid} `} xl={2}>
                      <IconButton color="error" aria-label="Delete" onClick={() => DeleteEvent( item)}>
                          <DeleteRoundedIcon/>
                          </IconButton>
                      </Grid>
                    </Grid>
                  );
            })
        }
        <div style={{marginBottom : "2%"}} ></div>
        <Divider/>

        <Container  maxWidth="xl">
          <Typography style={{ marginTop : "1%", marginBottom : "1%", }} variant="h5" color="primary">Add New</Typography>

          <Divider/>

            <Grid style={{margin : "0%" , padding : "0%" , marginTop : "2%" , display : "flex" , justifyContent : 'space-between' , alignItems : "center"}} container spacing={0}>
              <Grid item style={{width : "80%"}} xl={8}>
                    <TextField
                      id="newWhytouse"
                      label="Enter New Why To Use ..."
                      value={newBenefit}
                      fullWidth
                      onChange={(e) => onAddBenefits(e)}
                    />
              </Grid>
              <Grid item style={{width : "10%"}} xl={4}>
                <Button variant="contained" onClick={() => AddNewBenefit()} color="primary">
                  Add {<AddRoundedIcon/>}
                </Button>
              </Grid>
            </Grid>

        </Container>

    </>
  );
}
