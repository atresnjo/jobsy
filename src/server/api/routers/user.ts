import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const userRouter = createTRPCRouter({
    getLikedJobs: protectedProcedure.query(async ({ ctx }) => {
        const user = await ctx.prisma.user.findFirst({ where: { external_provider_id: ctx.user.id }, include: { likedJobs: { select: { job: true, jobId: true, userId: true } } } })
        return user?.likedJobs
    }),
    unlikeJob: protectedProcedure
        .input(
            z.object({
                jobId: z.number(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.findFirst({
                where: { external_provider_id: ctx.user?.id }
            })

            await ctx.prisma.likedJobs.delete({
                where: {
                    jobId_userId: {
                        jobId: input.jobId,
                        userId: user!.id
                    }
                }
            })

        }),
    likeJob: protectedProcedure
        .input(
            z.object({
                jobId: z.number(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.findFirst({
                where: { external_provider_id: ctx.user?.id }
            })

            var likeExists = await ctx.prisma.likedJobs.count({
                where: {
                    jobId: input.jobId,
                    userId: user!.id
                }
            })


            if (likeExists) {
                return
            }

            await ctx.prisma.likedJobs.create({
                data: {
                    jobId: input.jobId,
                    userId: user!.id
                }
            })

        })
})
