import React from 'react'
import { RiShoppingCartFill, } from 'react-icons/ri'
import { GiMeal, GiPartyPopper, GiTakeMyMoney } from 'react-icons/gi'
import { AiFillCar } from 'react-icons/ai'
import { MdSubscriptions, MdHealthAndSafety, MdPayments, MdWork, MdHomeWork } from 'react-icons/md'
import { FaChartBar } from 'react-icons/fa'
import { GoKebabHorizontal } from 'react-icons/go'

const TransactionLogo = ({category}:{category:string}) => {
	const logoSize = 20;
	if (category === 'Shopping')
		return <RiShoppingCartFill size={logoSize}/>
	else if (category === 'Food & Beverages')
		return <GiMeal size={logoSize}/>
	else if (category === 'Transportation')
		return <AiFillCar size={logoSize}/>
	else if (category === 'Subscription')
		return <MdSubscriptions size={logoSize}/>
	else if (category === 'Entertainment')
		return <GiPartyPopper size={logoSize}/>
	else if (category === 'Healthcare')
			return <MdHealthAndSafety size={logoSize}/>
	else if (category === 'Bills & Fees')
			return <MdPayments size={logoSize}/>
	else if (category === 'Salary')
		return <MdWork size={logoSize}/>
	else if (category === 'Side Hustle')
		return <MdHomeWork size={logoSize}/>
	else if (category === 'Business Income')
		return <GiTakeMyMoney size={logoSize}/>
	else if (category === 'Investment Income')
		return <FaChartBar size={logoSize}/>
	else
		return <GoKebabHorizontal size={logoSize}/>

}

export default TransactionLogo