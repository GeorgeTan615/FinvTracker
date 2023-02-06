import React from "react";

const HoldingsCard = ({
	quantity,
	averagePrice,
	tickerSymbol,
}: {
	quantity: number;
	averagePrice: number;
	tickerSymbol: string;
}) => {
	return (
      <div className="grid grid-cols-6 place-items-center mb-3 rounded-xl bg-[#F8F8F8] py-3 cursor-pointer transition ease-in-out duration-300 hover:bg-[#F6F2FF]">
			<div className="font-bold">{tickerSymbol}</div>
			<div>{quantity}</div>
			<div>{averagePrice}</div>
			<div>USD221.15</div>
			<div>USD221.15</div>
			<div>USD221.15</div>
		</div>
	);
};

export default HoldingsCard;
