import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import {
  Divider,
  TextField,
  Button,
  IconButton,
  Grid,
  Container,
} from "@mui/material";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import UpgradeRoundedIcon from "@mui/icons-material/UpgradeRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { useState } from "react";

const useStyle = makeStyles((theme) => ({
  zero_mag_pad: {
    padding: "0%",
    margin: "0%",
  },
  mainGrid: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "2%",
  },
  firstGrid: {
    width: "80%",
    textAlign: "center",
  },
  secondGrid: {
    width: "10%",
    textAlign: "center",
  },
  thirdGrid: {
    width: "10%",
    textAlign: "center",
  },
}));

export default function ProductBenefits({ benefits , userToken}) {
  const Style = useStyle();
  const router = useRouter();
  
    

  const [benefit, setBenefit] = useState(benefits);

  const [newBenefit, setNewBenefit] = useState("");

  const benefitOnChange = (e, index) => {
    const values = [...benefit];
    values[index]["product_benefit"] = e.target.value;
    setBenefit(values);
  };

  const updateEvent = async (item , index) => {
    let userValues = localStorage.getItem("mainUserValue")
    userValues = JSON.parse(userValues)

    const data = {
      id : item.id,
      product_benefit: benefit[index].product_benefit,
      product_id: item.product_id,
    };

    const res = await fetch(
      `http://127.0.0.1:8000/product_api/product_benefit_update/${item.id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${userValues["token"]}`
        },
        body: JSON.stringify(data),
      }
    );
    

  };

  const DeleteEvent = async (item , index) => {
    let userValues = localStorage.getItem("mainUserValue")
    userValues = JSON.parse(userValues)

    const res = await fetch(
      `http://127.0.0.1:8000/product_api/product_benefit_delete/${item.id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${userValues["token"]}`
        },
      }
    );


    
    const values = [...benefit]
    console.log(values.filter((val) => val.id != item.id))

    setBenefit(values.filter((val) => val.id != item.id))
  };

  const onAddBenefits = (e) => {
    setNewBenefit(e.target.value);
  };

  const AddNewBenefit = async () => {
    const product_id_value = Number(router.query.product_id);
    let userValues = localStorage.getItem("mainUserValue")
    userValues = JSON.parse(userValues)

    const data = {
      product_benefit: newBenefit,
      product_id: product_id_value,
    };

    const res = await fetch(
      "http://127.0.0.1:8000/product_api/product_benefit_create/",
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
        product_benefit: newBenefit,
        product_id: product_id_value,
      });
      setBenefit(values);
    }
  };

  return (
    <>
      <Typography variant="h5" color="primary">
        Product Benefit's
      </Typography>
      <Divider />
      {benefit.map((item, index) => {
        return (
          <Grid
            key={item.id}
            className={`${Style.zero_mag_pad} ${Style.mainGrid} `}
            container
            spacing={0}
          >
            <Grid
              className={`${Style.zero_mag_pad} ${Style.firstGrid} `}
              item
              xl={8}
            >
              <TextField
                id={`item${item.id}`}
                label={`Benfit ${item.id}`}
                value={item.product_benefit}
                fullWidth
                onChange={(e) => benefitOnChange(e, index)}
              />
            </Grid>
            <Grid
              item
              className={`${Style.zero_mag_pad} ${Style.secondGrid} `}
              xl={2}
            >
              <IconButton
                aria-label="Update"
                color="secondary"
                onClick={() => updateEvent(item , index)}
              >
                <UpgradeRoundedIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              className={`${Style.zero_mag_pad} ${Style.thirdGrid} `}
              xl={2}
            >
              <IconButton
                color="error"
                aria-label="Delete"
                onClick={() => DeleteEvent(item , index)}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
      <div style={{ marginBottom: "2%" }}></div>
      <Divider />

      <Container maxWidth="xl">
        <Typography
          style={{ marginTop: "1%", marginBottom: "1%" }}
          variant="h5"
          color="primary"
        >
          Add New
        </Typography>

        <Divider />

        <Grid
          style={{
            margin: "0%",
            padding: "0%",
            marginTop: "2%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          container
          spacing={0}
        >
          <Grid item style={{ width: "80%" }} xl={8}>
            <TextField
              id="newBenefit"
              label="Enter New Benefit ..."
              value={newBenefit}
              fullWidth
              onChange={(e) => setNewBenefit(e.target.value)}
            />
          </Grid>
          <Grid item style={{ width: "10%" }} xl={4}>
            <Button
              variant="contained"
              onClick={() => AddNewBenefit()}
              color="primary"
            >
              Add {<AddRoundedIcon />}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
