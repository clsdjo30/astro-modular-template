import { describe, expect, it } from "vitest";
import { parseArgs } from "../src/args.js";

describe("parseArgs", () => {
  it("parses command and path", () => {
    const result = parseArgs(["node", "cli", "create", "my-app"]);
    expect(result).toEqual({ command: "create", targetPath: "my-app", moduleName: null });
  });

  it("parses remove module name", () => {
    const result = parseArgs(["node", "cli", "remove", "blog"]);
    expect(result).toEqual({ command: "remove", targetPath: null, moduleName: "blog" });
  });

  it("parses docs command without args", () => {
    const result = parseArgs(["node", "cli", "docs"]);
    expect(result).toEqual({ command: "docs", targetPath: null, moduleName: null });
  });

  it("returns nulls when missing args", () => {
    const result = parseArgs(["node", "cli"]);
    expect(result).toEqual({ command: null, targetPath: null, moduleName: null });
  });
});
