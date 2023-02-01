import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

 const hello = [
  'Shopping',
  'Salary',
  'Subscription',
  'Transportation',
  'Food',
  'Tuition',
  'Entertainment',
  'Hobby',
  'Go-kart'
]
const color:string[] = []
hello.forEach(value=> color.push(`#${Math.floor(Math.random()*16777215).toString(16)}`))
 const data = {
   labels: [
     'Shopping',
     'Salary',
     'Subscription',
     'Transportation',
     'Food',
     'Tuition',
     'Entertainment',
     'Hobby',
     'Go-kart'
 ],
 datasets: [{
   data: [1000,200,500,400,700,300,2000,600,350],
   backgroundColor: color,
  //  [
  //  '#1e81b0',
  //  '#e28743',
  //  '#76b5c5'
  //  ],
  //  hoverBackgroundColor: [
  //  '#FF6384',
  //  '#36A2EB',
  //  '#FFCE56'
  //  ]
 }]
 };
 
 const DoughnutChart = ({title}:{title:string}) => (
  <div className="py-4 px-7 bg-white rounded-3xl">
    <h3>{title}</h3>
    <div className="h-[40vh] mb-[1%] p-[1%]" >
        <Doughnut options={{ maintainAspectRatio: false }} data={data} />
    </div>
  </div>

 );

 export default DoughnutChart;
