import React, { useState, useEffect } from 'react'
import AddTransactionButton from './AddTransactionButton'
import TransactionCard from './TransactionCard'
import { UseMutateFunction } from 'react-query'

export interface Transaction{
	id: string,
	description:string,
	amount:number,
	createdAt:string,
	userId:string,
	category:string,
	transactionType:string,
}

interface Transactions{
	transactions:Transaction[],
	mutate:UseMutateFunction<void, unknown, {
		description: string;
		amount: number;
		category:string;
		transactionType:string;
  }, unknown>
}
const dateStyle = "underline underline-offset-8 decoration-1 decoration-[#C3C3C3] mb-3"
const cardStyle = "flex flex-col justify-center items-center gap-3 mb-4"
const months = ['Jan','Feb','Mar','Apr','May','Jun', 'Jul','Aug','Sept','Oct','Nov','Dec']

// Helper function to convert date from Prisma into date objects and to string representation
const dateConvertString = (date:string) => {
	const dateObj = new Date(date)
	console.log(dateObj)
	return `${months[dateObj.getMonth()-1]} ${dateObj.getDay()}, ${dateObj.getFullYear()}`
}

const Transactions = (props:Transactions) => {
	const transactionArr:JSX.Element[] = []
	let tempArr:JSX.Element[] = []

	// Handle transaction cards section based on dates
	if (props.transactions[0]){

		let date = dateConvertString(props.transactions[0].createdAt)
		transactionArr.push(
			<h5 className={dateStyle}>{date}</h5>
		)
		props.transactions.forEach((transaction,index)=>{
			if (dateConvertString(transaction.createdAt) !== date){
				transactionArr.push(
					<div className={cardStyle}>
						{
							tempArr.map(transactionCard => transactionCard)
						}
					</div>
				);
				tempArr = []
				date = dateConvertString(transaction.createdAt)
				transactionArr.push(
					<h5 className={dateStyle}>{date}</h5>
				)
			}
			tempArr.push(<TransactionCard key={index} transaction={transaction} />)
		})
		transactionArr.push(
			<div className={cardStyle}>
				{
					tempArr.map(transactionCard => transactionCard)
				}
			</div>
		);

	}
	else{
		transactionArr.push(
			<div className="flex flex-col justify-center items-center h-full pb-20 text-lg text-[#898989]">
				No transactions made
			</div>
		)
	}

	return (
		<div className='py-4 px-7 h-full col-span-4 bg-white rounded-3xl'>
			<div className="flex justify-between items-center">
				<h3>Transactions</h3>
				<AddTransactionButton mutate={props.mutate}/>
			</div>
			{transactionArr.map(val=>val)}
		</div>
  )
}

export default Transactions