import { Program } from "../../frontend/ast.ts";
import type Environment from "../environment.ts";
import { MK_NULL, type RuntimeVal } from "../values.ts";

export function eval_program(program: Program, env: Environment): RuntimeVal {
    let lastEvaluated: RuntimeVal = MK_NULL();
    for (const stmt of program.body) {
      lastEvaluated = evaluate(stmt, env);
    }
    return lastEvaluated;
  }