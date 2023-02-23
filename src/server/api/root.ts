import { createTRPCRouter } from "~/server/api/trpc";
import { eventRouter } from "~/server/api/routers/event";
import { statusRouter } from "~/server/api/routers/status";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	events: eventRouter,
	status: statusRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
