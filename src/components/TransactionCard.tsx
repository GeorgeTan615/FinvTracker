import React from "react";
import { Transaction } from "./Transactions";
import TransactionLogo from "./TransactionLogo";

interface TransactionCardProps{
	transaction:Transaction,
	handler:() => void,
	setIDType:React.Dispatch<React.SetStateAction<string>>,
	setTransactionType:React.Dispatch<React.SetStateAction<string>>,
	setDescription:React.Dispatch<React.SetStateAction<string>>,
	setAmount:React.Dispatch<React.SetStateAction<number>>,
	setCategory:React.Dispatch<React.SetStateAction<string>>,
}
const TransactionCard = (props:TransactionCardProps) => {
	const amountColor = props.transaction.transactionType === "Income" ? "text-[#00A86B]" : "text-[#FF5959]";
	const amountSymbol = props.transaction.transactionType === "Income" ? "+" : "-";
	const time = `${new Date(props.transaction.createdAt).getHours().toString().padStart(2,'0')}:${new Date(props.transaction.createdAt).getMinutes().toString().padStart(2,'0')}`
	
	const handleOnClick = () =>{
		props.setIDType(props.transaction.id)
		props.setTransactionType(props.transaction.transactionType)
		props.setDescription(props.transaction.description)
		props.setAmount(props.transaction.amount)
		props.setCategory(props.transaction.category)
		props.handler()
	}

	return (
		<>
			<div className="flex w-full items-center justify-between rounded-xl bg-[#F8F8F8] px-4 py-3 cursor-pointer transition ease-in-out duration-300 hover:bg-[#E9E9E9]" onClick={handleOnClick}>
				<div className="flex items-center gap-4">
					<TransactionLogo category={props.transaction.category} />
					<div className="flex flex-col items-start justify-center">
						<div className="font-medium">{props.transaction.category}</div>
						<div className="text-[#9B9B9B] text-sm">{props.transaction.description}</div>
					</div>
				</div>

				<div className="flex flex-col items-end justify-center">
					<div className={`font-semibold ${amountColor}`}>
						{amountSymbol} RM{props.transaction.amount}
					</div>
					<div className="text-[#9B9B9B] text-sm">{time}</div>
				</div>
			</div>
		</>
	);
};

export default TransactionCard;
