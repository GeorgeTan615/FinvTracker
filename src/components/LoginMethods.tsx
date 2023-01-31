import React from "react";
import { signIn } from "next-auth/react";
import { LiteralUnion } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider } from "next-auth/react";
import { Button } from "@nextui-org/react";
import { baseUrl } from "../configs/constants";

interface LoginMethodsProps {
	providers: Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null;
}
const LoginMethods = (props: LoginMethodsProps) => {
	const landingUrl = `${baseUrl}/overview`;
	return (
		<div className="flex flex-col items-center justify-center gap-3">
			{props.providers &&
				Object.values(props.providers).map((provider) => {
					return (
						<>
							<div key={provider.name}>
								<Button
									auto
									css={{
										width: "120px",
										height: "45px",
										background: "white",
										color: "$black",
										borderRadius: "5px",
										border: "$gray200 solid",
										padding: "$0",
										"&:hover": {
											border: "$gray500 solid",
										},
									}}
									onClick={() =>
										signIn(provider.id, { callbackUrl: landingUrl })
									}
								>
									<img
										className="h-full w-full"
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
