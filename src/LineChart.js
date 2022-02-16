import React, {useMemo} from 'react';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
}from 'chart.js';

import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const scores=[6,5,5,5,3,4,6,4,5];
const labels=[100,200,300,400,500,600,700]
const options={
    responsive:true,
    scales:{
        y:{
            min:0,
            max:10
        }
    },
    fill:true
}

export default function LineChart(){
    const data = useMemo(function(){
return{
  datasets:[
      {
          label:'Mis datos',
          data:scores,
          borderColor:"black",
          pointRadius:6,
          pointBackgroundColor:"red",
          backgroundColor:"black"
      },
  ],  
  labels
};
    },[])
    return <Line data={data} options={options}/>
}