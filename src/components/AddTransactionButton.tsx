import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Modal, Button, Text } from "@nextui-org/react";
import { Input, Spacer, Dropdown } from "@nextui-org/react";
import { baseUrl } from "../configs/constants";
import { useState, } from "react";
import { useMutation,UseMutateFunction } from "react-query";

interface AddTransactionProps{
	mutate:UseMutateFunction<void, unknown, {
		description: string;
		amount: number;
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

	const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		props.mutate({description,amount})
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
				width="35%"
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
						<Spacer y={0.1} />
						<Input
							clearable
							bordered
							labelPlaceholder="Description"
							type="text"
							onChange={(e) => setDescription(e.target.value)}
						/>
						<Spacer y={0.05} />
						<Input
							required
							clearable
							bordered
							labelPlaceholder="Amount"
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
