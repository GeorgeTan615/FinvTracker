import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/src/lib/prismadb";
import { authOptions } from "../../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions);

	if (!session) {
		res.status(401).json({ message: "You must be logged in." });
		return;
	}

	if (req.method === "GET") {
		const { type, isData } = req.query;
		if (type !== "income" && type !== "expense") {
			res.status(400).json({ message: "Invalid parameters" });
			return;
		}

		else{
			// If user specify isData as true, return aggregation for the transaction type
			if (isData && isData === 'true'){
				const transactionType = type[0].toUpperCase() + type.substring(1);
				const transactionsData = await prisma.transaction.groupBy({
					by:['category'],
					_sum:{
						amount:true,
					},
					where:{
						userId:session.user.userId,
						transactionType:transactionType,
					}
				})
				res.status(200).json({ result: transactionsData });
			}
			// If not, just return all transactions of the transaction type
			else{
				const transactionType = type[0].toUpperCase() + type.substring(1);
				const transactions = await prisma.transaction.findMany({
					where:{
						userId:session.user.userId,
						transactionType:transactionType,
					}
				})
				res.status(200).json({ result: transactions });
			}
		}
	} else {
		res.status(405).json({ result: "Method not allowed" });
	}
};

export default handler;
