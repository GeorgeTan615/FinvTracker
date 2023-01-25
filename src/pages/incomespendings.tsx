import React from "react";
import AppLayout from "../components/AppLayout";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import Transactions from "../components/Transactions";
import DonutChart from "../components/DonutChart";
import { Input } from "@nextui-org/react";

const IncomeSpendings = () => {
	const { data: session, status } = useSession();

	return (
		<AppLayout>
			<div className="px-14 py-3 flex flex-col h-full">
				<h1>Income/Spendings</h1>
				<div className="self-end flex items-center gap-5 bg-white p-2 rounded-xl">
					<Input 
						width="186px" 
						label="Start Date" 
						type="date" 
					/>
					<p className="font-semibold">to</p>
					<Input 
						width="186px" 
						label="End Date" 
						type="date" 
					/>
				</div>
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
