import React from 'react'
import IndexLayout from '@/components/IndexLayout'
import Head from 'next/head'
import { getProviders } from 'next-auth/react'
import { LiteralUnion } from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider } from "next-auth/react"

interface HomeProps{
	providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}
const Home = ({providers}:HomeProps) => {
  return (
    <>
      <Head>
        <title>FinvTracker - One Stop Solution for tracking Finances.</title>
        <meta name="description" content="Track your expenses and investments in one place, set reminders and monitor your progress over time. Take control of your finances today!" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <IndexLayout providers={providers}>
        <main>
          <h1 className="text-center text-6xl text-black font-bold"><span className="text-[#C36CEC]">One Stop Solution</span> for<br/>tracking Finances and Investments</h1>
          <div className="p-5"></div>
          <p className="text-center text-lg text-gray-500">Track your expenses and investments in one place, set reminders and 
            monitor your progress<br/>over time. Take control of your finances today!</p>
        </main>
      </IndexLayout>
    </>

  )
}

export async function getStaticProps(context:any) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default Home
