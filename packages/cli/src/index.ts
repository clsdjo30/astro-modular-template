import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "./args.js";
import { promptForPath } from "./prompt.js";
import { createProject } from "./create.js";

function getRepoRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, "..", "..", "..");
}

function getTemplateDir(): string {
  return path.join(getRepoRoot(), "templates", "base");
}

async function main(): Promise<void> {
  const { command, targetPath } = parseArgs(process.argv);

  if (command !== "create") {
    console.error("Usage: astro-template create <path>");
    process.exit(1);
  }

  const resolvedPath = targetPath ?? (await promptForPath());
  if (!resolvedPath) {
    console.error("Project path is required.");
    process.exit(1);
  }

  const templateDir = getTemplateDir();
  const result = await createProject(templateDir, resolvedPath);

  console.log(`Created project at ${result.targetPath}`);
  console.log("Next steps:");
  console.log(`  cd ${result.targetPath}`);
  console.log("  pnpm install");
  console.log("  pnpm lint");
  console.log("  pnpm typecheck");
  console.log("  pnpm test");
  console.log("  pnpm build");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
