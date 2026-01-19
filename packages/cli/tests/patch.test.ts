import { describe, expect, it } from "vitest";
import { insertAtPatchPoint } from "../src/patch.js";

const base = `<!doctype html>
<head>
<!-- @mod:begin head-meta -->
<!-- @mod:end head-meta -->
</head>`;

describe("insertAtPatchPoint", () => {
  it("appends content inside a patch point", () => {
    const result = insertAtPatchPoint(base, "head-meta", "append", "example", "<meta />");
    expect(result).toContain("<!-- @mod:module example begin -->");
    expect(result).toContain("<meta />");
    expect(result).toContain("<!-- @mod:module example end -->");
  });

  it("is idempotent for the same module id", () => {
    const once = insertAtPatchPoint(base, "head-meta", "append", "example", "<meta />");
    const twice = insertAtPatchPoint(once, "head-meta", "append", "example", "<meta />");
    expect(twice).toBe(once);
  });

  it("throws when patch point is missing", () => {
    expect(() =>
      insertAtPatchPoint(base, "missing", "append", "example", "<meta />")
    ).toThrow(/Patch point not found/);
  });
});
