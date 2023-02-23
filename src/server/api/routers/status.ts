import type { Event } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const getNthMonth = (months: number) => {
	const d = new Date();
	d.setMonth(d.getMonth() - months);
	d.setHours(0, 0, 0, 0);
	return d;
};

// In this example
// we only care that the planners did
// 1 events with candy in the last month
// or 3 events with candy in the last 3 months
const isGoodOrBad = (events: Event[]): boolean => {
	const numCandyInOneMonth = events.filter(({ date }) => date > getNthMonth(1)).filter(({ hadCandy }) => hadCandy).length;

	if (numCandyInOneMonth >= 1) return true;

	const numCandyInThreeMonth = events.filter(({ date }) => date > getNthMonth(3)).filter(({ hadCandy }) => hadCandy).length;

	if (numCandyInThreeMonth >= 3) return true;

	return false;
};

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
				numEvents: planner.Event.length,
			});
		}

		return plannerStatuses;
	}),
});
