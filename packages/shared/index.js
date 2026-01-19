import { z } from "zod";

export const moduleManifestSchema = z.object({
  id: z.string().min(1),
  description: z.string().min(1),
  dependencies: z.array(z.string()).default([]),
  conflicts: z.array(z.string()).default([]),
  ownership: z.object({
    files: z.array(z.string()).default([]),
    patches: z
      .array(
        z.object({
          target: z.string().min(1),
          insert: z.enum(["append", "prepend", "replace"]),
          marker: z.string().min(1)
        })
      )
      .default([])
  }),
  config: z
    .object({
      keys: z.array(z.string()).default([])
    })
    .default({ keys: [] })
});
