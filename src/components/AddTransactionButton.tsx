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
	css,
} from "@nextui-org/react";
import { useState } from "react";
import { UseMutateFunction } from "react-query";

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
	// const [visible, setVisible] = useState(false);
	const { setVisible, bindings } = useModal();
	const handler = () => setVisible(true);
	const closeHandler = () => {
		setVisible(false);
	};
	const [transactionType, setTransactionType] = useState("income");
	const [description, setDescription] = useState<string>("");
	const [amount, setAmount] = useState<number>(0);
	const [category, setCategory] = useState<string>("US");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		console.log("here")
		e.preventDefault();
		props.mutate({ description, amount, category, transactionType });
		setTransactionType("income");
		setDescription("");
		setAmount(0);
		setCategory("US");
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
							onChange={setTransactionType}
							size="sm"
							label="Transaction Type"
							defaultValue="income"
							orientation="horizontal"
							color="secondary"
							isRequired
						>
							<Radio value="income">Income</Radio>
							<Radio value="expense">Expense</Radio>
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
							id="countries"
							className="block w-full rounded-2xl rounded-lg border-[2.1px] border-[#d9d8d8] p-3 text-sm text-gray-900"
						>
							<option value="United States">United States</option>
							<option value="Canada">Canada</option>
							<option value="France">France</option>
							<option value="Germany">Germany</option>
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
