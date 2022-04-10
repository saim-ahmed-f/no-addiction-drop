import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { Divider, Paper, Grid, Button, TextField } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

import Image from "next/image";

import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";

const useStyle = makeStyles((theme) => ({
  zero_mag_pad: {
    margin: "0%",
    padding: "0%",
  },
  main_typo: {
    textAlign: "center",
    marginTop: "2%",
    marginBottom: "2%",
  },
  paper_class: {
    padding: "2%",
    marginTop: "2%",
    marginBottom: "2%",
  },
  mainContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  grid_class: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "30%",
    marginTop: "2%",
    marginBottom: "2%",
    alignItems: "center",
  },
  mainTypo: {
    fontSize: "29px",
  },
  heading_typo: {
    fontSize: "22px",
  },
  deatil_typo: {
    fontSize: "18px",
    color: theme.palette.secondary.dark,
  },

  razor_pay_header: {
    fontSize: "14px",
  },
  razor_pay_detail: {
    fontSize: "12px",
    color: theme.palette.secondary.dark,
    wordBreak: "break-word",
  },
}));

export default function SingleOrderDetail({
  MainOrder,
  img,
  gettingUpdateSignal,
}) {

 

  const Style = useStyle();
  const [order, setorder] = useState(MainOrder);
  const [status, setStatus] = useState(order.order_states);

  const ChangeHandlerOfAWBNumber = (e) => {
    let values = { ...order };
    values["product_awb_no"] = e.target.value;
    setorder(values);
  };

  const statusHandleChange = (event) => {
    setStatus(event.target.value);
  };

  const UpdateHandler = () => {
    gettingUpdateSignal(status, order.product_awb_no);

    let values = order;
    values.order_states = status;
    setorder(values);
  };

  const OnlineTransiction = () => {
    return (
      <Grid
        container
        className={`${Style.zero_mag_pad} ${Style.mainContainer}`}
        spacing={0}
      >
        <Grid
          className={`${Style.zero_mag_pad} ${Style.grid_class} `}
          item
          xl={4}
        >
          <Typography
            variant="h6"
            className={Style.razor_pay_header}
            color="primary"
          >
            Razor Pay Id :
          </Typography>
          <Typography
            variant="h6"
            className={Style.razor_pay_detail}
            color="primary"
          >
            {order.razorpay_order_id}
          </Typography>
        </Grid>
        <Grid
          className={`${Style.zero_mag_pad} ${Style.grid_class} `}
          item
          xl={4}
        >
          <Typography
            variant="h6"
            className={Style.razor_pay_header}
            color="primary"
          >
            Razor Payment Id:
          </Typography>
          <Typography
            variant="h6"
            className={Style.razor_pay_detail}
            color="primary"
          >
            {order.razorpay_payment_id}
          </Typography>
        </Grid>
        <Grid
          className={`${Style.zero_mag_pad} ${Style.grid_class} `}
          item
          xl={4}
        >
          <Typography
            variant="h6"
            className={Style.razor_pay_header}
            color="primary"
          >
            Rezorpay Signature :
          </Typography>
          <Typography
            variant="h6"
            className={Style.razor_pay_detail}
            color="primary"
          >
            {order.razorpay_signature}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Typography variant="h5" className={Style.main_typo} color="primary">
        Order Detail's - #{order.id}
      </Typography>
      <Divider />
      <Paper className={Style.paper_class} elevation={3}>
        <Typography variant="h5" className={Style.mainTypo} color="primary">
          Basic Detail's
        </Typography>
        <Divider />

        <Grid
          container
          className={`${Style.zero_mag_pad} ${Style.mainContainer}`}
          spacing={0}
        >
          <Grid
            className={`${Style.zero_mag_pad} ${Style.grid_class} `}
            item
            xl={4}
          >
            <Typography
              variant="h6"
              className={Style.heading_typo}
              color="primary"
            >
              Order ID :
            </Typography>
            <Typography
              variant="h6"
              className={Style.deatil_typo}
              color="primary"
            >
              {order.id}
            </Typography>
          </Grid>
          <Grid
            className={`${Style.zero_mag_pad} ${Style.grid_class} `}
            item
            xl={4}
          >
            <Typography
              variant="h6"
              className={Style.heading_typo}
              color="primary"
            >
              User Name :
            </Typography>
            <Typography
              variant="h6"
              className={Style.deatil_typo}
              color="primary"
            >
              {order.shipping_id.name}
            </Typography>
          </Grid>
          <Grid
            className={`${Style.zero_mag_pad} ${Style.grid_class} `}
            item
            xl={4}
          >
            <Typography
              variant="h6"
              className={Style.heading_typo}
              color="primary"
            >
              Date :
            </Typography>
            <Typography
              variant="h6"
              className={Style.deatil_typo}
              color="primary"
            >
              {new Date(order.order_date).toDateString()}
            </Typography>
          </Grid>
        </Grid>
        <Divider />

        <Grid
          container
          className={`${Style.zero_mag_pad} ${Style.mainContainer}`}
          spacing={0}
        >
          <Grid
            className={`${Style.zero_mag_pad} ${Style.grid_class} `}
            item
            xl={4}
          >
            <Typography
              variant="h6"
              className={Style.heading_typo}
              color="primary"
            >
              Email Id :
            </Typography>
            <Typography
              variant="h6"
              className={Style.deatil_typo}
              style={{ fontSize: "15px" }}
              color="primary"
            >
              {order.shipping_id.email}
            </Typography>
          </Grid>
          <Grid
            className={`${Style.zero_mag_pad} ${Style.grid_class} `}
            item
            xl={4}
          >
            <Typography
              variant="h6"
              className={Style.heading_typo}
              color="primary"
            >
              Payment Type :
            </Typography>
            <Typography
              variant="h6"
              className={Style.deatil_typo}
              color="primary"
            >
              {order.payment_method === true ? "Online" : "Cash On Delivery"}
            </Typography>
          </Grid>
          <Grid
            className={`${Style.zero_mag_pad} ${Style.grid_class} `}
            item
            xl={4}
          >
            <Typography
              variant="h6"
              className={Style.heading_typo}
              color="primary"
            >
              Total Amount :
            </Typography>
            <Typography
              variant="h6"
              className={Style.deatil_typo}
              color="primary"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {<CurrencyRupeeRoundedIcon />} {order.total_value}
              </div>
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        {order.payment_method === true ? OnlineTransiction() : undefined}
      </Paper>

      <Paper className={Style.paper_class} elevation={3}>
        <Typography variant="h5" className={Style.mainTypo} color="primary">
          Order Status
        </Typography>
        <Divider />

        <Grid
          container
          className={`${Style.zero_mag_pad} ${Style.mainContainer}`}
          style={{ alignItems: "center", marginTop: "2%", marginBottom: "2%" }}
          spacing={0}
        >
          <Grid
            className={`${Style.zero_mag_pad} `}
            style={{ width: "75%" }}
            item
            xl={8}
          >
            {String(order.order_states) === "Delivered" ||
            String(order.order_states) === "Returned" ? (
              `${
                String(order.order_states) === "Delivered"
                  ? "Delivered"
                  : String(order.order_states) === "Returned"
                  ? "Returned"
                  : undefined
              }`
            ) : (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  onChange={statusHandleChange}
                >
                  <MenuItem value={"Pending"}>Pending</MenuItem>
                  <MenuItem value={"Shipped"}>Shipped</MenuItem>
                  <MenuItem value={"Delivered"}>Delivered</MenuItem>
                  <MenuItem value={"Returned"}>Returned</MenuItem>
                </Select>
              </FormControl>
            )}
          </Grid>

          <Grid
            className={`${Style.zero_mag_pad}  `}
            style={{ width: "20%" }}
            item
            xl={4}
          >
            {String(order.order_states) === "Delivered" ||
            String(order.order_states) === "Returned" ? undefined : (
              <Button
                variant="contained"
                size="large"
                onClick={() => UpdateHandler()}
                color="primary"
              >
                Update
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* AWB Numbber */}

      <Paper className={Style.paper_class} elevation={3}>
        <Typography variant="h5" className={Style.mainTypo} color="primary">
          AWB Number
        </Typography>
        <Divider />

        <Grid
          container
          className={`${Style.zero_mag_pad} ${Style.mainContainer}`}
          style={{ alignItems: "center", marginTop: "2%", marginBottom: "2%" }}
          spacing={0}
        >
          <Grid
            className={`${Style.zero_mag_pad} `}
            style={{ width: "75%" }}
            item
            xl={8}
          >
            <TextField
              id="product_awb_no"
              label="AWB Number"
              value={order.product_awb_no === null ? "" : order.product_awb_no}
              fullWidth
              onChange={(e) => ChangeHandlerOfAWBNumber(e)}
            />
          </Grid>

          <Grid
            className={`${Style.zero_mag_pad}  `}
            style={{ width: "20%" }}
            item
            xl={4}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => UpdateHandler()}
              color="primary"
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={Style.paper_class} elevation={3}>
        <Typography variant="h5" className={Style.mainTypo} color="primary">
          Product Detail's
        </Typography>
        <Divider />
        <Grid
          style={{ marginTop: "1%", marginBottom: "1%" }}
          container
          spacing={2}
        >
          <Grid item xl={4}>
            <Paper variant="outlined" elevation={0}>
              <Image
                src={img[0].get_image}
                alt={img[0].alt}
                height={250}
                width={250}
              />
            </Paper>
          </Grid>
          <Grid style={{ width: "70%" }} item xl={8}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginTop: "1%",
                  marginBottom: "1%",
                }}
              >
                <Typography
                  variant="h6"
                  className={Style.heading_typo}
                  color="primary"
                >
                  Product Name :
                </Typography>
                <Typography
                  variant="h6"
                  className={Style.deatil_typo}
                  color="primary"
                >
                  {order.product_id.product_name}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginTop: "1%",
                  marginBottom: "1%",
                }}
              >
                <Typography
                  variant="h6"
                  className={Style.heading_typo}
                  color="primary"
                >
                  Product Price :
                </Typography>
                <Typography
                  variant="h6"
                  className={Style.deatil_typo}
                  color="primary"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {<CurrencyRupeeRoundedIcon />}
                    {order.payment_method === true
                      ? order.product_id.product_online_price
                      : order.product_id.product_price}
                  </div>
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginTop: "1%",
                  marginBottom: "1%",
                }}
              >
                <Typography variant="h6" color="primary">
                  Delivery Charge :
                </Typography>
                <Typography
                  variant="h6"
                  className={Style.deatil_typo}
                  color="primary"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {<CurrencyRupeeRoundedIcon />}
                    {order.product_id.delivery_charge}
                  </div>
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginTop: "1%",
                  marginBottom: "1%",
                }}
              >
                <Typography
                  variant="h6"
                  className={Style.heading_typo}
                  color="primary"
                >
                  Product About :
                </Typography>

                <Typography
                  variant="h6"
                  className={Style.deatil_typo}
                  color="primary"
                >
                  {String(order.product_id.product_about).slice(0, 200)}...
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={Style.paper_class} elevation={3}>
        <Typography variant="h5" className={Style.mainTypo} color="primary">
          Shipping Detail's
        </Typography>
        <Divider />

        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1%",
            marginBottom: "1%",
          }}
          spacing={0}
        >
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1%",
              marginBottom: "1%",
            }}
            xl={12}
          >
            <Typography
              variant="h6"
              className={Style.heading_typo}
              color="primary"
            >
              Name :
            </Typography>
            <Typography
              variant="h6"
              className={Style.deatil_typo}
              color="primary"
            >
              {order.shipping_id.name}
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: "1%",
            marginBottom: "1%",
          }}
          spacing={0}
        >
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1%",
              marginBottom: "1%",
            }}
            xl={6}
          >
            <Typography
              variant="h6"
              className={Style.heading_typo}
              color="primary"
            >
              Phone No. :
            </Typography>
            <Typography
              variant="h6"
              className={Style.deatil_typo}
              color="primary"
            >
              {order.shipping_id.phone}
            </Typography>
          </Grid>
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1%",
              marginBottom: "1%",
            }}
            xl={6}
          >
            <Typography
              variant="h6"
              className={Style.heading_typo}
              color="primary"
            >
              Email Id :
            </Typography>
            <Typography
              variant="h6"
              className={Style.deatil_typo}
              color="primary"
            >
              {order.shipping_id.email}
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: "1%",
            marginBottom: "1%",
          }}
          spacing={0}
        >
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1%",
              marginBottom: "1%",
            }}
            xl={12}
          >
            <Typography
              variant="h6"
              className={Style.heading_typo}
              color="primary"
            >
              Address :
            </Typography>
            <Typography
              variant="h6"
              className={Style.deatil_typo}
              color="primary"
            >
              {order.shipping_id.address}
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: "1%",
            marginBottom: "1%",
          }}
          spacing={0}
        >
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1%",
              marginBottom: "1%",
            }}
            xl={4}
          >
            <Typography
              variant="h6"
              className={Style.heading_typo}
              color="primary"
            >
              City :
            </Typography>
            <Typography
              variant="h6"
              className={Style.deatil_typo}
              color="primary"
            >
              {order.shipping_id.city}
            </Typography>
          </Grid>

          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1%",
              marginBottom: "1%",
            }}
            xl={4}
          >
            <Typography
              variant="h6"
              className={Style.heading_typo}
              color="primary"
            >
              Pincode :
            </Typography>
            <Typography
              variant="h6"
              className={Style.deatil_typo}
              color="primary"
            >
              {order.shipping_id.pincode}
            </Typography>
          </Grid>

          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1%",
              marginBottom: "1%",
            }}
            xl={4}
          >
            <Typography
              variant="h6"
              className={Style.heading_typo}
              color="primary"
            >
              State :
            </Typography>
            <Typography
              variant="h6"
              className={Style.deatil_typo}
              color="primary"
            >
              {order.shipping_id.state}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
