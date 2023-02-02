import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
 
 const DoughnutChart = ({title,chartLabels,chartData}:{title:string,chartLabels:string[],chartData:number[]}) => {
  const color:string[] = []
  chartLabels.forEach(() => color.push(`#${Math.floor(Math.random()*16777215).toString(16)}`))
  const data = {
    labels: chartLabels,
    datasets: [{
      label:'RM',
      data: chartData,
      backgroundColor: color,
  }]
  };

  return (
      <div className="py-4 px-7 bg-white rounded-3xl">
        <h3>{title}</h3>
        <div className="h-[40vh] mb-[1%] p-[1%]" >
            {
              chartLabels.length > 0
              ? <Doughnut options={{ maintainAspectRatio: false }} data={data} />
              : <div className="flex flex-col justify-center items-center h-full pb-20 text-lg text-[#898989]">No {title.toLowerCase()} transactions made</div>
            }
            
        </div>
      </div>
  )
 }

 export default DoughnutChart;
