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
const labels=[0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];

const API_URL = "https://okku.herokuapp.com/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFBTV9hZG1pbiIsImVtYWlsIjoiZGV2QGNhcmRpb3RyYWNrLmNhcmUiLCJjb21wYW55SWQiOiI2MGE1NDQzM2QzMWY2YTM1YTg1MWQ4MGYiLCJfaWQiOiI2MGE1NDY3ZmY4MTY1MzM3ODA0ODI5NjMiLCJpYXQiOjE2NDUwMjU1MDgsImV4cCI6MTY0NTAyOTEwOH0.gFzL5iL8D_eiGW4wYuaAXdeVNz553Dfnq6HFtqGHp6s";

const options={
    responsive:true,
    scales:{
        y:{
            min:0
        }
    },
    fill:true
}
let datos;
let sistolica = [];
let distolica = [];
function Amm(){
    
    const obtenerDatos = async ()=>{
        datos=await fetch( API_URL, {
            method: 'post',
            body: JSON.stringify({
            query: `query{
            getEmployeeBloodPressuresBetweenDates(
            beforeDate:"Mon Jan 03 2022 00:00:00 GMT-0600",
            afterDate: "Mon Jan 04 2020 00:00:00 GMT-0600"
            ){
            _id
            rfid
            systolic
    diastolic
        }
        }`}),
        headers: {
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
        },
        })
        .then(data => data.json())
        .then(values => {
        if ("errors" in values) throw values.errors
        console.log(values.data.getEmployeeBloodPressuresBetweenDates);
        return values.data.getEmployeeBloodPressuresBetweenDates;
        })
        .catch(e => console.error(e));
        //const users = await data.json()
        console.log(datos[0].systolic);
        console.log(datos[0].diastolic);
        for(var i =0;i<100;i++){
            sistolica[i]=datos[i].systolic;
        }
        for(var j =0;j<100;j++){
            distolica[j]=datos[j].diastolic;
        }
        //setEquipo(data);
    }
    // obtenerDatos();
    React.useEffect(()=>{
        console.log('useEffect');
       obtenerDatos();
    
    },[])
    
    
    console.log(sistolica);
    const data = useMemo(function(){
return{
    
  datasets:[
      {
          label:'Sistólica',
          data:sistolica,
          borderColor:"rgba(138,243,229,0.8)",
          pointRadius:6,
          pointBackgroundColor:"aqua",
          backgroundColor:"rgba(138,243,229,0.4)"
      },
  ],  
  labels
};
    },[])
    const data2 = useMemo(function(){
        return{
            
          datasets:[
            {
                label:'Sistólica',
                data:sistolica,
                borderColor:"rgba(138,243,229,0.8)",
                pointRadius:6,
                pointBackgroundColor:"aqua",
                backgroundColor:"rgba(138,243,229,0.4)"
            },
              {
                label:'Distólica',
                data:distolica,
                borderColor:"rgba(243,138,140,0.8)",
                pointRadius:6,
                pointBackgroundColor:"pink",
                backgroundColor:"rgba(243,138,140,0.4)"
            },
          ],  
          labels
        };
            },[]);
            const data3 = useMemo(function(){
                return{
                    
                  datasets:[
                      {
                        label:'Distólica',
                        data:distolica,
                        borderColor:"rgba(243,138,140,0.8)",
                        pointRadius:6,
                        pointBackgroundColor:"pink",
                        backgroundColor:"rgba(243,138,140,0.4)"
                    },
                  ],  
                  labels
                };
                    },[])
    return(<div><Line data={data} options={options}/>
        <Line data={data2} options={options}/>
        <Line data={data3} options={options}/></div>) 
}
export default Amm;