import React from "react";
import AppLayout from "../components/AppLayout";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Transactions from "../components/Transactions";
import { Input } from "@nextui-org/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { baseUrl } from "../configs/constants";
import DoughnutChart from "../components/DoughnutChart";

const IncomeSpendings = () => {
	// const [page, setPage] = React.useState(2)
	
	const fetchTransactions = async () => {
		const response = await fetch(`${baseUrl}/api/transactions`);
		const data = await response.json();
		return data;
	};
	const { data, refetch } = useQuery(["getTransactions"], () => fetchTransactions(),{ keepPreviousData : true});
	const addTransaction = async ({
		description,
		amount,
		category,
		transactionType,
	}: {
		description: string;
		amount: number;
		category: string;
		transactionType: string,
	}) => {
		const response = await fetch(`${baseUrl}/api/transactions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ description, amount, category, transactionType}),
		});
		const data = await response.json();
		return data;
	};

	const { mutate } = useMutation(
		async ({
			description,
			amount,
			category,
			transactionType,
		}: {
			description: string;
			amount: number;
			category:string,
			transactionType: string,
		}) => {
			// Must await, so that after add transaction finishes, we will fire refetch
			await addTransaction({ description, amount, category, transactionType });
		},
		{
			onSuccess: () => {
				refetch();
			},
		}
	);

	return (
		<AppLayout>
			<div className="px-14 py-2 flex flex-col h-full">
				<h1>Income/Spendings</h1>
				<div className="self-end flex items-center gap-5 bg-white p-2 rounded-xl mb-3">
					<Input width="186px" label="Start Date" type="date" />
					<p className="font-semibold">to</p>
					<Input width="186px" label="End Date" type="date" />
				</div>
				<div className="h-full grid grid-cols-7 gap-x-3">
					{data && (
						<Transactions transactions={data.transactions} mutate={mutate} />
					)}
					<div className="col-span-3 flex flex-col gap-3">
						<DoughnutChart title={"Spendings"}/>
						<DoughnutChart title={"Income	"}/>

					</div>
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
