import React from "react";
import AddHoldingsButton from "./AddHoldingsButton";
import { useMutation, useQuery } from "react-query";
import { deleteHolding, fetchAllHoldings, refreshQueries, searchStockQuote, updateHolding } from "../../utils";
import HoldingsCard from "./HoldingsCard";
import { useState } from "react";
import { Modal, useModal, Button, Text, Radio, Input, Spacer, FormElement, } from "@nextui-org/react";
import { queryClient } from "../../pages/_app";
import { useSession } from "next-auth/react";
interface Holding {
	id: string,
	quantity: number;
	averagePrice: number;
	tickerSymbol: string;
	userId: string;
}

const Holdings = () => {
	const [id, setId] = useState<string>("")
	const [tickerSymbol, setTickerSymbol] = useState<string>("");
	const [quantity, setQuantity] = useState<number>(0.0);
	const [averagePrice, setAveragePrice] = useState<number>(0.0);
	const { setVisible, bindings } = useModal();
	const { data, isLoading } = useQuery("getHoldings", () => fetchAllHoldings());
	const [bestMatches, setBestMatches] = useState<any>([]);
	const [typingTimeout, setTypingTimeout] = useState<any>();


	const handleTickerSymbolChange = (e: React.ChangeEvent<FormElement>) => {
		setTickerSymbol(e.target.value);
		clearTimeout(typingTimeout);
		setTypingTimeout(
			setTimeout(async () => {
				console.log("User stopped typing");
				const res = await searchStockQuote(e.target.value);
				setBestMatches(res.results);
				// console.log(res);
			}, 1000)
		);
	};
	const handleSearchSelection = (value: string) => {
		setTickerSymbol(value);
		setBestMatches([]);
	};
	
	const deleteCurrHolding = useMutation(
		async ({ id }: { id: string}) => {
			// Must await, so that after add transaction finishes, we will fire refetch
			await deleteHolding({ id});
		},
		{
			onSuccess: () => {
				refreshQueries(
					[
						"getHoldings","getAllInvestmentProductdata","getHoldingsChartData"
					],
					queryClient
				);
			},
		}
	);
	const handleDelete = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		await deleteCurrHolding.mutate({ id });
		setVisible(false);
	};

	const saveHoldingChanges = useMutation(
		async ({
			id,
			tickerSymbol,
			quantity,
			averagePrice,
		}: {
			id: string;
			tickerSymbol: string;
			quantity: number;
			averagePrice: number;
		}) => {
			// Must await, so that after add transaction finishes, we will fire refetch
			await updateHolding({
				id,
				tickerSymbol,
				quantity,
				averagePrice,
			});
		},
		{
			onSuccess: () => {
				refreshQueries(
					[
						"getHoldings","getAllInvestmentProductdata","getHoldingsChartData"
					],
					queryClient
				);
				
			},
		}
	);

	const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await saveHoldingChanges.mutate({
			id,
			tickerSymbol,
			quantity,
			averagePrice,
		});
		setVisible(false);
	};

	return (
		<>
			<div className="flex items-center justify-between">
				<h3>Holdings</h3>
				<AddHoldingsButton />
			</div>
			<div className="mt-3 mb-1 grid grid-cols-6 place-items-center divide-y font-bold text-center">
				<div>Ticker Symbol</div>
				<div>Quantity</div>
				<div>Average Cost/unit</div>
				<div>Latest Daily Closing Price</div>
				<div>Total Gain</div>
				<div>Total Value</div>
			</div>
			<hr />
			<div className="py-1" />

			{data && data.result && data.result.length > 0 ? (
				data.result.map((holding: Holding, index: number) => {
					return (
						<HoldingsCard
							key={index}
							id={holding.id}
							quantity={holding.quantity}
							averagePrice={holding.averagePrice}
							tickerSymbol={holding.tickerSymbol}
							setIDType={setId}
							setQuantity={setQuantity}
							setAveragePrice={setAveragePrice}
							setTickerSymbol={setTickerSymbol}
							setVisible={setVisible}
						/>
					);
				})
			) : (
				<div className="flex h-full flex-col items-center justify-center pb-20 text-lg text-[#898989]">
					No holdings so far...
				</div>
			)}
			<Modal scroll closeButton aria-labelledby="modal-title" width="45%" {...bindings}>
				<Modal.Header justify="flex-start">
					<Text
						b
						id="modal-title"
						size={30}
						className="flex items-center justify-start gap-2 font-bold"
					>
						{tickerSymbol}
					</Text>
				</Modal.Header>
				<form id="holdingsForm" className="overflow-auto" onSubmit={handleSaveChanges}>
					<Modal.Body>
						<Radio.Group
							css={{ fontSize: "$sm", color: "$black" }}
							value={'STOCK'}
							// onChange={handleRadioChange}
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
							value={quantity}
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
							value={averagePrice}
							onChange={(e) => setAveragePrice(parseFloat(parseFloat(e.target.value).toFixed(2)))}
						/>
						<Spacer y={0.05} />
					</Modal.Body>
				</form>
				<Modal.Footer justify="flex-end">
					<Button auto flat color="error" onClick={handleDelete}>
						Delete Holding
					</Button>
					<Button
						auto
						flat
						css={{ background: "$brandPurple", color: "white" }}
						type="submit"
						form="holdingsForm"
					>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Holdings;
