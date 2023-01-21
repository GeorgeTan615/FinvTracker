import React, { ReactNode } from 'react'
import HomeFooter from './HomeFooter';
import HomeNavBar from './HomeNavBar';
import { LiteralUnion } from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider } from "next-auth/react"

interface HomeLayoutProps{
	children:ReactNode,
	providers:Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}
const HomeLayout = (props:HomeLayoutProps) => {
  return (
	<div className="p-5 flex flex-col justify-between h-screen content-center">
		<HomeNavBar providers={props.providers}/>
		<div className="">
			{props.children}
		</div>
		<HomeFooter/>
	</div>
  )
}

export default HomeLayout