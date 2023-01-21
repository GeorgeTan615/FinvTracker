import React from 'react'
import AppLayout from '../components/AppLayout'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import { useSession } from "next-auth/react"

const IncomeSpendings = () => {
	const { data: session, status } = useSession();

	return (
		<AppLayout>
			<div>hello world</div>
		</AppLayout>
		
	)
}

export default IncomeSpendings

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