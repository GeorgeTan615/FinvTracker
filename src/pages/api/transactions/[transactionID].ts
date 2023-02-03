import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/src/lib/prismadb";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

const handler = async(req:NextApiRequest,res:NextApiResponse) =>{
	const session = await unstable_getServerSession(req, res, authOptions);

	// Rejects if user is not logged in, i,e has no session
	if (!session) {
		res.status(401).json({ message: "You must be logged in." });
		return;
	}

	const { transactionID } = req.query;
	if (Array.isArray(transactionID)){
		res.status(400).json({ message: "Invalid parameters" });
		return;
	}

	if (req.method === 'PATCH'){
		const updatedTransaction = await prisma.transaction.update({
			where: {
			  id: transactionID,
			},
			data: {
				description: req.body.description,
				amount: req.body.amount,
				category: req.body.category,
				transactionType: req.body.transactionType,
			},
		 })
		 res.status(200).json({ result: updatedTransaction });
	}
	else if(req.method === 'DELETE'){
		const deletedTransaction = await prisma.transaction.delete({
			where: {
				id: transactionID
			},
		 })
		 res.status(200).json({ result: deletedTransaction });
	}
	else{
		res.status(405).json({ result: "Method not allowed" });
	}
}

export default handler;