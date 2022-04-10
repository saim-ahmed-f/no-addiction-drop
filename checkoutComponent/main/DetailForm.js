import { makeStyles } from "@mui/styles";
import { useState } from "react";

import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Card, Divider, Button } from "@mui/material";

import { FormControl } from "@mui/material";

const useStyle = makeStyles((theme) => ({
  zero_mag_padd: {
    margin: "0%",
    padding: "0%",
  },
  width_class: {},
  cardClass: {
    width: "90%",
    paddingTop: "8%",
    paddingBottom: "8%",
    display: "flex",
    justifyContent: "center",
  },
  mainGrid: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  text_Field: {},
}));

export default function DetailForm(props) {
  const Style = useStyle();

  const [mainValue, setMainValue] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_no: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "India",
  });

  React.useEffect(async () => {
    if (mainValue.pincode.length === 6) {
      const gettingRes = await fetch(
        `https://api.postalpincode.in/pincode/${mainValue.pincode}`
      );
      const gettingCity = await gettingRes.json();
      if (gettingCity[0].Status === "Success") {
        const values = { ...mainValue };
        values.city = gettingCity[0].PostOffice[0].District;
        values.state = gettingCity[0].PostOffice[0].Circle;
        setMainValue(values);
      }
    }
  }, [mainValue.pincode]);

  const changeValue = (event) => {
    const newMainValue = { ...mainValue };
    newMainValue[`${event.target.id}`] = event.target.value;
    setMainValue(newMainValue);
    props.getIt(newMainValue);
  };

  const onSubmitForm = () => {
    const values = {
      first_name: mainValue.first_name,
      last_name: mainValue.last_name,
      email_id: mainValue.email_id,
      phone_no: Number(mainValue.phone_no),
      address: mainValue.address,
      city: mainValue.city,
      pincode: Number(mainValue.pincode),
      state: mainValue.state,
      country: mainValue.city,
    };

    setMainValue({
      first_name: "",
      last_name: "",
      email_id: "",
      phone_no: "",
      address: "",
      city: "",
      pincode: "",
      state: "",
      country: "India",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "0",
        padding: "0",
      }}
    >
      <Card className={`${Style.cardClass} ${Style.zero_mag_padd} `}>
        <FormControl>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                id="first_name"
                label="First Name"
                value={mainValue.first_name}
                fullWidth
                className={`${Style.text_Field}`}
                style={{ marginRight: "10px" }}
                required
                onChange={(event) => changeValue(event)}
              />
              <TextField
                id="last_name"
                label="Last Name"
                value={mainValue.last_name}
                fullWidth
                className={`${Style.text_Field}`}
                required
                onChange={(event) => changeValue(event)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <TextField
                id="email_id"
                label="Email"
                value={mainValue.email_id}
                fullWidth
                className={`${Style.text_Field}`}
                style={{ marginRight: "10px" }}
                required
                onChange={(event) => changeValue(event)}
              />
              <TextField
                id="phone_no"
                label="Mobile No."
                value={mainValue.phone_no}
                fullWidth
                className={`${Style.text_Field}`}
                required
                onChange={(event) => changeValue(event)}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <TextField
                id="address"
                label="Address"
                value={mainValue.address}
                fullWidth
                className={`${Style.text_Field}`}
                required
                onChange={(event) => changeValue(event)}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <TextField
                id="pincode"
                label="Pincode"
                value={mainValue.pincode}
                fullWidth
                className={`${Style.text_Field}`}
                required
                onChange={(event) => changeValue(event)}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <TextField
                id="city"
                label="City"
                value={mainValue.city}
                fullWidth
                className={`${Style.text_Field}`}
                style={{ marginRight: "10px" }}
                required
                onChange={(event) => changeValue(event)}
              />
              <TextField
                id="state"
                label="State"
                value={mainValue.state}
                fullWidth
                className={`${Style.text_Field}`}
                required
                onChange={(event) => changeValue(event)}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <TextField
                id="country"
                label="Country"
                value={mainValue.country}
                fullWidth
                className={`${Style.text_Field}`}
                disabled
                onChange={(event) => changeValue(event)}
              />
            </div>
          </div>
        </FormControl>
      </Card>
    </div>
  );
}
