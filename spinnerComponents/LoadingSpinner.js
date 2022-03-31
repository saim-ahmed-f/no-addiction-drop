import { makeStyles } from "@mui/styles";
import { useEffect, useRef } from "react";

import Lottie from "lottie-web";

import {useRouter} from "next/router"


const useStyle = makeStyles((theme) => ({
  mainAnimaContainer: {
    height: "50vh",
    position : "absolute",
    top : "20%",
    left : ({t}) => `${t}%` 
  },
  model_class : {
    position : "relative",
    top : 0,
    left : 0,
    right : 0,
    bottom : 0,
    height : '100vh',
    backgroundColor : "#f9f9f9"

  },
}));

export default function LoadingSpinner() {
  const router = useRouter()
  let valuefortopleft = {
    t : 50
  }
  if (String(router.pathname) === "/" || String(router.pathname) === "/checkoutPage"){
    valuefortopleft.t = 35
  } 

  const Style = useStyle(valuefortopleft);
  const container = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../public/load.json"),
    });
  });

  return <div className={Style.model_class}>  
  <div className={Style.mainAnimaContainer} ref={container}></div>
  
  </div>
}
