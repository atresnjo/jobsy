import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

export const clerkRequestSchema = z.object({
    data: z.object({
        id: z.string(),
    }),
    object: z.string(),
    type: z.string()
})


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const requestMethod = req.method
    if (requestMethod != "POST") {
        return res.status(500)
    }

    const clerkRequest = await clerkRequestSchema.parseAsync(req.body);
    if (clerkRequest.type == "user.created") {
        await prisma?.user.create({
            data: {
                external_provider_id: clerkRequest.data.id,
            }
        })
    }


    return res.status(200).json({})
}

