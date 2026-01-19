import { ZodSchema } from "zod";

export type InsertRule = "append" | "prepend" | "replace";

export interface PatchInsertion {
  target: string;
  insert: InsertRule;
  marker: string;
}

export interface Ownership {
  files: string[];
  patches: PatchInsertion[];
}

export interface ManifestConfig {
  keys: string[];
}

export interface ModuleManifest {
  id: string;
  description: string;
  dependencies: string[];
  conflicts: string[];
  ownership: Ownership;
  config: ManifestConfig;
}

export const moduleManifestSchema: ZodSchema<ModuleManifest>;
