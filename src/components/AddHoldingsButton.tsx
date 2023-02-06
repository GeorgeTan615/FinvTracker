import React from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { IconContext } from "react-icons";
import { Modal, useModal, Button, Text, Radio, Input, Spacer, FormElement } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { searchStockQuote } from "../utils";
const AddHoldingsButton = () => {
	// Modal logic
	const { setVisible, bindings } = useModal();
	const handler = () => setVisible(true);
	const closeHandler = () => {
		setVisible(false);
	};
	const [holdingsType, setHoldingsType] = useState<string>("STOCK");
	const [quantity, setQuantity] = useState<number>(0.0);
	const [costPerUnit, setCostPerUnit] = useState<number>(0.0);
	const [tickerSymbol, setTickerSymbol] = useState<string>("");
	const [bestMatches, setBestMatches] = useState<any>([])
	const [typingTimeout, setTypingTimeout] = useState<any>();

	// To ensure that when component unmounts, the timeout is cleared
	useEffect(() => {
		return () => {
		  clearTimeout(typingTimeout);
		};
	 }, []);
	
	 const handleChange = (e:React.ChangeEvent<FormElement>) => {
		setTickerSymbol(e.target.value);
		clearTimeout(typingTimeout);
		setTypingTimeout(setTimeout(async () => {
		  console.log('User stopped typing');
		  const res = await searchStockQuote(e.target.value)
		  setBestMatches(res.results)
		  console.log(res)
		}, 1000));
	 };

	const handleRadioChange = (value: string) => {
		setHoldingsType(value);
	};

	const handleSearchSelection = (value:string) =>{
		setTickerSymbol(value)
		setBestMatches([])
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// await props.mutate({ description, amount, category, transactionType });
		// setTransactionType("Income");
		// setDescription("");
		// setAmount(0);
		// setCategory("Salary");
		// closeHandler();
	};
	

	return (
		<>
			<button
				type="button"
				onClick={handler}
				className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border-none bg-[#eee5ff] px-3 transition delay-100 duration-300 ease-in-out hover:bg-[#E4d5fd]"
			>
				<IconContext.Provider value={{ color: "#7F3DFF", className: "global-class-name" }}>
					<GiTakeMyMoney size={20}/>
				</IconContext.Provider>
				<p className="font-semibold text-[#7F3DFF]">Add Holdings</p>
			</button>

			<Modal scroll closeButton aria-labelledby="modal-title" width="45%" {...bindings}>
				<Modal.Header justify="flex-start">
					<Text
						b
						id="modal-title"
						size={30}
						className="flex items-center justify-start gap-2 font-bold"
					>
						Add Holdings
					</Text>
				</Modal.Header>
				<form id="holdingsForm" className="overflow-auto" onSubmit={handleSubmit}>
					<Modal.Body>
						<Radio.Group
							css={{ fontSize: "$sm", color: "$black" }}
							value={holdingsType}
							onChange={handleRadioChange}
							size="sm"
							label="Holdings Type"
							defaultValue="Income"
							orientation="horizontal"
							color="secondary"
							isRequired
						>
							<Radio value="STOCK">Stock</Radio>
						</Radio.Group>
						<Spacer y={0.05} />
						<Input
							required
							clearable
							bordered
							label="Ticker Symbol"
							type="text"
							onChange={handleChange}
							value={tickerSymbol}
							onBlur={()=>setBestMatches([])}
						/>
						{
							bestMatches.length > 0 && (
								<div className="relative -mt-5 z-50 border-black" >
									<div className="absolute mt-2 w-full overflow-hidden bg-[#F5F5F5] rounded-2xl">
										{
											bestMatches.map((match:string,index:number)=>{
												return (
													<div key={index} className="cursor-pointer py-2 px-3 hover:bg-purple-100" onMouseDown={()=>handleSearchSelection(match)}>
														<p className="text-sm text-gray-500" >{match}</p>
													</div>
												)
											})
										}
									</div>
								</div>
							)
						}
						<Spacer y={0.05} />
						<Input
							required
							clearable
							bordered
							label="Quantity"
							type="number"
							onChange={(e) => setQuantity(parseFloat(parseFloat(e.target.value).toFixed(2)))}
						/>
						<Spacer y={0.05} />
						<Input
							required
							clearable
							bordered
							label="Cost basis/unit"
							type="number"
							value={costPerUnit}
							onChange={(e) => setCostPerUnit(parseFloat(parseFloat(e.target.value).toFixed(2)))}
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
						form="holdingsForm"
					>
						Add Holding
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddHoldingsButton;
