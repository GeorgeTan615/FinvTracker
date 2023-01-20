import React from "react";
import { getProviders, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { LiteralUnion } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider } from "next-auth/react";
import Image from "next/image";
import { Button } from "@nextui-org/react";

interface LoginMethodsProps {
	providers: Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null;
}
const LoginMethods = (props: LoginMethodsProps) => {
	return (
		<div className="flex flex-col justify-center items-center gap-3">
			{props.providers &&
				Object.values(props.providers).map((provider) => {
					return (
						<>
							<div key={provider.name}>
								<Button
									auto
									css={{
										width :'120px',
										height:'45px',
										background: "white",
										color: "$black",
										borderRadius: "5px",
										border: "$gray200 solid",
										padding: "$0",
										'&:hover': {
											border: '$gray500 solid',
										  },
									}}
									onClick={() => signIn(provider.id)}
								>
									<img
										className="w-full h-full"
										src={`/${provider.name}.svg`}
										alt={`${provider.name} logo`}
									></img>
									&nbsp;{provider.name}
								</Button>
							</div>
						</>
					);
				})}
		</div>
	);
};

export default LoginMethods;
