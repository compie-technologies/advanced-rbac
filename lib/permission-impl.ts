import {Permission} from "./permission";
import {Grant} from "./grant";
import {Utils} from "./utils";

export class PermissionImpl implements Permission{

    public readonly granted: boolean;
    public readonly attributes: string[];   // ['*', '!record.id']
    public readonly grant: Grant;

    constructor(granted: boolean, grant?: Grant, attributes?:string[]){
        this.granted = granted;
        this.grant = grant;
        this.attributes = attributes? attributes: [];
    }

    filter(data: any): any{
        return Utils.filterAll(data, this.attributes);
    }

}
