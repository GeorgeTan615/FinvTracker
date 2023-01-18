import React, { ReactNode } from 'react'
import IndexFooter from './IndexFooter';
import IndexNavBar from './IndexNavBar';
import { LiteralUnion } from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider } from "next-auth/react"

interface IndexLayoutProps{
	children:ReactNode,
	providers:Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}
const IndexLayout = (props:IndexLayoutProps) => {
  return (
	<div className="p-5 flex flex-col justify-between h-screen content-center">
		<IndexNavBar providers={props.providers}/>
		<div>
			{props.children}
		</div>
		
		<IndexFooter/>
	</div>
  )
}

export default IndexLayout