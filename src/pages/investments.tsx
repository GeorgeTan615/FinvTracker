import React from 'react'
import AppLayout from '../components/App/AppLayout'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import { useSession } from "next-auth/react"
import PortfolioCard from '../components/Investments/PortfolioCard'
import HoldingsPerformance from '../components/Investments/HoldingsPerformance'
import Holdings from '../components/Investments/Holdings'
import { Input } from '@nextui-org/react'
import { useQuery } from 'react-query'
import { getAllInvestmentProductData } from '../utils'
import Head from 'next/head'
const Investments = () => {
	// const { data: session, status } = useSession();

	return (
		<>
			<Head>
				<title>Investments</title>
				<meta name="description" content="Add your investment holdings and track their daily performances" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<AppLayout>
				<div className="flex h-full flex-col px-14 py-2 overflow-auto">
					<h1>Investments</h1>
					<div className="py-3"/> 
					<div className="grid grid-cols-2 gap-x-4">
						<div className="col-span-1 bg-white rounded-3xl py-4 px-7">
							<PortfolioCard />	
						</div>
						<div className="col-span-1 bg-white rounded-3xl py-4 px-7">
							<HoldingsPerformance />
						</div>
					</div>
					<div className="py-2"/>
					<div className="bg-white rounded-3xl py-4 px-7">
						<Holdings />
					</div>

				</div>
			</AppLayout>
		</>
		
	)
}

export default Investments

export async function getServerSideProps(context:any) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions)
  
	if (!session) {
	  return {
		redirect: {
		  destination: '/',
		  permanent: false,
		},
	  }
	}
  
	return {
	  props: {
		session,
	  },
	}
  }