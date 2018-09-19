import {RBAC, Possession} from "../index";

const user = {id:1, name: 'jjjj'};

const role1 = RBAC.constructRoleFromGrants('admin','1',[{
    name:'compute.regions.get',
    attributes: ['*','!id'],
    possession: Possession.OWNER}
    ]);
const role2 = RBAC.constructRole('admin2','1',['compute.regions.list']);
const role3 = RBAC.squashRoles([role1,role2]);

const exec = async ()=> {
    const [granted, permissions] = await RBAC.hasMultiple(role3,[{
        name:'compute.regions.get',
        when:async (possession: Possession) =>{
            return user.id === 1;
        },
        overrideAttributes:async (possession: Possession) =>{
            return ['*'];
        }
    }]);

    console.log(granted);
    console.log(permissions[0].attributes);
    console.log(JSON.stringify(permissions[0].filter(user)));

    const permission2 = await RBAC.has(role3,{
        name:'compute.regions.get',
        when:async (possession: Possession) =>{
            return user.id === 1;
        },
        overrideAttributes:async (possession: Possession) =>{
            return ['*'];
        }
    });

    console.log(permission2.granted);
    console.log(permission2.attributes);
    console.log(JSON.stringify(permission2.filter(user)));

};

exec().then();

