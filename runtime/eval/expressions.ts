import { AssignmentExpr, BinaryExpr, Identifier } from "../../frontend/ast.ts";
import Environment from "../environment.ts";
import { evaluate } from "../interpreter.ts";
import { NumberVal, RuntimeVal, MK_NULL } from "../values.ts";

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
  
  export function eval_binary_expr(binop: BinaryExpr, env: Environment): RuntimeVal {
    const lhs = evaluate(binop.left, env);
    const rhs = evaluate(binop.right, env);
  
    if(lhs.type === "number" && rhs.type === "number") {
      return eval_numeric_binary_expr(lhs as NumberVal, rhs as NumberVal, binop.operator);
    }
  
    // One or both are null
    return MK_NULL();
  }
  
export function eval_identifier(ident: Identifier, env: Environment): RuntimeVal {
    const val = env.lookupVar(ident.symbol);
    return val;
}

export function eval_assignment(node: AssignmentExpr, env: Environment): RuntimeVal {
  if (node.assigne.kind !== "Identifier") {
    throw `Invalid `
}
