import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
//   Legend
);

const LineChart = ({
	title,
	chartLabels,
	chartData,
}: {
	title:string;
	chartLabels: string[];
	chartData: number[];
}) => {
	// const color: string[] = [];
	// chartLabels.forEach(() => color.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`));
	const data = {
		labels: chartLabels,
		datasets: [
			{
				label: "USD",
				data: chartData,
				borderColor:'#C36CEC'
				// backgroundColor: color,
			},
		],
	};

	const options = {
		plugins:{
			legend:{
				display:false,
			},
			// title: {
			// 	display: true,
			// 	text: 'Chart.js Line Chart',
			// 	font:{
			// 		size:10,
			// 	}
			//  },
		},

		scales: {
			x: {
			  grid: {
				 display: false
			  },
			},
			y: {
			  grid: {
				 display: false
			  }
			}
		 },
		maintainAspectRatio:false,
  }

	return (
		<div className="">
			<div className="h-[120px]">
				{chartLabels.length > 0 ? (
					<Line options={options} data={data} />
				) : (
					<div className="flex h-full flex-col items-center justify-center pb-20 text-lg text-[#898989]">
						No {title.toLowerCase()} made
					</div>
				)}
			</div>
		</div>
	);
};

export default LineChart;
