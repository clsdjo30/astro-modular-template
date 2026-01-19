import fs from "node:fs/promises";
import path from "node:path";
const DEFAULT_IGNORES = new Set(["node_modules"]);
async function copyDir(source, destination, ignores = DEFAULT_IGNORES) {
    await fs.mkdir(destination, { recursive: true });
    const entries = await fs.readdir(source, { withFileTypes: true });
    for (const entry of entries) {
        if (ignores.has(entry.name))
            continue;
        const src = path.join(source, entry.name);
        const dest = path.join(destination, entry.name);
        if (entry.isDirectory()) {
            await copyDir(src, dest, ignores);
        }
        else if (entry.isFile()) {
            await fs.copyFile(src, dest);
        }
    }
}
export async function copyTemplate(templateDir, targetDir) {
    await copyDir(templateDir, targetDir);
}
