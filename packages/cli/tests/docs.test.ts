import { describe, expect, it } from "vitest";
import { renderConfigMarkdown, renderModulesMarkdown } from "../src/docs.js";

describe("docs renderers", () => {
  it("renders a modules catalog with dependencies and conflicts", () => {
    const output = renderModulesMarkdown([
      {
        id: "example",
        description: "Example module",
        dependencies: ["base"],
        conflicts: ["legacy"],
        configKeys: ["modules.example.enabled"]
      }
    ]);

    expect(output).toContain("# Module Catalog");
    expect(output).toContain("`example`");
    expect(output).toContain("`base`");
    expect(output).toContain("`legacy`");
  });

  it("renders a config guide with module keys", () => {
    const output = renderConfigMarkdown([
      {
        id: "example",
        description: "Example module",
        dependencies: [],
        conflicts: [],
        configKeys: ["modules.example.enabled"]
      }
    ]);

    expect(output).toContain("# Module Configuration");
    expect(output).toContain("`modules.example.enabled`");
  });
});
