import React from "react";
import AppLayout from "../components/AppLayout";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import Transactions from "../components/Transactions";
import DonutChart from "../components/DonutChart";
import { Input } from "@nextui-org/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { baseUrl } from "../configs/constants";

const IncomeSpendings = () => {
	const { data: session, status } = useSession();
	const qc = useQueryClient()

	const fetchTransactions = async () =>{
		const response = await fetch(`${baseUrl}/api/transactions`)
		const data = await response.json()
		return data;
	}
	const {isLoading,isError,data,refetch} = useQuery('getTransactions',fetchTransactions)

	const addTransaction = async ({description, amount}:{description: string, amount: number}) => {
		const response = await fetch(`${baseUrl}/api/transactions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ description, amount }),
		});
		const data = await response.json();
		return data;
	};

	const { mutate } = useMutation(
		async ({description,amount}:{description:string,amount:number}) => {
			addTransaction({description, amount});
		},
		{
			onSuccess: () => {
				qc.invalidateQueries('getTransactions')
				console.log('here')
			},
		}
	);
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
					{!isLoading && <Transactions transactions={data.transactions} mutate={mutate}/>}
					{/* <Transactions transactions={data.transactions}/> */}
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
