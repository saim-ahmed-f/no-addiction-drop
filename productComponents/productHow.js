import { makeStyles } from "@mui/styles";
import {useRouter} from "next/router"
import Typography from "@mui/material/Typography";
import { Divider, TextField, Button, IconButton, Grid, Container } from "@mui/material";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import UpgradeRoundedIcon from '@mui/icons-material/UpgradeRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { useState } from "react";

import toast from "../spinnerComponents/noitificationComp" 

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

export default function ProductHow({ how }) {

    const Style = useStyle()
    const router = useRouter()

    const [benefit , setBenefit] = useState(how)

    const [newBenefit , setNewBenefit] = useState("")

    const benefitOnChange = (e , index) => {
        
        const values = [...benefit]
        values[index]["how_to_use"] = e.target.value
        setBenefit(values)
    }

    const updateEvent = async (item , index) => {
      let userValues = localStorage.getItem("mainUserValue")
      userValues = JSON.parse(userValues)
      const data = {
        id : item.id,
        how_to_use: benefit[index]["how_to_use"],
        product_id: item.product_id,
      };
  
      const res = await fetch(
        `https://alcoban-vbk7q.ondigitalocean.app/product_api/product_How_to_Use_update/${item.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${userValues["token"]}`
          },
          body: JSON.stringify(data),
        }
      );

      const call_result = await res.json()

      if (call_result[0] == true){
        toast({type : call_result[2] , message : call_result[1]})
      }else{
        toast({type : call_result[2] , message : call_result[1]})
      }

    }

    const DeleteEvent= async (item) => {
      let userValues = localStorage.getItem("mainUserValue")
      userValues = JSON.parse(userValues) 
      const res = await fetch(
        `https://alcoban-vbk7q.ondigitalocean.app/product_api/product_How_to_Use_delete/${item.id}/`,
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

      const call_result = await res.json()

      if (call_result[0] == true){
        toast({type : call_result[2] , message : call_result[1]})
      }else{
        toast({type : call_result[2] , message : call_result[1]})
      }

    }


    const onAddBenefits = (e) => {
        setNewBenefit(e.target.value)
    }

    const AddNewBenefit = async () => {
      const product_id_value = Number(router.query.product_id);
      let userValues = localStorage.getItem("mainUserValue")
      userValues = JSON.parse(userValues)

      const data = {
        how_to_use: newBenefit,
        product_id: product_id_value,
      };
  
      const res = await fetch(
        "https://alcoban-vbk7q.ondigitalocean.app/product_api/product_How_to_Use_create/",
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

      if (displayOutput[0] == true){
        toast({type : displayOutput[3] , message : displayOutput[2]})
      }else{
        toast({type : displayOutput[3] , message : displayOutput[2]})
      }
        
      setNewBenefit("");
  
      if (displayOutput[0] === true) {
        const values = [...benefit];
        values.push({
          id: displayOutput[1],
          how_to_use: newBenefit,
          product_id: product_id_value,
        });
        setBenefit(values);
      }  
    }

  return (
    <>
      <Typography variant="h5" color="primary">
        Product How To Use
      </Typography>
      <Divider />
        {
            benefit.map((item , index) => {
                
                return (
                    <Grid key={item.id} className={`${Style.zero_mag_pad} ${Style.mainGrid} `} container spacing={0}>
                      <Grid className={`${Style.zero_mag_pad} ${Style.firstGrid} `} item xl={8}>
                          <TextField
                            id={`item${item.id}`}
                            label={`How to Use step`}
                            value={item.how_to_use}
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
                      id="newstep"
                      label="Enter New Step ..."
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
