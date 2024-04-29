import { NullVal, NumberVal, RuntimeVal, ValueType } from "./value.ts";
import { BinaryExpr, NodeType, NumericLiteral, Stmt } from "../frontend/ast.ts";

function eval_program(program: Program): RuntimeVal {
  let lastEvaluated: RuntimeVal = { type: "null", value: "null"} as NullVal;
}

function eval_binary_expr(binop: BinaryExpr): RuntimeVal {

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
