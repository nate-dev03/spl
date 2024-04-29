import { NullVal, NumberVal, RuntimeVal, ValueType } from "./value.ts";
import { BinaryExpr, NodeType, NumericLiteral, Stmt } from "../frontend/ast.ts";

function evaluate_binary_expr(binop: BinaryExpr): RuntimeVal {

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
      return evaluate_binary_expr(astNode as BinaryExpr);

    default:
      console.error("This AST Node as not yet been setup for interpretation.", astNode);
      Deno.exit(1);
  }
}
