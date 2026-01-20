import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { moduleManifestSchema } from "../src/manifest.js";
import { removeModule } from "../src/remove.js";

async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

describe("removeModule integration", () => {
  it("removes owned files and patch insertions only", async () => {
    const repoRoot = path.resolve(process.cwd(), "..", "..");
    const manifestPath = path.join(repoRoot, "packages", "modules", "example", "manifest.yaml");
    const raw = await fs.readFile(manifestPath, "utf-8");
    const manifest = moduleManifestSchema.parse(parse(raw));

    const tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), "astro-remove-"));
    const projectRoot = path.join(tmpRoot, "site");
    await fs.mkdir(path.join(projectRoot, "src", "pages"), { recursive: true });
    await fs.mkdir(path.join(projectRoot, "src", "layouts"), { recursive: true });

    const ownedFile = path.join(projectRoot, manifest.ownership.files[0]);
    await fs.writeFile(ownedFile, "<div>owned</div>");

    const patchTarget = path.join(projectRoot, manifest.ownership.patches[0].target);
    const marker = manifest.ownership.patches[0].marker;
    const moduleId = manifest.id;
    const patchContent = `<!doctype html>
<head>
<!-- @mod:begin ${marker} -->
<!-- @mod:module ${moduleId} begin -->
<meta />
<!-- @mod:module ${moduleId} end -->
<!-- @mod:end ${marker} -->
</head>`;
    await fs.writeFile(patchTarget, patchContent);

    const result = await removeModule({ repoRoot, projectRoot, moduleName: "example" });

    expect(result.removedFiles).toContain(manifest.ownership.files[0]);
    expect(await exists(ownedFile)).toBe(false);

    const updated = await fs.readFile(patchTarget, "utf-8");
    expect(updated).not.toContain(`@mod:module ${moduleId} begin`);
  });

  it("warns and no-ops when the module is not installed", async () => {
    const repoRoot = path.resolve(process.cwd(), "..", "..");
    const tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), "astro-remove-"));
    const projectRoot = path.join(tmpRoot, "site");
    await fs.mkdir(projectRoot, { recursive: true });

    const result = await removeModule({ repoRoot, projectRoot, moduleName: "example" });

    expect(result.removedFiles).toHaveLength(0);
    expect(result.removedPatches).toHaveLength(0);
    expect(result.warnings.some((warning) => warning.includes("not installed"))).toBe(true);
  });
});
