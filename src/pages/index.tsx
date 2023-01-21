import React from 'react'
import HomeLayout from '../components/HomeLayout'
import Head from 'next/head'
import { getProviders } from 'next-auth/react'
import { LiteralUnion } from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider } from "next-auth/react"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import { useSession } from "next-auth/react"

interface HomeProps{
	providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}
const Home = ({providers}:HomeProps) => {
  console.log(providers)
  return (
    <>
      <Head>
        <title>FinvTracker - One Stop Solution for tracking Finances.</title>
        <meta name="description" content="Track your expenses and investments in one place, set reminders and monitor your progress over time. Take control of your finances today!" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HomeLayout providers={providers}>
        <main>
          <h1 className="text-center text-6xl text-black font-bold"><span className="text-[#C36CEC]">One Stop Solution</span> for<br/>tracking Finances and Investments</h1>
          <div className="p-5"></div>
          <p className="text-center text-lg text-gray-500">Track your expenses and investments in one place, set reminders and 
            monitor your progress<br/>over time. Take control of your finances today!</p>
        </main>
      </HomeLayout>
    </>

  )
}

export async function getServerSideProps(context:any) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions)
	if (session) {
		return {
			redirect: {
				destination: '/overview',
				permanent: false,
			},
		}
	}
	const providers = await getProviders()

	return {
		props: {
			session,
			providers
		},
	}
}

export default Home


