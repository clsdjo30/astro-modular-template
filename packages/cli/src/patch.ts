export type InsertRule = "append" | "prepend" | "replace";

const beginPrefix = "<!-- @mod:begin ";
const endPrefix = "<!-- @mod:end ";

function markerLine(prefix: string, name: string): string {
  return `${prefix}${name} -->`;
}

function findPatchBounds(
  content: string,
  markerName: string
): { start: number; end: number } {
  const begin = markerLine(beginPrefix, markerName);
  const end = markerLine(endPrefix, markerName);
  const start = content.indexOf(begin);
  const endIndex = content.indexOf(end);
  if (start === -1 || endIndex === -1 || endIndex < start) {
    throw new Error(`Patch point not found or malformed: ${markerName}`);
  }
  return { start, end: endIndex + end.length };
}

function moduleBlockMarker(moduleId: string, edge: "begin" | "end"): string {
  return `<!-- @mod:module ${moduleId} ${edge} -->`;
}

export interface PatchRemovalResult {
  content: string;
  removed: boolean;
  warning?: string;
}

export function insertAtPatchPoint(
  content: string,
  markerName: string,
  insert: InsertRule,
  moduleId: string,
  snippet: string
): string {
  const { start, end } = findPatchBounds(content, markerName);
  const block = content.slice(start, end);
  const begin = markerLine(beginPrefix, markerName);
  const endMarker = markerLine(endPrefix, markerName);

  const moduleBegin = moduleBlockMarker(moduleId, "begin");
  if (block.includes(moduleBegin)) {
    return content;
  }

  const wrappedSnippet = [
    moduleBegin,
    snippet.trimEnd(),
    moduleBlockMarker(moduleId, "end")
  ].join("\n");

  const beginIndex = block.indexOf(begin) + begin.length;
  const endIndex = block.indexOf(endMarker);

  const before = block.slice(0, beginIndex);
  const middle = block.slice(beginIndex, endIndex);
  const after = block.slice(endIndex);

  let newMiddle = middle;
  if (insert === "append") {
    newMiddle = `${middle}\n${wrappedSnippet}\n`;
  } else if (insert === "prepend") {
    newMiddle = `\n${wrappedSnippet}\n${middle}`;
  } else {
    newMiddle = `\n${wrappedSnippet}\n`;
  }

  const newBlock = `${before}${newMiddle}${after}`;
  return content.slice(0, start) + newBlock + content.slice(end);
}

export function removeModuleFromPatchPoint(
  content: string,
  markerName: string,
  moduleId: string
): PatchRemovalResult {
  let bounds: { start: number; end: number };
  try {
    bounds = findPatchBounds(content, markerName);
  } catch (err) {
    return {
      content,
      removed: false,
      warning: err instanceof Error ? err.message : String(err)
    };
  }

  const block = content.slice(bounds.start, bounds.end);
  const moduleBegin = moduleBlockMarker(moduleId, "begin");
  const moduleEnd = moduleBlockMarker(moduleId, "end");

  const beginIndex = block.indexOf(moduleBegin);
  const endIndex = block.indexOf(moduleEnd);
  if (beginIndex === -1 || endIndex === -1 || endIndex < beginIndex) {
    return {
      content,
      removed: false,
      warning: `Module block markers missing or malformed for ${moduleId} in patch point ${markerName}`
    };
  }

  let before = block.slice(0, beginIndex);
  let after = block.slice(endIndex + moduleEnd.length);
  if (before.endsWith("\n") && after.startsWith("\n")) {
    after = after.slice(1);
  }

  const newBlock = before + after;
  const updated = content.slice(0, bounds.start) + newBlock + content.slice(bounds.end);
  return { content: updated, removed: true };
}
