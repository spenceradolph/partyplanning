import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
	new: publicProcedure
		.input(
			z.object({
				plannerEmail: z.string(),
				eventName: z.string(),
				kindOfParty: z.string(),
				hadBalloons: z.boolean(),
				hadCake: z.boolean(),
				hadCandy: z.boolean(),
				hadPresents: z.boolean(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const {
				plannerEmail,
				eventName,
				kindOfParty,
				hadBalloons,
				hadCake,
				hadCandy,
				hadPresents,
			} = input;

			// Insert into the DB (and create user if not exists...)
			const newEvent = await ctx.prisma.event.create({
				data: {
					eventName,
					kindOfParty,
					hadBalloons,
					hadCake,
					hadCandy,
					hadPresents,
					planner: {
						connectOrCreate: {
							where: {
								email: plannerEmail,
							},
							create: {
								email: plannerEmail,
							},
						},
					},
				},
				include: {
					planner: true,
				},
			});

			// Get what was inserted
			return { newEvent };
		}),

	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.event.findMany();
	}),
});
