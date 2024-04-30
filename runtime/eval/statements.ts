import type { Program, VarDeclaration } from "../../frontend/ast.ts";
import type Environment from "../environment.ts";
import { evaluate } from "../interpreter.ts";
import { MK_NULL, type RuntimeVal } from "../values.ts";

export function eval_program(program: Program, env: Environment): RuntimeVal {
  let lastEvaluated: RuntimeVal = MK_NULL();
  for (const stmt of program.body) {
    lastEvaluated = evaluate(stmt, env);
  }
  return lastEvaluated;
}

export function eval_var_declaration(
  declaration: VarDeclaration,
  env: Environment,
): RuntimeVal {
    const value = declaration.value ? evaluate(declaration.value, env) : MK_NULL();
    env.declareVar(declaration.identifier, value);
}
