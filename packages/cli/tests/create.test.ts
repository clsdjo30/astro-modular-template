import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { createProject } from "../src/create.js";

async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

describe("createProject", () => {
  it("copies base template into target directory", async () => {
    const tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), "astro-base-"));
    const target = path.join(tmpRoot, "my-site");
    const repoRoot = path.resolve(process.cwd(), "..", "..");
    const templateDir = path.join(repoRoot, "templates", "base");

    const result = await createProject(templateDir, target);

    expect(result.targetPath).toBe(target);
    expect(await exists(path.join(target, "package.json"))).toBe(true);
    expect(await exists(path.join(target, "astro.config.mjs"))).toBe(true);
    expect(await exists(path.join(target, "src", "pages", "index.astro"))).toBe(true);
  });
});
