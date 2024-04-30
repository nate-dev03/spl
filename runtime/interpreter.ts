import type { NullVal, NumberVal, RuntimeVal } from "./value.ts";
import type { BinaryExpr, Identifier, NumericLiteral, Program, Stmt } from "../frontend/ast.ts";
import type Environment from "./environment.ts";

function eval_program(program: Program, env: Environment): RuntimeVal {
  let lastEvaluated: RuntimeVal = { type: "null", value: "null"} as NullVal;
  for (const stmt of program.body) {
    lastEvaluated = evaluate(stmt, env);
  }
  return lastEvaluated;
}

function eval_numeric_binary_expr(lhs: NumberVal, rhs: NumberVal, operator: string): NumberVal {
  let result = 0;

  if (operator === "+") {
    result = lhs.value + rhs.value;
  } else if (operator === "-") {
    result = lhs.value - rhs.value;
  } else if (operator === "*") {
    result = lhs.value * rhs.value;
  } else if (operator === "/") {
    if (rhs.value !== 0) {
      result = lhs.value / rhs.value;
    } else {
      console.error("Invalid: division by zero");
    }
  } else {
    result = lhs.value % rhs.value;
  }

  return { value: result, type: "number" };
}

function eval_binary_expr(binop: BinaryExpr, env: Environment): RuntimeVal {
  const lhs = evaluate(binop.left, env);
  const rhs = evaluate(binop.right, env);

  if(lhs.type == "number" && rhs.type === "number") {
    return eval_numeric_binary_expr(lhs as NumberVal, rhs as NumberVal, binop.operator);
  }

  // One or both are null
  return { type: "null", value: "null" } as NullVal;
}

export function evaluate(astNode: Stmt, env: Environment): RuntimeVal {
  switch (astNode.kind) {
    case "NumericLiteral":
      return {
        type: "number",
        value: ((astNode as NumericLiteral).value),
      } as NumberVal;
    case "NullLiteral":
      return { type: "null", value: "null" } as NullVal;
    case "Identifier":
      return eval_identifier(astNode as Identifier, env);
    case "BinaryExpr":
      return eval_binary_expr(astNode as BinaryExpr, env);
    case "Program":
      return eval_program(astNode as Program, env);

    default:
      console.error("This AST Node as not yet been setup for interpretation.", astNode);
      Deno.exit(1);
  }
}
