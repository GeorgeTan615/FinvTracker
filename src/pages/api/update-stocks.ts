import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/src/lib/prismadb";
import { fetchStockQuote } from "@/src/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			const { authorization } = req.headers;
			if (authorization === `Bearer ${process.env.UPDATE_STOCKS_KEY}`) {
				// Get all unique stocks, tickerSymbol is ID thus unique
				const distinctStocks = await prisma.investmentProduct.findMany({
					select:{
						tickerSymbol:true,
					},
					where:{
						type:'STOCK',
					}
				})
				// Fetch latest data for each stock and update in database
				await distinctStocks.map(async(stock)=>{
					try{
						let data = await fetchStockQuote(stock.tickerSymbol)
						data = data['Global Quote']
						const updatedStockData = await prisma.investmentProductData.create({
							data:{
								tickerSymbol: stock.tickerSymbol,
								date: new Date(data["07. latest trading day"]),
								price: parseFloat(data["05. price"]),
								change: parseFloat(data["09. change"]),
								changePercentage: String(data["10. change percent"])
							}
						})
						console.log(`${stock.tickerSymbol} updated sucessfully`)
					}
					catch(err:any){
						console.log(`${stock.tickerSymbol} update failed`)
						console.log(err)
					}
				})
				res.status(200).json({ success: true });
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
