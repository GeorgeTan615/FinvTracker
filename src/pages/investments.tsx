import React from 'react'
import AppLayout from '../components/AppLayout'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import { useSession } from "next-auth/react"
import { fetchStockQuote } from '../utils'
import { useQuery } from 'react-query'

const Investments = () => {
	const { data: session, status } = useSession();
	const tslaData = useQuery('getTeslaTransaction',()=>fetchStockQuote('TSLA'))

	if (!tslaData.isLoading){
		console.log(tslaData.data)
	}

	return (
		<AppLayout>
			<div>hello world</div>			
		</AppLayout>
		
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