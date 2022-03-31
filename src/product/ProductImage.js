import Image from "next/image";
//import Container from '@mui/material/Container'
import Grid from "@mui/material/Grid";

import { makeStyles } from "@mui/styles";
import { Card } from "@mui/material";
import { useState } from "react";

const useStyle = makeStyles((theme) => ({
  zero_padding_marg: {
    padding: "0%",
    margin: "0%",
  },
  main_grid: {
    display: "flex",
    justifyContent: "space-between",
  },
  first_grid: {
    width: "20%",
    marginLeft: "2%",
    [theme.breakpoints.down('sm')]:{
      display : "none",
    }
  },
  second_grid: {
    width: "80%",
    marginLeft : "5%",
    
  },
  side_image_div: {
    marginBottom: "15%",
    padding: "0%",
    margin: "0%",
  },
  main_image_card : {
    borderRadius : "3%",
    padding: "0%",
    margin: "0%",
  },

  mobile_grid : {
    [theme.breakpoints.down('sm')]:{
      width: "100%",
      display :"flex",
      justifyContent :"space-evenly",
      marginTop : "1%"
    },
    [theme.breakpoints.up('sm')]:{
      display :"none",
    },
    
  }

}));

export default function ProductImageView({ images }) {
  const Style = useStyle();

  const [select, setSelect] = useState(0);

  const selectImageClick = (event, index) => {
    setSelect(index);
  };

  return (<>
      <div className={`${Style.zero_padding_marg}  ${Style.main_grid} `}>
        <div className={`${Style.zero_padding_marg}  ${Style.first_grid}`}>
          {images.map((i, index) => (
            <Card
              className={`${Style.side_image_div} ${Style.zero_padding_marg}`}
              key={index}
              onClick={(event) => selectImageClick(event, index)}
            >
              <Image
                src={images[index]["get_image"]}
                alt={images[index]["alt"]}
                width={120}
                height={120}
              />
            </Card>
          ))}
        </div>
        <div className={`${Style.zero_padding_marg} ${Style.second_grid}`}>
          <Card className={`${Style.main_image_card} ${Style.zero_padding_marg}`}>
            <Image
              src={images[select].get_image}
              alt={images[select].alt}
              width={450}
              height={450}
            />
          </Card>
        </div>
      </div>

      
      <div className={`${Style.zero_padding_marg}  ${Style.mobile_grid}`}>
      {images.map((i, index) => (
        <Card
          className={`${Style.side_image_div} ${Style.zero_padding_marg}`}
          key={index}
          onClick={(event) => selectImageClick(event, index)}
        >
          <Image
            src={images[index]["get_image"]}
            alt={images[index]["alt"]}
            width={80}
            height={80}
          />
        </Card>
      ))}
    </div>
  </>
  );
}
