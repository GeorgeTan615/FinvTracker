import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import {
	Modal,
	useModal,
	Button,
	Text,
	Radio,
	Input,
	Spacer,
} from "@nextui-org/react";
import { useState } from "react";
import { UseMutateFunction } from "react-query";
import { expenseCategories, incomeCategories } from "../configs/constants";
interface AddTransactionProps {
	mutate: UseMutateFunction<
		void,
		unknown,
		{
			description: string;
			amount: number;
			category: string;
			transactionType:string;
		},
		unknown
	>;
}

const AddTransactionButton = (props: AddTransactionProps) => {
	// Modal logic
	const { setVisible, bindings } = useModal();
	const handler = () => setVisible(true);
	const closeHandler = () => {
		setVisible(false);
	};
	const [transactionType, setTransactionType] = useState("Income");
	const [description, setDescription] = useState<string>("");
	const [amount, setAmount] = useState<number>(0.0);
	const [category, setCategory] = useState<string>("Salary");

	const handleRadioChange = (value:string) =>{
		if (value === 'Expense'){
			setCategory("Shopping")
		}
		else{
			setCategory("Salary")
		}
		setTransactionType(value);
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await props.mutate({ description, amount, category, transactionType });
		setTransactionType("Income");
		setDescription("");
		setAmount(0);
		setCategory("Salary");
		closeHandler();
	};

	return (
		<>
			<button
				type="button"
				onClick={handler}
				className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border-none bg-[#eee5ff] px-3 transition delay-100 duration-300 ease-in-out hover:bg-[#E4d5fd]"
			>
				<IconContext.Provider
					value={{ color: "#7F3DFF", className: "global-class-name" }}
				>
					<FaPlusCircle />
				</IconContext.Provider>
				<p className="font-semibold text-[#7F3DFF]">Add Transaction</p>
			</button>
			<Modal
				scroll
				closeButton
				aria-labelledby="modal-title"
				width="45%"
				{...bindings}
			>
				<Modal.Header justify="flex-start">
					<Text
						b
						id="modal-title"
						size={30}
						className="flex items-center justify-start gap-2 font-bold"
					>
						Add Transaction
					</Text>
				</Modal.Header>
				<form id="transactionForm" onSubmit={handleSubmit} className="overflow-auto">
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
							{
								transactionType === 'Income'
								? incomeCategories.map((category,index)=><option key={index} value={category}>{category}</option>)
								: expenseCategories.map((category,index)=><option key={index} value={category}>{category}</option>)
							}
						</select>
						<Spacer y={0.05} />
						<Input
							required
							clearable
							bordered
							label="Description"
							type="text"
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
					<Button
						auto
						flat
						css={{ background: "$brandPurple", color: "white" }}
						type="submit"
						form="transactionForm"
					>
						Add Transaction
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddTransactionButton;
