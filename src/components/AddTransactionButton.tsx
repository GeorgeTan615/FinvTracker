import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Modal, Button, Text } from "@nextui-org/react";
import { Input, Spacer, Dropdown } from "@nextui-org/react";
import { baseUrl } from "../configs/constants";
import { useState, } from "react";
import { useMutation,UseMutateFunction } from "react-query";
import TransactionCategoryMenu from "./TransactionCategoryMenu";

interface AddTransactionProps{
	mutate:UseMutateFunction<void, unknown, {
		description: string;
		amount: number;
		category:string;
  }, unknown>
}

const AddTransactionButton = (props:AddTransactionProps) => {
	// Modal logic
	const [visible, setVisible] = useState(false);
	const handler = () => setVisible(true);
	const closeHandler = () => {
		setVisible(false);
	};
	const [description, setDescription] = useState<string>("");
	const [amount, setAmount] = useState<number>(0);
	const [category, setCategory] = useState<string>("US");

	const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		props.mutate({description,amount,category})
	}

	return (
		<>
		
			<button
				onClick={handler}
				className="flex justify-center items-center gap-1 border-none bg-[#eee5ff] rounded-lg px-3 transition ease-in-out delay-100 duration-300 hover:bg-[#E4d5fd] cursor-pointer"
			>
				<IconContext.Provider
					value={{ color: "#7F3DFF", className: "global-class-name" }}
				>
					<FaPlusCircle />
				</IconContext.Provider>
				<p className="text-[#7F3DFF] font-semibold">Add Transaction</p>
			</button>

			<Modal
				scroll
				closeButton
				aria-labelledby="modal-title"
				open={visible}
				onClose={closeHandler}
				width="45%"
			>
				<Modal.Header justify="flex-start">
					<Text
						b
						id="modal-title"
						size={30}
						className="font-bold flex gap-2 justify-start items-center"
					>
						Add Transaction
					</Text>
				</Modal.Header>
				<form
					onSubmit={handleSubmit}
				>
					<Modal.Body>
						<label htmlFor="countries" className="block mb-2 text-sm text-gray-900">Category</label>
							<select value={category} onChange={(e)=>setCategory(e.target.value)}id="countries" className="border-[2.1px] rounded-2xl border-[#d9d8d8] text-gray-900 text-sm rounded-lg block w-full p-3">
							<option value="United States">United States</option>
							<option value="Canada">Canada</option>
							<option value="France">France</option>
							<option value="Germany">Germany</option>
						</select>
						<Spacer y={0.05} />
						<Input
							className="hello"
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
					
					</Modal.Body>
					<Modal.Footer justify="flex-end">
						<Button
							auto
							flat
							css={{ background: "$brandPurple", color: "white" }}
							type="submit"
						>
							Add Transaction
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
};

export default AddTransactionButton;
