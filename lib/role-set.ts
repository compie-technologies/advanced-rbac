import {Grant} from "./grant";
import {Role} from "./role";
import {RoleBase} from "./role-base";

export class RoleSet extends RoleBase implements Role{

    public readonly id: string [];
    public readonly grantMap: Map<string,Grant>;
    public readonly roleList: Array<Role>;

    constructor(roles: Array<Role>){
        super();
        this.roleList = roles;
        this.grantMap = new Map();
        let idList:string[] = [];
        for (let role of roles){
            idList = idList.concat(role.id);
            for (let grant of role.listGrants()) {
                this.grantMap.set(grant.name,grant);
            }
        }

        this.id = idList;
    }

}