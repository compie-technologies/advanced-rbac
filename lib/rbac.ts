import {Role} from "./role";
import {Grant, Possession, RequiredGrant} from "./grant";
import {RoleSet} from "./role-set";
import {PermissionError} from "./permission-error";
import {RoleImpl} from "./role-impl";
import {GrantImpl} from "./grant-impl";
import {Permission} from "./permission";
import {PermissionImpl} from "./permission-impl";

export class RBAC {

    public squashRoles(roles: Role[]):Role{
        return new RoleSet(roles);
    }

    public async has(role:Role, requiredGrant: RequiredGrant):Promise<Permission>{
        const [grant, attr] = await role.has(requiredGrant);
        if (grant){
            return new PermissionImpl(true, grant, attr)
        }else {
            return new PermissionImpl(false, undefined)
        }
    }

    public async can(role:Role, requiredGrants: RequiredGrant[]):Promise<boolean>{
        let missingGrants:Grant[] = [];
        for (let requiredGrant of requiredGrants){
            const [grant, attr] = await role.has(requiredGrant);
            if (grant){
                missingGrants.push(grant);
            }
        }
        if (missingGrants.length > 0){
            throw new PermissionError('missing grants', missingGrants);
        }
        return true;
    }

    public static constructGrant(name: string,
                                 possession:Possession = Possession.ANY,
                                 attributes: string[] = ['*']):Grant{
        return {name,possession,attributes};
    }

    public static constructAdvancedGrant(domain: string, context: string,
                                              action: string, possession:Possession = Possession.ANY):Grant{
        return new GrantImpl(domain, context, action, possession)
    }

    public static constructRole(roleName: string, roleId: string, grants: string[]):Role{
        return new RoleImpl(roleId, roleName, grants)
    }

    public static constructRoleFromGrants(roleName: string, roleId: string, grants: Grant[]):Role{
        return new RoleImpl(roleId, roleName, grants)
    }
}