import React from 'react'
import { Transaction } from './Transactions'

const TransactionCard = ({transaction}:{transaction:Transaction}) => {
  return (
	 <div className="flex justify-between items-center rounded-xl bg-[#F8F8F8] p-3 w-full">
		<div className="flex gap-4 items-center">
			{transaction.category} Logo
			<div className="flex flex-col justify-center items-start">
				<div>{transaction.category}</div>
				<div>{transaction.description}</div>
			</div>
		</div>

		<div className='flex flex-col justify-center items-end'>
			<div>{transaction.amount}</div>
			<div>{transaction.createdAt}</div>
		</div>
	 </div>
  )
}

export default TransactionCard