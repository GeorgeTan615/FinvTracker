import prisma from "@/src/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async(req:NextApiRequest,res:NextApiResponse) =>{
	const session = await unstable_getServerSession(req, res, authOptions);

	// Rejects if user is not logged in, i,e has no session
	if (!session) {
		res.status(401).json({ message: "You must be logged in." });
		return;
	}
	try{
		if (req.method === "POST") {
			const ifTickerExists = await prisma.investmentProduct.findUnique({
				where: {
				  tickerSymbol: req.body.tickerSymbol,
				},
			 });
			
			 if (!ifTickerExists){
				await prisma.investmentProduct.create({
					data: {
						tickerSymbol: req.body.tickerSymbol,
						type: req.body.investmentProduct
					},
				});
			 }
	
			const investment = await prisma.investment.create({
				data: {
					quantity: req.body.quantity,
					averagePrice: req.body.averagePrice,
					tickerSymbol: req.body.tickerSymbol,
					userId: String(session.user.id),
				},
			});
			res.status(200).json({ result: investment });
	
		}
		else if (req.method === 'GET'){
			const holdings = await prisma.investment.findMany({
				where: {
					userId: String(session.user.id),
				},
			});
			res.status(200).json({ result: holdings });
		}
		else {
			res.status(405).json({ result: "Method not allowed" });
		}
	}
	catch(err:any){
		res.status(500).json({ result: "Failed", message: err.message });
	}
}

export default handler;