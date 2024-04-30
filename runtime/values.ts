export type ValueType = "null" | "number";

export interface RuntimeVal {
  type: ValueType;
}

export interface NullVal extends RuntimeVal {
  type: "null";
  value: null;
}

export function MK_NULL(n = 0) {
  return { type: "null", value: n } as NumberVal;
}

export interface NumberVal extends RuntimeVal {
  type: "number";
  value: number;
}

export function MK_NUMBER(n = 0) {
  return { type: "number", value: n } as NumberVal;
}