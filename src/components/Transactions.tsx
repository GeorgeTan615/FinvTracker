import React from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { Modal, Button, Text } from "@nextui-org/react";

const Transactions = () => {
	const [visible, setVisible] = React.useState(false);
	const handler = () => setVisible(true);
	const closeHandler = () => {
		setVisible(false);
	}

	return (
		<div className='py-4 px-7 h-full col-span-4 bg-white rounded-3xl'>
			<div className="flex justify-between items-center">
				<h3>Transactions</h3>
				<button onClick={handler} className="flex justify-center items-center gap-1 border-none bg-[#eee5ff] rounded-lg px-3 transition ease-in-out delay-100 duration-300 hover:bg-[#E4d5fd] cursor-pointer">
					<IconContext.Provider value={{ color: "#7F3DFF", className: "global-class-name" }}>
						<FaPlusCircle/>
					</IconContext.Provider>
					<p className="text-[#7F3DFF] font-semibold">Add Transaction</p>
				</button>
			</div>
			<h5 className="underline">Jan 14, 2023 (Today)</h5>



			<Modal
				scroll
				closeButton
				aria-labelledby="modal-title"
				open={visible}
				onClose={closeHandler}
				width='45%'
			>
				<Modal.Header justify="flex-start">
					<Text b id="modal-title" size={30} className="font-bold flex gap-2 justify-start items-center">
						Add Transaction
					</Text>
				</Modal.Header>
				<Modal.Body>

				</Modal.Body>
				<Modal.Footer justify="center">
					<Button
						auto
						flat
						css={{ background: "$brandPurple", color: "white" }}
						onPress={closeHandler}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
	</div>
  )
}

export default Transactions