export type ValueType = "null" | "number";

export interface RuntimeVal {
  type: ValueType;
}

export interface NullVal extends RuntimeVal {
  type: "null";
  value: null;
}

export function MK_NULL() {
  return { type: "null", value: null } as NullVal;
}

export interface BoolVal extends RuntimeVal {
  type: boolean;
  value: null;
}

export function MK_BOOL() {
  return { type: "null", value: null } as NullVal;
}

export interface NumberVal extends RuntimeVal {
  type: "number";
  value: number;
}

export function MK_NUMBER(n = 0) {
  return { type: "number", value: n } as NumberVal;
}
