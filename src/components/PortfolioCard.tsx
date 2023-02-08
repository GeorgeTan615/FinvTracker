import { truncate } from "fs";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllInvestmentProductData } from "../utils";

const PortfolioCard = () => {
	// make api call to fetch total value of user portfolio
	const { data, isLoading } = useQuery(["getAllInvestmentProductdata"], () =>
		getAllInvestmentProductData(true)
	);
	const [totalGain, setTotalGain] = useState<number>(0.0);
	const [totalGainPercentage, setTotalGainPercentage] = useState<number>(0.0);
	const [dayGain, setDayGain] = useState<number>(0.0);
	const [dayGainPercentage, setDayGainPercentage] = useState<number>(0.0);
	const [portfolioValue, setPortfolioValue] = useState<number>(0.0);

	useEffect(() => {
		if (!isLoading && data && Array.isArray(data.result)) {
			let value = 0;
			let overallCost = 0;
			let currDailyValue = 0;
			let prevDailyValue = 0;

			data.result.forEach((investment: any) => {
				// Only portfolio value and total cost to calculate total gain and percentage
				value += investment.quantity * investment.curr.price;
				overallCost += investment.quantity * investment.averagePrice;

				// Only need curr and prev daily value to calculate day gain and percentage
				currDailyValue += investment.quantity * investment.curr.price;

				if (investment.prev.price){
					// console.log(investment.prev)
					prevDailyValue += investment.quantity * investment.prev.price;
				}

			});

			setTotalGain(parseFloat((value - overallCost).toFixed(2)));
			setTotalGainPercentage(parseFloat((((value - overallCost) / overallCost) * 100).toFixed(2)));
			setDayGain(parseFloat((currDailyValue - prevDailyValue).toFixed(2)));
			console.log(currDailyValue)
			console.log(prevDailyValue)
			setDayGainPercentage(
				parseFloat((((currDailyValue - prevDailyValue) / prevDailyValue) * 100).toFixed(2))
			);
			setPortfolioValue(parseFloat(value.toFixed(2)));
		}
	}, [data]);

	return (
		<div >
			<h3>Portfolio</h3>
			<div>
				{data && (
					<div>
						<div className="text-3xl font-bold">${portfolioValue}</div>

						<div className="py-1" />

						<div className="flex items-center justify-between text-xl font-semibold">
							<div>Day Gain</div>
							<div className={`${dayGain > 0 ? "text-[#00A86B]" : "text-[#FF5959]"}`}>
								{dayGain > 0 && "+"}{dayGain} ({dayGainPercentage > 0 && "+"}{dayGainPercentage}%)
							</div>
						</div>
						{/* <div className="flex justify-between items-center text-[#9B9B9B]">
					<div>PLTR</div>
					<div>+2.1 (+0.51%)</div>
					</div> */}

						<div className="py-1" />

						<div className="flex items-center justify-between text-xl font-semibold">
							<div>Total Gain</div>
							<div className={`${totalGain > 0 ? "text-[#00A86B]" : "text-[#FF5959]"}`}>
								{totalGain > 0 && "+"}{totalGain} ({totalGainPercentage > 0 && "+"}{totalGainPercentage}%)
							</div>
						</div>
						{/* <div className="flex justify-between items-center text-[#9B9B9B]">
					<div>Tesla, Inc</div>
					<div>-2.1 (-0.51%)</div>
					</div> */}
					</div>
				)}

			</div>
		</div>
	);
};

export default PortfolioCard;
