import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/src/lib/prismadb";

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': String(process.env.RAPIDAPI_KEY),
		'X-RapidAPI-Host': String(process.env.RAPIDAPI_HOST)
	}
};

fetch('https://alpha-vantage.p.rapidapi.com/query?function=GLOBAL_QUOTE&symbol=MSFT&datatype=json', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			const { authorization } = req.headers;
			if (authorization === `Bearer ${process.env.UPDATE_STOCKS_KEY}`) {
				// let r = (Math.random() + 1).toString(36).substring(7);
				// const updatedStock = await prisma.stock.create({
				// 	data: {
				// 		tickerSymbol: r,
				// 		name: "test",
				// 		quantity: 10.0,
				// 		averagePrice: 280.0,
				// 		userId: "cldkh33e1000oun4sef88n16g",
				// 	},
				// });
				const distinctStocks = await prisma.stock.findMany({
					distinct: ['tickerSymbol'],
					select: {
					  tickerSymbol: true,
					},
				 })
				res.status(200).json({ success: distinctStocks });
			} else {
				res.status(401).json({ success: false });
			}
		} catch (err: any) {
			res.status(500).json({ statusCode: 500, message: err.message });
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}
