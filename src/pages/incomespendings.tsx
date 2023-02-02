import React from "react";
import AppLayout from "../components/AppLayout";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Transactions from "../components/Transactions";
import { Input } from "@nextui-org/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import DoughnutChart from "../components/DoughnutChart";
import {
	fetchAllTransactions,
	fetchTransactionsTypeData,
	addTransaction,
	refreshQueries,
} from "../utils";
import { queryClient } from "./_app";
const IncomeSpendings = () => {
	const allTransactions = useQuery(["getAllTransactions"], () =>
		fetchAllTransactions()
	);
	const allIncomeTransactionData = useQuery(
		["getAllIncomeTransactionData"],
		() => fetchTransactionsTypeData("income")
	);
	const allExpenseTransactionData = useQuery(
		["getAllExpenseTransactionData"],
		() => fetchTransactionsTypeData("expense")
	);

	// Populate data to create charts, can create function in the future
	const incomeLabel: string[] = [];
	const incomeData: number[] = [];
	const expenseLabel: string[] = [];
	const expenseData: number[] = [];

	allIncomeTransactionData.data?.result.forEach((data: any) => {
		incomeLabel.push(data.category);
		incomeData.push(data._sum.amount);
	});

	allExpenseTransactionData.data?.result.forEach((data: any) => {
		expenseLabel.push(data.category);
		expenseData.push(data._sum.amount);
	});

	const { mutate } = useMutation(
		async ({
			description,
			amount,
			category,
			transactionType,
		}: {
			description: string;
			amount: number;
			category: string;
			transactionType: string;
		}) => {
			// Must await, so that after add transaction finishes, we will fire refetch
			await addTransaction({ description, amount, category, transactionType });
		},
		{
			onSuccess: () => {
				refreshQueries(
					[
						"getAllTransactions",
						"getAllIncomeTransactionData",
						"getAllExpenseTransactionData",
					],
					queryClient
				);
			},
		}
	);

	return (
		<AppLayout>
			<div className="flex h-full flex-col px-14 py-2">
				<h1>Income/Spendings</h1>
				<div className="mb-3 flex items-center gap-5 self-end rounded-xl bg-white p-2">
					<Input width="186px" label="Start Date" type="date" />
					<p className="font-semibold">to</p>
					<Input width="186px" label="End Date" type="date" />
				</div>
				<div className="grid grid-cols-7 gap-x-3 ">
					{allTransactions.data && (
						<Transactions
							transactions={allTransactions.data.result}
							mutate={mutate}
						/>
					)}
					<div className="col-span-3 flex flex-col gap-3">
						<DoughnutChart
							title={"Expense"}
							chartLabels={expenseLabel}
							chartData={expenseData}
						/>
						<DoughnutChart
							title={"Income"}
							chartLabels={incomeLabel}
							chartData={incomeData}
						/>
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
