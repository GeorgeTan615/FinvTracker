import React from 'react'
import { Transaction } from './Transactions'

const TransactionCard = ({transaction}:{transaction:Transaction}) => {
  return (
	 <div className="flex justify-between items-center rounded-xl bg-[#F8F8F8] p-3 w-full">
		<div className="flex gap-2">
			Category
			<div className="flex flex-col justify-center items-start">
				<div>{transaction.id}</div>
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