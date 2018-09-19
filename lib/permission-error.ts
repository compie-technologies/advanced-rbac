import {Grant} from "./grant";

export class PermissionError extends Error{

    public readonly missingGrants?:Grant[];

    constructor(message: string, missingPermissions?: Grant[]) {
        super(message);
        this.missingGrants = missingPermissions;
    }
}