import { baseUrl } from "./configs/constants";
import { useQueryClient, QueryClient } from "react-query";
import { months } from "./configs/constants";
import { queryClient } from "./pages/_app";

export const fetchAllTransactions = async () => {
	const response = await fetch(`${baseUrl}/api/transactions`);
	const data = await response.json();
	return data;
};
export const fetchTransactionsTypeData = async (transactionType: string) => {
	const response = await fetch(`${baseUrl}/api/transactions/type/${transactionType}?isData=true`);
	const data = await response.json();
	return data;
};
export const addTransaction = async ({
	description,
	amount,
	category,
	transactionType,
}: {
	description: string;
	amount: number;
	category: string;
	transactionType: string;
}) => {
	const response = await fetch(`${baseUrl}/api/transactions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ description, amount, category, transactionType }),
	});
	const data = await response.json();
	return data;
};
export const updateTransaction = async ({
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
	const response = await fetch(`${baseUrl}/api/transactions/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ description, amount, category, transactionType }),
	});
	const data = await response.json();
	return data;
};
export const deleteTransaction = async ({ id }: { id: string }) => {
	const response = await fetch(`${baseUrl}/api/transactions/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	return data;
};

export const refreshQueries = (queries: string[], qc: QueryClient) => {
	queries.forEach((query) => qc.invalidateQueries(query));
};

export const dateConvertString = (date: string) => {
	const dateObj = new Date(date);
	return `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};

export const fetchStockQuote = async (stock: string) => {
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": String(process.env.NEXT_PUBLIC_RAPIDAPI_KEY),
			"X-RapidAPI-Host": String(process.env.NEXT_PUBLIC_RAPIDAPI_HOST),
		},
	};
	try {
		const response = await fetch(
			`https://alpha-vantage.p.rapidapi.com/query?function=GLOBAL_QUOTE&symbol=${stock}&datatype=json`,
			options
		);
		const data = await response.json();
		return data;
	} catch (err: any) {
		return { message: err.message };
	}
};

export const searchStockQuote = async (stock: string) => {
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": String(process.env.NEXT_PUBLIC_RAPIDAPI_KEY),
			"X-RapidAPI-Host": String(process.env.NEXT_PUBLIC_RAPIDAPI_HOST),
		},
	};
	try {
		const response = await fetch(
			`https://alpha-vantage.p.rapidapi.com/query?keywords=${stock}&function=SYMBOL_SEARCH&datatype=json`,
			options
		);
		const data = await response.json();
		const results: string[] = [];
		data.bestMatches?.forEach((match: any) => {
			results.push(match["1. symbol"]);
		});
		return { results };
	} catch (err: any) {
		return { results: err.message };
	}
};

export const addHoldings = async ({
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
	const response = await fetch(`${baseUrl}/api/investments`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			quantity,
			averagePrice: costPerUnit,
			tickerSymbol: tickerSymbol.toUpperCase(),
			investmentProduct: holdingsType,
		}),
	});
	const data = await response.json();
	return data;
};

export const fetchAllHoldings = async () => {
	const response = await fetch(`${baseUrl}/api/investments`);
	const data = await response.json();
	return data;
};

export const deleteHolding = async ({
	id,
}: {
	id: string;
}) => {
	const response = await fetch(`${baseUrl}/api/investments/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	return data;
};

export const updateHolding = async ({
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
	const response = await fetch(`${baseUrl}/api/investments/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ tickerSymbol, quantity, averagePrice }),
	});
	const data = await response.json();
	return data;
};

export const getLatestInvestmentProductData = async(tickerSymbol:string) =>{
	const response = await fetch(`${baseUrl}/api/investmentproductdata/${tickerSymbol}`);
	const data = await response.json();
	return data;
}

export const getAllInvestmentProductData = async(latest:boolean = false) =>{
	let response:Response;
	if (latest){
		response = await fetch(`${baseUrl}/api/investmentproductdata?latest=true`);
	}
	else{
		response = await fetch(`${baseUrl}/api/investmentproductdata`);
	}
	const data = await response.json();
	return data;
}

export const uploadFile = async (file:File) => {
	// setUploadingStatus("Uploading the file to AWS S3");

	const response = await fetch(`/api/s3/uploadFile`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: file.name, type: file.type}),
	});

	const data = await response.json();
	const url = data.url;

	// let { data: newData } = await axios.put(url, file, {
	//   headers: {
	// 	 "Content-type": file.type,
	// 	 "Access-Control-Allow-Origin": "*",
	//   },
	// });
	console.log(url)
	console.log(file)

	await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": file.type,
			"Access-Control-Allow-Origin": "*",
		},
		body: file,
	});

	// setUploadedFile(BUCKET_URL + file.name);
	// setFile(null);
 };