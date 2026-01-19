import fs from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { moduleManifestSchema } from "../src/manifest.js";
import { insertAtPatchPoint } from "../src/patch.js";

describe("patch integration", () => {
  it("validates a YAML manifest and applies a patch", async () => {
    const repoRoot = path.resolve(process.cwd(), "..", "..");
    const manifestPath = path.join(repoRoot, "packages", "modules", "example", "manifest.yaml");
    const raw = await fs.readFile(manifestPath, "utf-8");
    const manifest = moduleManifestSchema.parse(parse(raw));

    const base = `<!doctype html>
<head>
<!-- @mod:begin head-meta -->
<!-- @mod:end head-meta -->
</head>`;

    const patched = insertAtPatchPoint(
      base,
      manifest.ownership.patches[0].marker,
      manifest.ownership.patches[0].insert,
      manifest.id,
      "<meta />"
    );

    expect(patched).toContain(`<!-- @mod:module ${manifest.id} begin -->`);
  });
});
