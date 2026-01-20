import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { generateDocs } from "../src/docs.js";

async function exists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

describe("docs generation integration", () => {
  it("generates module docs from real manifests", async () => {
    const repoRoot = path.resolve(process.cwd(), "..", "..");
    const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "astro-docs-"));
    const outputDir = path.join(tempRoot, "docs");

    const result = await generateDocs(repoRoot, outputDir);

    expect(await exists(result.modulesPath)).toBe(true);
    expect(await exists(result.configPath)).toBe(true);

    const modulesContent = await fs.readFile(result.modulesPath, "utf-8");
    expect(modulesContent).toContain("example-module");
  });
});
