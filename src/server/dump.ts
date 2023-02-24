import fs from "fs/promises";
import path from "path";
import { prisma } from "~/server/db";

const dumpDir = path.dirname("./public/files");

export const dump = async () => {
	const events = await prisma.event.findMany();
	console.log(dumpDir);
	await fs.writeFile(`${dumpDir}/files/data.json`, JSON.stringify(events, null, 2));
};
