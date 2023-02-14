import React from "react";
import HomeLayout from "../components/Homepage/HomeLayout";
import Head from "next/head";
import { getProviders } from "next-auth/react";
import { LiteralUnion } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

interface HomeProps {
	providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
}
const Home = ({ providers }: HomeProps) => {
	return (
		<>
			<Head>
				<title>FinvTracker - One Stop Solution for tracking Finances.</title>
				<meta
					name="description"
					content="Track your expenses and investments in one place, set reminders and monitor your progress over time. Take control of your finances today!"
				/>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<HomeLayout providers={providers}>
				<main className="flex flex-col items-center">
					<h1 className="w-11/12 text-center text-7xl font-bold text-black">
						<span className="text-[#C36CEC]">One Stop Solution</span> for tracking Finances and
						Investments
					</h1>
					<div className="p-5"></div>
					<p className="w-6/12 text-center text-xl text-gray-500">
						Track your finances and investments in one place, and monitor your
						progress over time. Take control of your finances today!
					</p>
				</main>
			</HomeLayout>
		</>
	);
};

export async function getServerSideProps(context: any) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions);
	if (session) {
		return {
			redirect: {
				destination: "/incomeexpenses",
				permanent: false,
			},
		};
	}
	const providers = await getProviders();

	return {
		props: {
			session,
			providers,
		},
	};
}

export default Home;
