export interface ParsedArgs {
  command: string | null;
  targetPath: string | null;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const [, , command, targetPath] = argv;
  return {
    command: command ?? null,
    targetPath: targetPath ?? null
  };
}
