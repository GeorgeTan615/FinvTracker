import React from 'react'
import { getProviders, signIn } from "next-auth/react"
import { useState, useEffect } from 'react'
import { LiteralUnion } from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider } from "next-auth/react"
import Image from 'next/image'
import { Button } from '@nextui-org/react'

interface LoginMethodsProps{
	providers:Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}
const LoginMethods = (props:LoginMethodsProps) => {
	console.log(props.providers)
	return (
		<div className="flex flex-col justify-center items-center gap-3">
			{props.providers && Object.values(props.providers).map((provider) => (
				<>
				<div>Hello world</div>
				<div className=""key={provider.name}>
					<Button size="lg" bordered color="secondary" onClick={() => signIn(provider.id)}>
						<Image src={`/${provider.name}.png`} alt="hello" width={30} height={30}></Image>
						<div className="p-1"></div>
						Sign in with {provider.name}
					</Button>
					
				</div>
				</>
			))}
		</div>
	)
}

export default LoginMethods