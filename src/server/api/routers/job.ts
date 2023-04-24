import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { JobType, Location, RemoteType } from "@prisma/client"

export const jobRouter = createTRPCRouter({
  getTotalJobCount: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.job.count()
  }),
  getInfiniteJobs: publicProcedure
    .input(
      z.object({
        searchTerm: z.string().optional(),
        location: z.nativeEnum(Location).optional(),
        remoteType: z.nativeEnum(RemoteType).optional(),
        jobType: z.nativeEnum(JobType).optional(),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = 5
      const cursor = input.cursor

      const jobs = await ctx.prisma.job.findMany({
        take: limit,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          jobType: input.jobType,
          location: input.location,
          remoteType: input.remoteType,
          title: {
            mode: "insensitive",
            contains:
              input.searchTerm?.toLowerCase() != null && input.searchTerm != ""
                ? input.searchTerm.toLowerCase()
                : undefined,
          },
        },
      })

      const nextCursor = jobs.length < limit ? undefined : jobs[limit - 1]?.id
      return { nextCursor, jobs }
    }),
})
