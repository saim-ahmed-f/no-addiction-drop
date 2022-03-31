import { useRef } from "react";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";

import Lottie from "lottie-web";
import Typography from '@mui/material/Typography'

const useStyle = makeStyles((theme) => ({
    mainDiv : {
        
    },
    amina_div : {
        position : "absolute",
        top : "30%",
        left : "40%",
        height : '50vh'
    }
}))

export default function NotFound(){

    const Style = useStyle()

    const container = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../public/notFoundpage.json"),
    });
  });

    return <div className={Style.mainDiv} >
        <Typography variant="h5" style={{textAlign : "center"}} color="primary">
            404 | THIS PAGE NOT FOUND !!!
        </Typography>
        <div ref={container} className={Style.amina_div} ></div>
    </div>
}