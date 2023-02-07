import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/src/lib/prismadb";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions);

	// Rejects if user is not logged in, i,e has no session
	if (!session) {
		res.status(401).json({ message: "You must be logged in." });
		return;
	}

	const { investmentID } = req.query;
	if (!investmentID || Array.isArray(investmentID)) {
		res.status(400).json({ message: "Invalid parameters" });
		return;
	}

	if (req.method === "PATCH") {
		const updatedHolding = await prisma.investment.update({
			where: {
				id: investmentID,
			},
			data: {
				quantity: req.body.quantity,
				averagePrice: req.body.averagePrice,
				tickerSymbol: req.body.tickerSymbol,
			},
		});
		res.status(200).json({ result: updatedHolding });
	} else if (req.method === "DELETE") {
		const deletedHolding = await prisma.investment.delete({
			where: {
				id: investmentID,
			},
		});
		res.status(200).json({ result: deletedHolding });
	} else {
		res.status(405).json({ result: "Method not allowed" });
	}
};

export default handler;
