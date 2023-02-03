import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/src/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			const { authorization } = req.headers;
			if (authorization === `Bearer ${process.env.UPDATE_STOCKS_KEY}`) {
				const updatedStock = await prisma.stock.create({
					data: {
						tickerSymbol: "test",
						name: "test",
						quantity: 10.0,
						averagePrice: 280.0,
						userId: "cldkh33e1000oun4sef88n16g",
					},
				});
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
