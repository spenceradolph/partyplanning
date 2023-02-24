import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { dump } from "~/server/dump";
import { isGoodOrBad } from "~/server/formulas";

export const statusRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const planners = await ctx.prisma.planner.findMany({
			include: { Event: true },
		});

		const plannerStatuses = [];

		for (const planner of planners) {
			plannerStatuses.push({
				email: planner.email,
				status: isGoodOrBad(planner.Event),
				numEvents: planner.Event.length, // this could be any statistic*
			});
		}

		// update the dump file if needed
		await dump();

		return plannerStatuses;
	}),
});
