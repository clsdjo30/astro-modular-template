import fs from "node:fs/promises";
import path from "node:path";
import { copyTemplate } from "./template.js";
export async function createProject(templateDir, targetPath) {
    const absoluteTarget = path.resolve(process.cwd(), targetPath);
    try {
        await fs.access(absoluteTarget);
        throw new Error(`Target path already exists: ${absoluteTarget}`);
    }
    catch (err) {
        if (!(err instanceof Error) || !("code" in err) || err.code !== "ENOENT") {
            throw err;
        }
    }
    await copyTemplate(templateDir, absoluteTarget);
    return { targetPath: absoluteTarget };
}
