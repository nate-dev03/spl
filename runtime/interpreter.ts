import { NullVal, NumberVal, RuntimeVal, ValueType } from "./value.ts";
import { BinaryExpr, NumericLiteral, Program, Stmt } from "../frontend/ast.ts";

function eval_program(program: Program): RuntimeVal {
  let lastEvaluated: RuntimeVal = { type: "null", value: "null"} as NullVal;
  for (const stmt of program.body) {
    lastEvaluated = evaluate(stmt);
  }
  return lastEvaluated;
}

function eval_numeric_binary_expr(lhs: NumberVal, rhs: NumberVal, operator: string): NumberVal {
  let result: number;

  if (operator == "+") {
    result = lhs.value + rhs.value;
  } else if (operator == "-") {
    result = lhs.value - rhs.value;
  } else if (operator == "*") {
    result = lhs.value * rhs.value;
  } else if (operator == "/") {
    if (rhs.value != 0) {
      result = lhs.value / rhs.value;
    } else {
      console.error("Invalid: division by zero");
    }
  } else {
    result = lhs.value % rhs.value;
  }

  return { value: result, type: "number" };
}

function eval_binary_expr(binop: BinaryExpr): RuntimeVal {
  const lhs = evaluate(binop.left);
  const rhs = evaluate(binop.right);

  if(lhs.type == "number" && rhs.type == "number") {
    return eval_numeric_binary_expr(lhs as NumberVal, rhs as NumberVal, binop.operator);
  }

  // One or both are null
  return { type: "null", value: "null" } as NullVal;
}

export function evaluate(astNode: Stmt): RuntimeVal {
  switch (astNode.kind) {
    case "NumericLiteral":
      return {
        type: "number",
        value: ((astNode as NumericLiteral).value),
      } as NumberVal;
    case "NullLiteral":
      return { type: "null", value: "null" } as NullVal;
    case "BinaryExpr":
      return eval_binary_expr(astNode as BinaryExpr);
    case "Program":
      return eval_program(astNode as Program);

    default:
      console.error("This AST Node as not yet been setup for interpretation.", astNode);
      Deno.exit(1);
  }
}
