import React from 'react'
import AppLayout from '../components/AppLayout'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import { useSession } from "next-auth/react"
import Head from 'next/head'

const Overview = () => {
	const { data: session, status } = useSession();
	return (
		<>
			<Head>
				<title>Overview</title>
				<meta name="description" content="Overview dashboard of income,expenses and investments" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<AppLayout>
				<div></div>
			</AppLayout>
		</>

	)

}

export default Overview

// export async function getServerSideProps(context:any) {
// 	const session = await unstable_getServerSession(context.req, context.res, authOptions)
  
// 	if (!session) {
// 	  return {
// 		redirect: {
// 		  destination: '/',
// 		  permanent: false,
// 		},
// 	  }
// 	}
  
// 	return {
// 	  props: {
// 		session,
// 	  },
// 	}
//   }