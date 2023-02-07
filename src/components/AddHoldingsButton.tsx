import React from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { IconContext } from "react-icons";
import {
	Modal,
	useModal,
	Button,
	Text,
	Radio,
	Input,
	Spacer,
	FormElement,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { searchStockQuote } from "../utils";
import { refreshQueries, addHoldings } from "../utils";
import { queryClient } from "../pages/_app";

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
	const [bestMatches, setBestMatches] = useState<any>([]);
	const [typingTimeout, setTypingTimeout] = useState<any>();

	// To ensure that when component unmounts, the timeout is cleared
	useEffect(() => {
		return () => {
			clearTimeout(typingTimeout);
		};
	}, []);

	const handleTickerSymbolChange = (e: React.ChangeEvent<FormElement>) => {
		setTickerSymbol(e.target.value);
		clearTimeout(typingTimeout);
		setTypingTimeout(
			setTimeout(async () => {
				console.log("User stopped typing");
				const res = await searchStockQuote(e.target.value);
				setBestMatches(res.results);
			}, 1000)
		);
	};

	const handleRadioChange = (value: string) => {
		setHoldingsType(value);
	};

	const handleSearchSelection = (value: string) => {
		setTickerSymbol(value);
		setBestMatches([]);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await mutate({ quantity,costPerUnit,tickerSymbol,holdingsType});
		setHoldingsType("STOCK");
		setQuantity(0.0);
		setCostPerUnit(0.0);
		setTickerSymbol("");
		setBestMatches([])
		closeHandler();
	};

	const { mutate } = useMutation(
		async ({
			quantity,
			costPerUnit,
			tickerSymbol,
			holdingsType,
		}: {
			quantity: number;
			costPerUnit: number;
			tickerSymbol: string;
			holdingsType: string;
		}) => {
			await addHoldings({quantity,costPerUnit,tickerSymbol,holdingsType})
		},
		{
			onSuccess: () => {
				refreshQueries(['getHoldings','getAllInvestmentProductdata','getHoldingsChartData'],queryClient)
			}
		}
	);

	return (
		<>
			<button
				type="button"
				onClick={handler}
				className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border-none bg-[#eee5ff] px-3 transition delay-100 duration-300 ease-in-out hover:bg-[#E4d5fd]"
			>
				<IconContext.Provider value={{ color: "#7F3DFF", className: "global-class-name" }}>
					<GiTakeMyMoney size={20} />
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
						<Spacer y={0.01} />
						<Input
							required
							clearable
							bordered
							label="Ticker Symbol"
							type="text"
							onChange={handleTickerSymbolChange}
							value={tickerSymbol}
							onBlur={() => setBestMatches([])}
						/>
						{bestMatches.length > 0 && (
							<div className="relative z-50 -mt-5 border-black">
								<div className="absolute mt-2 w-full overflow-hidden rounded-2xl bg-[#F5F5F5]">
									{bestMatches.map((match: string, index: number) => {
										return (
											<div
												key={index}
												className="cursor-pointer py-2 px-3 hover:bg-purple-100"
												onMouseDown={() => handleSearchSelection(match)}
											>
												<p className="text-sm text-gray-500">{match}</p>
											</div>
										);
									})}
								</div>
							</div>
						)}
						<Spacer y={0.05} />
						<Input
							required
							clearable
							bordered
							label="Quantity"
							type="number"
							onChange={(e) => setQuantity(parseFloat(e.target.value))}
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
