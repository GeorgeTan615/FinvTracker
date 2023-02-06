import React from "react";
import AddHoldingsButton from "./AddHoldingsButton";
import { useQuery } from "react-query";
import { fetchAllHoldings } from "../utils";
import HoldingsCard from "./HoldingsCard";

interface Holding {
	quantity: number;
	averagePrice: number;
	tickerSymbol: string;
	userId: string;
}

const Holdings = () => {
	const { data, isLoading } = useQuery("getHoldings", () => fetchAllHoldings());

	if (!isLoading) {
		console.log(data);
	}

	return (
		<>
			<div className="flex items-center justify-between">
				<h3>Holdings</h3>
				<AddHoldingsButton />
			</div>
      <div className="grid grid-cols-6 font-bold place-items-center mb-1 divide-y">
        <div>Stock</div>
        <div>Quantity</div>
        <div>Average Cost</div>
        <div>Closing Price</div>
        <div>Total Gain</div>
        <div>Total Value</div>
      </div>
      <hr />
      <div className="py-1" />

      {data && data.result && data.result.length > 0
      ? (
        data.result.map((holding: Holding) => {
          return (
            <HoldingsCard
              quantity={holding.quantity}
              averagePrice={holding.averagePrice}
              tickerSymbol={holding.tickerSymbol}
            />
          );
        })
      ) : (
        <div className="flex h-full flex-col items-center justify-center pb-20 text-lg text-[#898989]">
				  No holdings so far...
			  </div>
      )}
		</>
	);
};

export default Holdings;
