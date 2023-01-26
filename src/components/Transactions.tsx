import React, { useState, useEffect } from 'react'
import AddTransactionButton from './AddTransactionButton'
import TransactionCard from './TransactionCard'
import { UseMutateFunction } from 'react-query'

export interface Transaction{
	id: string,
	description:string,
	amount:number,
	createdAt:string,
	userId:string
}

interface Transactions{
	transactions:Transaction[],
	mutate:UseMutateFunction<void, unknown, {
		description: string;
		amount: number;
  }, unknown>
}

const Transactions = (props:Transactions) => {
	console.log(props.transactions)
	return (
		<div className='py-4 px-7 h-full col-span-4 bg-white rounded-3xl'>
			<div className="flex justify-between items-center">
				<h3>Transactions</h3>
				<AddTransactionButton mutate={props.mutate}/>
			</div>
			<h5 className="underline">Jan 14, 2023 (Today)</h5>
			<div className="flex flex-col justify-center items-center gap-3">
			{
				props.transactions && props.transactions.map((transaction,index)=>{
					return <TransactionCard key={index} transaction={transaction} />
				})
			}
			</div>
		</div>
  )
}

export default Transactions