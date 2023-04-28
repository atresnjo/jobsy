import { createTRPCRouter } from "./trpc"
import { jobRouter } from "./routers/job"
import { userRouter } from "./routers/user"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  jobRouter: jobRouter,
  userRouter: userRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
