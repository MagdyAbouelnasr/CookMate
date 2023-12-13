// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../prisma/prisma";

// type Data = {
//   name: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     try {
//       const data = await prisma.post.findMany();
//       return res.status(200).json(data);
//     } catch (error) {
//       return res.status(500).json(error);
//     }
//   }
// }
