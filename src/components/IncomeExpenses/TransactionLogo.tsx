import React from 'react'
import { RiShoppingCartFill, } from 'react-icons/ri'
import { GiMeal, GiPartyPopper, GiTakeMyMoney } from 'react-icons/gi'
import { AiFillCar } from 'react-icons/ai'
import { MdSubscriptions, MdHealthAndSafety, MdPayments, MdWork, MdHomeWork } from 'react-icons/md'
import { FaChartBar } from 'react-icons/fa'
import { GoKebabHorizontal } from 'react-icons/go'

const TransactionLogo = ({category,size=20}:{category:string,size?:number}) => {
	if (category === 'Shopping')
		return <RiShoppingCartFill size={size}/>
	else if (category === 'Food & Beverages')
		return <GiMeal size={size}/>
	else if (category === 'Transportation')
		return <AiFillCar size={size}/>
	else if (category === 'Subscription')
		return <MdSubscriptions size={size}/>
	else if (category === 'Entertainment')
		return <GiPartyPopper size={size}/>
	else if (category === 'Healthcare')
			return <MdHealthAndSafety size={size}/>
	else if (category === 'Bills & Fees')
			return <MdPayments size={size}/>
	else if (category === 'Salary')
		return <MdWork size={size}/>
	else if (category === 'Side Hustle')
		return <MdHomeWork size={size}/>
	else if (category === 'Business Income')
		return <GiTakeMyMoney size={size}/>
	else if (category === 'Investment Income')
		return <FaChartBar size={size}/>
	else
		return <GoKebabHorizontal size={size}/>

}

export default TransactionLogo