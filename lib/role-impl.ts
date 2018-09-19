import {Grant, Possession} from "./grant";
import {Role} from "./role";
import {RoleBase} from "./role-base";
import {RBAC} from "./rbac";

export class RoleImpl extends RoleBase implements Role{

    public readonly id: string[];
    public readonly name: string;
    public readonly grantMap: Map<string,Grant>;

    constructor(id: string, name: string, grants: string[] | Grant[]) {
        super();
        this.id = [];
        this.id.push(id);
        this.name = name;
        this.grantMap = new Map();
        for (let perm of grants){
            let g:Grant;
            if (typeof perm === 'string' || perm instanceof String){
                g = RBAC.constructGrant(perm as string);
            }else {
                g = perm;
            }
            this.grantMap.set(g.name,g);
        }
    }

}