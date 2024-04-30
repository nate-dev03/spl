import type { RuntimeVal } from "./value.ts";


export default class Environment {
    
    private parent?: Environment;
    private variables: Map<string, RuntimeVal>;

    constructor(parentENV?: Environment) {
        this.parent = parentENV;
        this.variables = new Map();
    }
}