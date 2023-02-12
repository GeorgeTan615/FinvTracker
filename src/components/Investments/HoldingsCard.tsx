import React from "react";
import { useQuery } from "react-query";
import { queryClient } from "../../pages/_app";
import prisma from "../../lib/prismadb";
import { getLatestInvestmentProductData, refreshQueries } from "../../utils";
interface HoldingsCardProps{
	id: string,
	quantity: number,
	averagePrice: number,
	tickerSymbol: string,
	setVisible:React.Dispatch<React.SetStateAction<boolean>>,
	setIDType:React.Dispatch<React.SetStateAction<string>>,
	setTickerSymbol:React.Dispatch<React.SetStateAction<string>>,
	setQuantity:React.Dispatch<React.SetStateAction<number>>,
	setAveragePrice:React.Dispatch<React.SetStateAction<number>>,

}
const HoldingsCard = (props:HoldingsCardProps) => {

	const { data, isLoading, isFetching } = useQuery(['getLatestTickerData',props.tickerSymbol], ()=> getLatestInvestmentProductData(props.tickerSymbol))

	const handleOnClick = () =>{
		props.setIDType(props.id)
		props.setTickerSymbol(props.tickerSymbol)
		props.setQuantity(props.quantity)
		props.setAveragePrice(props.averagePrice)
		props.setVisible(true)
	}

	return (
		<>
			{
				data && data.result.length > 0  && (
					<div className="grid grid-cols-6 place-items-center mb-3 rounded-xl bg-[#F8F8F8] py-3 cursor-pointer transition ease-in-out duration-300 hover:bg-[#F6F2FF]" onClick={handleOnClick}>
						<div className="font-semibold">{props.tickerSymbol}</div>
						{/* Quantity */}
						<div>{props.quantity}</div>
						{/* Average Cost */}
						<div>${props.averagePrice}</div>
						{/* Latest Closing Price */}
						<div>
							${data.result[0].price} 
							<span className={data.result[0].changePercentage.split('%')[0] > 0 ? 'text-[#00A86B]' : 'text-[#FF5959]'}>
								&nbsp;({data.result[0].changePercentage.split('%')[0] > 0 ? '+':''}{data.result[0].changePercentage})
							</span>
						</div>
						{/* Total Gain */}
						<div>
							${((data.result[0].price - props.averagePrice) * props.quantity).toFixed(2)} 
							<span className={(data.result[0].price - props.averagePrice)/props.averagePrice > 0 ? 'text-[#00A86B]' : 'text-[#FF5959]'}>
								&nbsp;({(data.result[0].price - props.averagePrice)/props.averagePrice > 0 ? '+':''}{((data.result[0].price - props.averagePrice)/props.averagePrice * 100).toFixed(2)}%)
							</span>
						</div>
						{/* Total Value */}
						<div className="font-semibold">${(data.result[0].price * props.quantity).toFixed(2)}</div>
					</div>
				)
			}
		</>
	);
};

export default HoldingsCard;
