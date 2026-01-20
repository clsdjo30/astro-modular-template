export interface ParsedArgs {
  command: string | null;
  targetPath: string | null;
  moduleName: string | null;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const [, , command, targetPath] = argv;
  return {
    command: command ?? null,
    targetPath: command === "create" ? targetPath ?? null : null,
    moduleName: command === "remove" ? targetPath ?? null : null
  };
}
