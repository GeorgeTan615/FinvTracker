import type { NextApiRequest, NextApiResponse } from "next";
import prisma  from "../../lib/prismadb";
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

const handler = async (req:NextApiRequest, res:NextApiResponse) =>{
	if (req.method === 'POST'){
		const session = await unstable_getServerSession(req, res, authOptions)

		if (!session) {
			res.status(401).json({ message: "You must be logged in." });
			return;
		 }
		const transaction = await prisma.transaction.create({
			data:{
				description: req.body.description,
				amount: req.body.amount,
				userId: String(session.user.id),
			}
		})
		res.status(200).json({transaction})
	}
	else{
		res.status(405).json({result: "Method not allowed"})
	}
}

export default handler