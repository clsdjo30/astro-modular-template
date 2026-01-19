import readline from "node:readline/promises";

export async function promptForPath(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    const answer = await rl.question("Project path: ");
    return answer.trim();
  } finally {
    rl.close();
  }
}
