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
	// Temp Solution. Next time can opt for Amazon s3 to store our images
	const google = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
	const github = "https://cdn-icons-png.flaticon.com/512/25/25231.png"
	return (
		<div className="flex flex-col justify-center items-center gap-3">
			{props.providers && Object.values(props.providers).map((provider) => {
				let link = provider.name ==	 'Google' ? google : github;
				return (
					<>
					<div className=""key={provider.name}>
						<Button size="lg" bordered color="secondary" onClick={() => signIn(provider.id)}>
							<Image src={link} alt={`${provider.name} logo`} width={30} height={30}></Image>
							<div className="p-1"></div>
							Sign in with {provider.name}
						</Button>
						
					</div>
					</>
			)})}
		</div>
	)
}

export default LoginMethods