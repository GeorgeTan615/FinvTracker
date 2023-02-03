import React, { useState } from "react";
import AddTransactionButton from "./AddTransactionButton";
import TransactionCard from "./TransactionCard";
import { UseMutateFunction, useMutation } from "react-query";
import { dateConvertString, updateTransaction, deleteTransaction, refreshQueries, } from "../utils";
import { Modal, useModal, Button, Text, Radio, Input, Spacer, } from "@nextui-org/react";
import TransactionLogo from "./TransactionLogo";
import { incomeCategories, expenseCategories } from "../configs/constants";
import { queryClient } from "../pages/_app";

export interface Transaction {
	id: string;
	description: string;
	amount: number;
	createdAt: string;
	userId: string;
	category: string;
	transactionType: string;
}

interface Transactions {
	transactions: Transaction[];
	mutate: UseMutateFunction<
		void,
		unknown,
		{
			description: string;
			amount: number;
			category: string;
			transactionType: string;
		},
		unknown
	>;
}

const dateStyle = "underline underline-offset-8 decoration-1 decoration-[#C3C3C3] mb-3";
const cardStyle = "flex flex-col justify-center items-center gap-3 mb-4";

const Transactions = (props: Transactions) => {
	const transactionArr: JSX.Element[] = [];
	let tempArr: JSX.Element[] = [];

	const [id, setIDType] = useState<string>("");
	const [transactionType, setTransactionType] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [amount, setAmount] = useState<number>(0);
	const [category, setCategory] = useState<string>("");

	const { setVisible, bindings } = useModal();
	const handler = () => setVisible(true);
	const closeHandler = () => {
		setVisible(false);
	};

	const saveTransactionChanges = useMutation(
		async ({
			id,
			description,
			amount,
			category,
			transactionType,
		}: {
			id: string;
			description: string;
			amount: number;
			category: string;
			transactionType: string;
		}) => {
			// Must await, so that after add transaction finishes, we will fire refetch
			await updateTransaction({
				id,
				description,
				amount,
				category,
				transactionType,
			});
		},
		{
			onSuccess: () => {
				// refreshQueries(
				// 	[
				// 		"getAllTransactions",
				// 		"getAllIncomeTransactionData",
				// 		"getAllExpenseTransactionData",
				// 	],
				// 	queryClient
				// );
				queryClient.invalidateQueries("getAllTransactions");
				queryClient.invalidateQueries("getAllIncomeTransactionData");
				queryClient.invalidateQueries("getAllExpenseTransactionData");
			},
		}
	);

	const deleteTrans = useMutation(
		async ({ id }: { id: string }) => {
			// Must await, so that after add transaction finishes, we will fire refetch
			await deleteTransaction({ id });
		},
		{
			onSuccess: () => {
				// refreshQueries(
				// 	[
				// 		"getAllTransactions",
				// 		"getAllIncomeTransactionData",
				// 		"getAllExpenseTransactionData",
				// 	],
				// 	queryClient
				// );
				queryClient.invalidateQueries("getAllTransactions");
				queryClient.invalidateQueries("getAllIncomeTransactionData");
				queryClient.invalidateQueries("getAllExpenseTransactionData");
			},
		}
	);

	const handleRadioChange = (value: string) => {
		if (value === "Expense") {
			setCategory("Shopping");
		} else {
			setCategory("Salary");
		}
		setTransactionType(value);
	};

	const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await saveTransactionChanges.mutate({
			id,
			description,
			amount,
			category,
			transactionType,
		});
		closeHandler();
	};

	const handleDelete = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		await deleteTrans.mutate({ id });
		closeHandler();
	};



	// Handle transaction cards section based on dates
	if (props.transactions[0]) {
		let date = dateConvertString(props.transactions[0].createdAt);
		transactionArr.push(<h5 className={dateStyle}>{date}</h5>);
		props.transactions.forEach((transaction, index) => {
			if (dateConvertString(transaction.createdAt) !== date) {
				transactionArr.push(
					<div className={cardStyle}>
						{tempArr.map((transactionCard) => transactionCard)}
					</div>
				);
				tempArr = [];
				date = dateConvertString(transaction.createdAt);
				transactionArr.push(<h5 className={dateStyle}>{date}</h5>);
			}
			tempArr.push(
				<TransactionCard
					key={index}
					transaction={transaction}
					handler={handler}
					setIDType={setIDType}
					setTransactionType={setTransactionType}
					setDescription={setDescription}
					setAmount={setAmount}
					setCategory={setCategory}
				/>
			);
		});
		transactionArr.push(
			<div className={cardStyle}>
				{tempArr.map((transactionCard) => transactionCard)}
			</div>
		);
	} else {
		transactionArr.push(
			<div className="flex h-full flex-col items-center justify-center pb-20 text-lg text-[#898989]">
				No transactions made
			</div>
		);
	}

	return (
		<>
			<div className="h-full rounded-3xl bg-white py-4 px-7">
				<div className="flex items-center justify-between">
					<h3>Transactions</h3>
					<AddTransactionButton mutate={props.mutate} />
				</div>
				{transactionArr.map((val) => val)}
			</div>
			<Modal
				scroll
				closeButton
				aria-labelledby="modal-title"
				width="45%"
				{...bindings}
			>
				<Modal.Header justify="flex-start">
					<div className="flex items-center gap-4">
						<TransactionLogo category={category} size={30} />
						<div className="flex flex-col items-start justify-center">
							{/* <div className="font-medium">{transaction.category}</div> */}
							<Text b id="modal-title" size={30}>
								{category}
							</Text>
							<div className="text-sm text-[#9B9B9B]">{description}</div>
						</div>
					</div>
				</Modal.Header>
				<form
					id="transactionForm"
					onSubmit={handleSaveChanges}
					className="overflow-auto"
				>
					<Modal.Body>
						<Radio.Group
							css={{ fontSize: "$sm", color: "$black" }}
							value={transactionType}
							onChange={handleRadioChange}
							size="sm"
							label="Transaction Type"
							defaultValue="Income"
							orientation="horizontal"
							color="secondary"
							isRequired
						>
							<Radio value="Income">Income</Radio>
							<Radio value="Expense">Expense</Radio>
						</Radio.Group>
						<label
							htmlFor="countries"
							className="mb-2 block text-sm text-gray-900"
						>
							Category
						</label>
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="block w-full rounded-2xl rounded-lg border-[2.1px] border-[#d9d8d8] p-3 text-sm text-gray-900"
						>
							{transactionType === "Income"
								? incomeCategories.map((category, index) => (
										<option key={index} value={category}>
											{category}
										</option>
								  ))
								: expenseCategories.map((category, index) => (
										<option key={index} value={category}>
											{category}
										</option>
								  ))}
						</select>
						<Spacer y={0.05} />
						<Input
							required
							clearable
							bordered
							label="Description"
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<Spacer y={0.05} />
						<Input
							required
							clearable
							bordered
							label="Amount"
							type="number"
							value={amount}
							onChange={(e) =>
								setAmount(parseFloat(parseFloat(e.target.value).toFixed(2)))
							}
						/>
						<Spacer y={0.05} />
					</Modal.Body>
				</form>
				<Modal.Footer justify="flex-end">
					<Button auto flat color="error" onClick={handleDelete}>
						Delete Transaction
					</Button>
					<Button
						auto
						flat
						css={{ background: "$brandPurple", color: "white" }}
						type="submit"
						form="transactionForm"
					>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Transactions;
