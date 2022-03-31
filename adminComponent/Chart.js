import React from "react"
import {Chart as ChartJS , BarElement, CategoryScale, LinearScale} from "chart.js"
import {Bar} from "react-chartjs-2"

import {Paper} from "@mui/material"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
)

export default function MainChart({ mainData }){


  var data = {
    labels: ["Jan" , "Feb" , "March" , "April" ,"May" , "June" , "July", "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],
    datasets: [{
      label: 'My First Dataset',
      data: mainData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  var options = {
    maintainAspectRatio : false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    legend : {
      labels : {
        fontSize : 26
      }
    }
  }

  return <Paper style={{padding:"2%"}} elevation={3}>
    <Bar
      data={data}
      height = {400}
      options = {options}
    />
  </Paper>
}