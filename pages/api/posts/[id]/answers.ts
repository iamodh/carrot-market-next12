import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;
  if (id) {
    const newAnswer = await client.answer.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +id.toString(),
          },
        },
        answer,
      },
    });

    res.status(200).json({ ok: true, newAnswer });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: true })
);
