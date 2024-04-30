import { type NumberVal, type RuntimeVal } from "./values.ts";
import type {
AssignmentExpr,
  BinaryExpr,
  Identifier,
  NumericLiteral,
  Program,
  Stmt,
  VarDeclaration,
} from "../frontend/ast.ts";
import type Environment from "./environment.ts";
import { eval_program, eval_var_declaration } from "./eval/statements.ts";
import {
eval_assignment,
  eval_binary_expr,
  eval_identifier,
  eval_object_expr,
} from "./eval/expressions.ts";

export function evaluate(astNode: Stmt, env: Environment): RuntimeVal {
  switch (astNode.kind) {
    case "NumericLiteral":
      return {
        type: "number",
        value: ((astNode as NumericLiteral).value),
      } as NumberVal;
    case "Identifier":
      return eval_identifier(astNode as Identifier, env);
    case "ObjectLiteral":
      return eval_object_expr()
    case "AssignmentExpr":
      return eval_assignment(astNode as AssignmentExpr, env);
    case "BinaryExpr":
      return eval_binary_expr(astNode as BinaryExpr, env);
    case "Program":
      return eval_program(astNode as Program, env);

    // Handle statements
    case "VarDeclaration":
      return eval_var_declaration(astNode as VarDeclaration, env);
    default:
      console.error(
        "This AST Node as not yet been setup for interpretation.",
        astNode,
      );
      Deno.exit(1);
  }
}
