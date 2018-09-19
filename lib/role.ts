import {Grant, RequiredGrant} from "./grant";

export interface Role {

    id:string [];
    listGrants():Grant[];
    getGrant(name: string):Grant;
    appendGrant(grant: Grant);
    has(requiredGrant:RequiredGrant):Promise<[Grant,string[]]>;

}