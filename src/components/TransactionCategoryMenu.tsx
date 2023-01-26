import React, { useState } from "react";
import { Input } from "@nextui-org/react";
function TransactionCategoryMenu() {
	const options = ["Shopping", "Subscription", "Food", "Transportation"];
	const [selected, setSelected] = useState("Option 1");
	const [isOpen, setIsOpen] = useState(false);

	const handleSelectClick = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option: any) => {
		setSelected(option);
		setIsOpen(false);
	};

	return (
		<>
			<Input
				readOnly
				bordered
				label="Category"
				value={selected}
				onClick={handleSelectClick}
			/>
			{/* <div className="border border-black">Hello world</div> */}
			<div className="relative flex">
				{/* <div className="inset-y-0 right-0 h-full">
					<svg
						className="fill-current h-4 w-4 absolute"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
					</svg>
				</div> */}
			</div>

			<div className="relative rounded-md shadow-sm px-2 border-black">
				{isOpen && (
					<div className="absolute mt-1 w-full rounded-md bg-white shadow-lg border border-black">
						<ul className="list-reset">
							{options.map((option) => (
								<li
									key={option}
									className={`px-3 py-2 text-gray-700 hover:bg-purple-100 cursor-pointer ${
										option === selected ? "bg-purple-300" : ""
									}`}
									onClick={() => handleOptionClick(option)}
								>
									{option}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	);
}

export default TransactionCategoryMenu;
