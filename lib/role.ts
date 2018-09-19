import {Grant, RequiredGrant} from "./grant";

export interface Role {

    id:string [];
    listGrants():Grant[];
    has(requiredGrant:RequiredGrant):Promise<[Grant,string[]]>;

}