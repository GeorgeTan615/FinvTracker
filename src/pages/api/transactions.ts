import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions);

	// Rejects if user is not logged in, i,e has no session
	if (!session) {
		res.status(401).json({ message: "You must be logged in." });
		return;
	}

	if (req.method === "POST") {
		const transaction = await prisma.transaction.create({
			data: {
				description: req.body.description,
				amount: req.body.amount,
				category: req.body.category,
				userId: String(session.user.id),
				transactionType: req.body.transactionType,
			},
		});
		res.status(200).json({ transaction });

	} else if (req.method == "GET") {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId: String(session.user.id),
			}
		});
		res.status(200).json({ transactions });
	} else {
		res.status(405).json({ result: "Method not allowed" });
	}
};

export default handler;
