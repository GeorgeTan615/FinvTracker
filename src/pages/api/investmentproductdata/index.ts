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

	const { latest } = req.query;

	try {
		if (req.method === "GET") {
			if (latest === "true") {
				const result: any = [];
				const investments = await prisma.investment.findMany({
					where: {
						userId: session.user.userId,
					},
				});
				await Promise.all(
					investments?.map(async (investment) => {
						const latestData = await prisma.investmentProductData.findMany({
							orderBy: {
								date: "desc",
							},
							where: {
								tickerSymbol: investment.tickerSymbol,
							},
							take: 2,
						});
						const modifiedData = {
							curr: { ...latestData[0] },
							prev: { ...latestData[1] },
							quantity: investment.quantity,
							averagePrice: investment.averagePrice,
						};
						result.push(modifiedData);
					})
				);
				res.status(200).json({ result: result });
			} else {
				const allData = await prisma.investment.findMany({
					where: {
						userId: session.user.userId,
					},
					include: {
						investmentProduct:{
							include:{
								investmentProductData: true,
							},
						}
				}});
				res.status(200).json({ result: allData });
			}
		} else {
			res.status(405).json({ result: "Method not allowed" });
		}
	} catch (err: any) {
		res.status(500).json({ result: err.message });
	}
};

export default handler;
