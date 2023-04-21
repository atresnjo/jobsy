import { createTRPCRouter } from "./trpc"
import { jobRouter } from "./routers/job"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  jobRouter: jobRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
