import fs from "fs/promises";
import path from "path";
import { prisma } from "~/server/db";

const dumpDir = path.dirname("./public/files");

// Reference seeding for how to programatically re-insert the json back into the database
// https://gitlab.com/spenceradolph/nexttl_app/-/blob/main/packages/database/src/seed.ts

export const dump = async () => {
	const events = await prisma.event.findMany();
	console.log(dumpDir);
	await fs.writeFile(`${dumpDir}/files/data.json`, JSON.stringify(events, null, 2));
};
