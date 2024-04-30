// deno-lint-ignore-file no-unused-vars
import Parser from "./frontend/parser.ts";
import Environment, { createGlobalEnv } from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";

/**
const source = await Deno.readTextFile("./test.spl");
for (const token of lexer.tokenize(source)) {
  console.log(token);
}
**/

// repl();
run("./test.txt");

async function run(filename: string) {
  const parser = new Parser();
  const env = createGlobalEnv();

  const input = await Deno.readTextFile(filename);
  const program = parser.produceAST(input);
  const result = evaluate(program, env);
  console.log(result);
}

function repl() {
  const parser = new Parser();
  const env = createGlobalEnv();
  
  // Initialize repl
  console.log("\nRepl v0.1");
  while (true) {
    const input = prompt("> ");

    // Check for no user input or exit keyword.
    if (!input || input?.includes("exit")) {
      Deno.exit(1);
    }

    // Produce ast from source-code
    const program = parser.produceAST(input);

    const result = evaluate(program, env);
    console.log(result);
  }
}
