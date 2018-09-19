import {Role} from "./role";
import {Grant, Possession, RequiredGrant} from "./grant";
import {RoleSet} from "./role-set";
import {RoleImpl} from "./role-impl";
import {GrantImpl} from "./grant-impl";
import {Permission} from "./permission";
import {PermissionImpl} from "./permission-impl";

export class RBAC {

    private constructor(){}

    public static squashRoles(roles: Role[]):Role{
        return new RoleSet(roles);
    }

    public static async hasMultiple(role:Role, requiredGrants: RequiredGrant[]):Promise<[boolean, Permission[]]>{
        const permissions: Permission[] = [];
        let granted: boolean = true;
        for (let grant of requiredGrants){
            const perm: Permission = await RBAC.has(role,grant);
            if (!perm.granted) {
                granted = false;
            }
            permissions.push(perm);
        }
        return [granted, permissions];
    }

    public static async has(role:Role, requiredGrant: RequiredGrant):Promise<Permission>{
        const [grant, attr] = await role.has(requiredGrant);
        if (grant){
            return new PermissionImpl(true, grant, attr)
        }else {
            return new PermissionImpl(false, undefined)
        }
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