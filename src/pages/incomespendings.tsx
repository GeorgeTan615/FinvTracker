import React from "react";
import AppLayout from "../components/AppLayout";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import Transactions from "../components/Transactions";
import DonutChart from "../components/DonutChart";

const IncomeSpendings = () => {
	const { data: session, status } = useSession();

	return (
		<AppLayout>
			<div className="px-14 py-3 flex flex-col h-full">
				<h1>Income/Spendings</h1>
				<h5 className="self-end">Date Filter</h5>
				<div className="h-full grid grid-cols-7">
					<Transactions />
					{/* One for Spendings One for Income */}
					{/* <DonutChart />
					<DonutChart  /> */}
				</div>

			</div>
		</AppLayout>
	);
};

export default IncomeSpendings;

export async function getServerSideProps(context: any) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
}
