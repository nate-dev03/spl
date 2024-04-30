import { Program } from "../../frontend/ast.ts";
import Environment from "../environment.ts";
// biome-ignore lint/style/useImportType: <explanation>
import { MK_NULL, RuntimeVal } from "../values.ts";

export function eval_program(program: Program, env: Environment): RuntimeVal {
    let lastEvaluated: RuntimeVal = MK_NULL();
    for (const stmt of program.body) {
      lastEvaluated = evaluate(stmt, env);
    }
    return lastEvaluated;
  }