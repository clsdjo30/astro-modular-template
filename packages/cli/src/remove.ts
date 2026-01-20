import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";
import { moduleManifestSchema } from "./manifest.js";
import { removeModuleFromPatchPoint } from "./patch.js";

export interface RemoveResult {
  removedFiles: string[];
  removedPatches: string[];
  warnings: string[];
}

interface RemoveOptions {
  repoRoot: string;
  projectRoot: string;
  moduleName: string;
}

async function fileExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function isOwnedFileModified(
  ownedFilePath: string,
  templateFilePath: string
): Promise<boolean | null> {
  if (!(await fileExists(templateFilePath))) {
    return null;
  }
  const [ownedContent, templateContent] = await Promise.all([
    fs.readFile(ownedFilePath, "utf-8"),
    fs.readFile(templateFilePath, "utf-8")
  ]);
  return ownedContent !== templateContent;
}

export async function removeModule({
  repoRoot,
  projectRoot,
  moduleName
}: RemoveOptions): Promise<RemoveResult> {
  const warnings: string[] = [];
  const removedFiles: string[] = [];
  const removedPatches: string[] = [];
  let foundOwned = false;

  const manifestPath = path.join(repoRoot, "packages", "modules", moduleName, "manifest.yaml");
  if (!(await fileExists(manifestPath))) {
    throw new Error(`Module manifest not found: ${moduleName}`);
  }

  const raw = await fs.readFile(manifestPath, "utf-8");
  const manifest = moduleManifestSchema.parse(parse(raw));
  const moduleId = manifest.id;
  const moduleTemplateRoot = path.join(repoRoot, "templates", "modules", moduleName);

  for (const ownedFile of manifest.ownership.files) {
    const targetPath = path.join(projectRoot, ownedFile);
    if (!(await fileExists(targetPath))) {
      warnings.push(`Owned file missing: ${ownedFile}`);
      continue;
    }

    foundOwned = true;
    const templatePath = path.join(moduleTemplateRoot, ownedFile);
    const modified = await isOwnedFileModified(targetPath, templatePath);
    if (modified) {
      warnings.push(`Owned file modified: ${ownedFile}`);
    }

    await fs.unlink(targetPath);
    removedFiles.push(ownedFile);
  }

  for (const patch of manifest.ownership.patches) {
    const targetPath = path.join(projectRoot, patch.target);
    if (!(await fileExists(targetPath))) {
      warnings.push(`Patch target missing: ${patch.target}`);
      continue;
    }

    const content = await fs.readFile(targetPath, "utf-8");
    const result = removeModuleFromPatchPoint(content, patch.marker, moduleId);
    if (result.warning) {
      warnings.push(`${patch.target}: ${result.warning}`);
      continue;
    }

    if (result.removed) {
      foundOwned = true;
      await fs.writeFile(targetPath, result.content);
      removedPatches.push(`${patch.target}#${patch.marker}`);
    }
  }

  if (!foundOwned) {
    warnings.push(`Module ${moduleName} is not installed; nothing to remove.`);
  }

  return { removedFiles, removedPatches, warnings };
}
