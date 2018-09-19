import {Grant, Possession, RequiredGrant} from "./grant";

export abstract class RoleBase{

    public readonly grantMap: Map<string,Grant>;

    public listGrants():Grant[]{
        return Array.from(this.grantMap.values());
    }

    async has(requiredGrant:RequiredGrant):Promise<[Grant,string[]]> {
        let grant: Grant = this.grantMap.get(requiredGrant.name);
        if (!grant) {
            return [undefined,undefined];
        }
        grant = Object.create(grant);
        let owner: boolean;
        if(requiredGrant.when){
            owner = await requiredGrant.when(grant.possession);
        }else {
            owner = true;
        }
        if(owner){
            let attr = [];
            if (requiredGrant.overrideAttributes){
                attr = await requiredGrant.overrideAttributes(grant.possession);
            }else {
                attr = grant.attributes;
            }
            return [grant, attr];
        }
        return [undefined,undefined];
    }

}