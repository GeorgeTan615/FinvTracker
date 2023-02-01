import React from "react";
import { Pie } from "react-chartjs-2";
import {
	Chart,
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip
 } from 'chart.js';
 
 Chart.register(
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip
 );

 
const chartData = {
	labels: ['Red', 'Orange', 'Blue'],
	// datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
	datasets: [
		 {
			label: 'Popularity of colours',
			data: [55, 23, 96],
			// you can set indiviual colors for each bar
			backgroundColor: [
			  'rgba(255, 255, 255, 0.6)',
			  'rgba(255, 255, 255, 0.6)',
			  'rgba(255, 255, 255, 0.6)',
			],
			borderWidth: 1,
		 }
	]
}
function TestChart() {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />
    </div>
  );
}
export default TestChart