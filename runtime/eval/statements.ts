import Environment from "../environment.ts";
import { MK_NULL } from "../values.ts";

function eval_program(program: Program, env: Environment): RuntimeVal {
    let lastEvaluated: RuntimeVal = MK_NULL();
    for (const stmt of program.body) {
      lastEvaluated = evaluate(stmt, env);
    }
    return lastEvaluated;
  }