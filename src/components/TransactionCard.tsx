import React from "react";
import { Transaction } from "./Transactions";
import TransactionLogo from "./TransactionLogo";

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
	const amountColor = transaction.transactionType === "Income" ? "#00A86B" : "#FF5959";
	const amountSymbol = transaction.transactionType === "Income" ? "+" : "-";
	const time = `${new Date(transaction.createdAt).getHours()}:${new Date(transaction.createdAt).getMinutes()}`
	
	return (
		<div className="flex w-full items-center justify-between rounded-xl bg-[#F8F8F8] px-4 py-3">
			<div className="flex items-center gap-4">
				<TransactionLogo category={transaction.category} />
				<div className="flex flex-col items-start justify-center">
					<div className="font-medium">{transaction.category}</div>
					<div className="text-[#9B9B9B] text-sm">{transaction.description}</div>
				</div>
			</div>

			<div className="flex flex-col items-end justify-center">
				<div className={`font-semibold text-[${amountColor}]`}>
					{amountSymbol} RM{transaction.amount}
				</div>
				<div className="text-[#9B9B9B] text-sm">{time}</div>
			</div>
		</div>
	);
};

export default TransactionCard;
