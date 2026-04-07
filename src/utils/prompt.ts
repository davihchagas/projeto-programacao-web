import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

export async function ask(question: string): Promise<string> {
  const answer = await rl.question(question);
  return answer.trim();
}

export async function pause(message = "\n(z) Voltar: "): Promise<void> {
  while (true) {
    const answer = await ask(message);

    if (answer.toLowerCase() === "z") {
      return;
    }

    console.log("Opção inválida. Digite apenas (z) para voltar.");
  }
}

export function closePrompt(): void {
  rl.close();
}