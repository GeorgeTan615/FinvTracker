import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/src/lib/prismadb";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { uploadFile } from "@/src/utils";
import { S3Url } from "@/src/configs/constants";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions);

	// Rejects if user is not logged in, i,e has no session
	if (!session) {
		res.status(401).json({ message: "You must be logged in." });
		return;
	}
	try{
		if (req.method === "POST") {
			const transactionData = {
				description: req.body.description,
				amount: req.body.amount,
				category: req.body.category,
				userId: String(session.user.id),
				transactionType: req.body.transactionType,
				image:"",
			};

			if (req.body.fileName !== ""){
				transactionData.image = `${S3Url}/${req.body.fileName}`

			}
			const transaction = await prisma.transaction.create({
				data: transactionData
			});
			res.status(200).json({ result: transaction });
	
		} else if (req.method == "GET") {
			const transactions = await prisma.transaction.findMany({
				where: {
					userId: String(session.user.id),
				},
				orderBy:[
					{
						createdAt: 'desc',
					}
				]
			});
			res.status(200).json({ result: transactions });
		} else {
			res.status(405).json({ result: "Method not allowed" });
		}
	}
	catch(err:any){
		console.log(err.message)
		res.status(500).json({ result: err.message });
	}
};

export default handler;
