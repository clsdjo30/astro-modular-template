import { describe, expect, it } from "vitest";
import { removeModuleFromPatchPoint } from "../src/patch.js";

const base = `<!doctype html>
<head>
<!-- @mod:begin head-meta -->
<!-- @mod:module example begin -->
<meta />
<!-- @mod:module example end -->
<!-- @mod:end head-meta -->
</head>`;

describe("removeModuleFromPatchPoint", () => {
  it("removes a module block inside a patch point", () => {
    const result = removeModuleFromPatchPoint(base, "head-meta", "example");
    expect(result.removed).toBe(true);
    expect(result.content).not.toContain("<!-- @mod:module example begin -->");
    expect(result.content).toContain("<!-- @mod:begin head-meta -->");
  });

  it("warns when module block markers are missing", () => {
    const missingBlock = `<!doctype html>
<head>
<!-- @mod:begin head-meta -->
<!-- @mod:end head-meta -->
</head>`;
    const result = removeModuleFromPatchPoint(missingBlock, "head-meta", "example");
    expect(result.removed).toBe(false);
    expect(result.warning).toMatch(/Module block markers missing/);
  });

  it("warns when the patch point is missing", () => {
    const result = removeModuleFromPatchPoint("<html></html>", "head-meta", "example");
    expect(result.removed).toBe(false);
    expect(result.warning).toMatch(/Patch point not found/);
  });
});
