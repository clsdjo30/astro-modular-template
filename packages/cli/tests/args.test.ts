import { describe, expect, it } from "vitest";
import { parseArgs } from "../src/args.js";

describe("parseArgs", () => {
  it("parses command and path", () => {
    const result = parseArgs(["node", "cli", "create", "my-app"]);
    expect(result).toEqual({ command: "create", targetPath: "my-app" });
  });

  it("returns nulls when missing args", () => {
    const result = parseArgs(["node", "cli"]);
    expect(result).toEqual({ command: null, targetPath: null });
  });
});
