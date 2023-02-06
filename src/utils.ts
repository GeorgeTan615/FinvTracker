import { baseUrl } from "./configs/constants";
import { useQueryClient, QueryClient } from "react-query";
import { months } from "./configs/constants";
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

export const fetchStockQuote = async (stock: string) =>{
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': String(process.env.NEXT_PUBLIC_RAPIDAPI_KEY),
			'X-RapidAPI-Host': String(process.env.NEXT_PUBLIC_RAPIDAPI_HOST)
		}
	};
	try{
		const response = await fetch(`https://alpha-vantage.p.rapidapi.com/query?function=GLOBAL_QUOTE&symbol=${stock}&datatype=json`, options)
		const data = await response.json();
		return data
	}
	catch(err:any){
		return { message: err.message}
	}
}

export const searchStockQuote = async (stock:string) =>{
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': String(process.env.NEXT_PUBLIC_RAPIDAPI_KEY),
			'X-RapidAPI-Host': String(process.env.NEXT_PUBLIC_RAPIDAPI_HOST)
		}
	};
	try{
		const response = await fetch(`https://alpha-vantage.p.rapidapi.com/query?keywords=${stock}&function=SYMBOL_SEARCH&datatype=json`, options)
		const data = await response.json();
		const results:string[] = []
		data.bestMatches?.forEach((match:any)=>{
			results.push(match["1. symbol"])
		})
		return { results }
	}
	catch(err:any){
		return { results: err.message}
	}
}
