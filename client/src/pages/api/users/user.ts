import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient();

export default withApiAuthRequired(async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession(req, res);
    if (!session || !session.user) {
      return res.status(404).json({ message: 'Not found' });
    }

    const user = session.user;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          given_name: user.given_name,
          family_name: user.family_name,
          nickname: user.nickname,
          name: user.name,
          picture: user.picture,
          locale: user.locale,
          updated_at: new Date(user.updated_at),
          email: user.email,
          email_verified: user.email_verified,
          sub: user.sub,
          sid: user.sid
        },
      });
      console.log(`Added new user ${newUser.name} to the database.`);
      return res.status(200).json(newUser);
    } else {
      console.log(`User ${existingUser.name} already exists in the database.`);
      return res.status(200).json(existingUser);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
