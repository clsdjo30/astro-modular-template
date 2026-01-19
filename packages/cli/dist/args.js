export function parseArgs(argv) {
    const [, , command, targetPath] = argv;
    return {
        command: command ?? null,
        targetPath: targetPath ?? null
    };
}
