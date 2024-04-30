import type { RuntimeVal } from "./value.ts";


export default class Environment {
    
    private parent?: Environment;
    private variables: Map<string, RuntimeVal>;

    constructor(parentENV?: Environment) {
        this.parent = parentENV;
        this.variables = new Map();
    }

    public declareVar(varname: string, value: RuntimeVal): RuntimeVal {
        if (this.variables.has(varname)) {
            
        }
    }
}