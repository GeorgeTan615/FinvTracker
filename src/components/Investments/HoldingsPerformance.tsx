import React from 'react'
import { useQuery } from 'react-query'
import { getAllInvestmentProductData } from '../../utils'
import LineChart from '../Charts/LineChart'
import { dateConvertString } from '../../utils'
interface Memo {
	[key: string]: number
 }
const HoldingsPerformance = () => {
	const { data } = useQuery("getHoldingsChartData", () =>
		getAllInvestmentProductData()
	);
	// Labels will be each day
	const dailyNetValue:Memo = {}

	data?.result?.forEach((investment:any)=>{
		investment.investmentProduct.investmentProductData.forEach((dailyData:any)=>{
			if (!(dailyData.date in dailyNetValue)){
				dailyNetValue[dailyData.date] = dailyData.price * investment.quantity
			}
			else{
				dailyNetValue[dailyData.date] += dailyData.price * investment.quantity
			}
		})
	})
	const sortable = [];
	for (var date in dailyNetValue) {
		 sortable.push([date,dailyNetValue[date]]);
	}
	sortable.sort((a,b)=>{
		return new Date(a[0]).valueOf() - new Date(b[0]).valueOf()
	})
	const chartLabels:string[] = []
	const chartData:number[] = []

	sortable.forEach((obj)=>{
		chartLabels.push(dateConvertString(String(obj[0])))
		chartData.push(parseFloat(parseFloat(String(obj[1])).toFixed(2)))
	})

  return (
	<>
	 <h3>Performance (Value per Day)</h3>
	 <LineChart title='Holdings' chartData={chartData} chartLabels={chartLabels} />
	</>
  )
}

export default HoldingsPerformance