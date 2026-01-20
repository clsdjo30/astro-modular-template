import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";
import { moduleManifestSchema } from "./manifest.js";

export interface ModuleDocEntry {
  id: string;
  description: string;
  dependencies: string[];
  conflicts: string[];
  configKeys: string[];
}

export interface GenerateDocsResult {
  entries: ModuleDocEntry[];
  modulesPath: string;
  configPath: string;
}

async function fileExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export async function loadModuleManifests(modulesRoot: string): Promise<ModuleDocEntry[]> {
  const entries = await fs.readdir(modulesRoot, { withFileTypes: true });
  const manifests: ModuleDocEntry[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const manifestPath = path.join(modulesRoot, entry.name, "manifest.yaml");
    if (!(await fileExists(manifestPath))) continue;
    const raw = await fs.readFile(manifestPath, "utf-8");
    const manifest = moduleManifestSchema.parse(parse(raw));
    manifests.push({
      id: manifest.id,
      description: manifest.description,
      dependencies: manifest.dependencies,
      conflicts: manifest.conflicts,
      configKeys: manifest.config?.keys ?? []
    });
  }

  return manifests.sort((a, b) => a.id.localeCompare(b.id));
}

function formatList(items: string[]): string {
  if (items.length === 0) return "(none)";
  return items.map((item) => `\`${item}\``).join(", ");
}

export function renderModulesMarkdown(entries: ModuleDocEntry[]): string {
  const lines = [
    "# Module Catalog",
    "",
    "| Module | Description | Dependencies | Conflicts |",
    "| --- | --- | --- | --- |"
  ];

  for (const entry of entries) {
    lines.push(
      `| \`${entry.id}\` | ${entry.description} | ${formatList(entry.dependencies)} | ${formatList(
        entry.conflicts
      )} |`
    );
  }

  lines.push("");
  return lines.join("\n");
}

export function renderConfigMarkdown(entries: ModuleDocEntry[]): string {
  const lines = ["# Module Configuration", "", "| Module | Config Keys |", "| --- | --- |"];

  for (const entry of entries) {
    lines.push(`| \`${entry.id}\` | ${formatList(entry.configKeys)} |`);
  }

  lines.push("");
  return lines.join("\n");
}

export async function generateDocs(
  repoRoot: string,
  outputDir = path.join(repoRoot, "docs")
): Promise<GenerateDocsResult> {
  const modulesRoot = path.join(repoRoot, "packages", "modules");
  const entries = await loadModuleManifests(modulesRoot);

  await fs.mkdir(outputDir, { recursive: true });
  const modulesPath = path.join(outputDir, "MODULES.md");
  const configPath = path.join(outputDir, "CONFIG.md");

  await fs.writeFile(modulesPath, renderModulesMarkdown(entries));
  await fs.writeFile(configPath, renderConfigMarkdown(entries));

  return { entries, modulesPath, configPath };
}
