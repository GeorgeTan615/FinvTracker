import React, { useState, useEffect } from 'react'
import AddTransactionButton from './AddTransactionButton'
const Transactions = () => {
	return (
		<div className='py-4 px-7 h-full col-span-4 bg-white rounded-3xl'>
			<div className="flex justify-between items-center">
				<h3>Transactions</h3>
				<AddTransactionButton />
			</div>
			<h5 className="underline">Jan 14, 2023 (Today)</h5>
	</div>
  )
}

export default Transactions