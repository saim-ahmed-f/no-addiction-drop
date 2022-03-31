import { makeStyles } from "@mui/styles";

import { Card, Typography } from "@mui/material";

import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";


const useStyle = makeStyles((theme) => ({
    zero_mag_padd : {
        padding : "0%",
        margin : "0%",
    },
    card_class : {
        border : `1px solid ${theme.palette.secondary.main}`,
        padding : "1%",
        margin : "1%",
        textAlign : "center",
        width : "300px",
        minHeight : "120px",
        alignContent : "center",
        [theme.breakpoints.down("sm")]: {
            marginTop : "10px",
            marginBottom  :"5px",
        }
    },
    first_div: {
        display :"flex",
        justifyContent : "center",
        alignItems : "center",
        
    },
    seconad_div : {
        alignItems : "center", 
    },
    third_div :{
        alignItems : "center",
        wordWrap : true,
    },
    user_name_typo : {
        fontSize : "15px",
        fontFamily : "Roboto",
        fontWeight : "500",
    },
    verify_typo : {

        fontSize : "8px",
        fontFamily : "Roboto",
        marginLeft : "12px",
    },
    body_typo : {
        fontSize : "12px",
        fontFamily : "Roboto",
        fontWeight : "300",
        wordWrap : "wrap"
    }
}))


export default function ReviewCard(props) {

    const Style = useStyle()

  const starCount = (num) => {
    return [1, 2, 3, 4, 5].map((i, index) =>
      i === num ? (
        <StarBorderRoundedIcon key={index} color="primary" />
      ) : i <= num ? (
        <StarRoundedIcon key={index} color="secondary" />
      ) : (
        <StarBorderRoundedIcon key={index} color="primary" />
      )
    );
  };

  return <Card className={`${Style.card_class} `} elevation={2} >
      <div className={`${Style.first_div} ${Style.zero_mag_padd} `} >
          <Typography className={Style.user_name_typo} variant="h6"  color="secondary">
              {props.userName}
          </Typography>
          <Typography variant="h6" className={Style.verify_typo} color="secondary">Verified</Typography>
          {<VerifiedUserRoundedIcon fontSize="" color="primary"/>}
      </div >
      <div className={`${Style.second_div} ${Style.zero_mag_padd} `}>
          {starCount(props.starValue + 1)}
      </div>
      <div className={`${Style.third_div} ${Style.zero_mag_padd} `} >
          <Typography variant="h6" className={Style.body_typo} color="secondary">{props.body}</Typography>
      </div>
  </Card>
  
}
