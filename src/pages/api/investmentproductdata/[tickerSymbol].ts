import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/src/lib/prismadb";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { fetchStockQuote } from "@/src/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions);

	// Rejects if user is not logged in, i,e has no session
	if (!session) {
		res.status(401).json({ message: "You must be logged in." });
		return;
	}

	const { tickerSymbol } = req.query;
	if (!tickerSymbol || Array.isArray(tickerSymbol)) {
		res.status(400).json({ message: "Invalid parameters" });
		return;
	}

	try {
		if (req.method === "GET") {
			const latestData = await prisma.investmentProductData.findMany({
				where: {
					tickerSymbol: tickerSymbol,
				},
				orderBy: {
					date: "desc",
				},
				take: 1,
			});
			if (latestData && latestData.length > 0){
				res.status(200).json({ result: latestData });
				return;
			}

			else{
				let data = await fetchStockQuote(tickerSymbol)
				data = data['Global Quote']

				const latestData = await prisma.investmentProductData.create({
					data:{
						tickerSymbol: tickerSymbol,
						date: new Date(data["07. latest trading day"]),
						price: parseFloat(data["05. price"]),
						change: parseFloat(data["09. change"]),
						changePercentage: String(data["10. change percent"])
					}
				})
				// Pass the data into array to keep it consistent as findMany returns array
				res.status(200).json({ result: [latestData] });
				return;
			}

		} else {
			res.status(405).json({ result: "Method not allowed" });
		}
	} catch (err: any) {
		res.status(500).json({ result: err.message });
	}
};

export default handler;
