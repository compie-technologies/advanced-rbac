import {RBAC, Possession, RequiredGrant} from "../index";


const rbac = new RBAC();

const user = {id:1, name: 'jjjj'};
let req: any;
const role1 = RBAC.constructRoleFromGrants('admin','1',[{
    name:'compute.regions.get',
    attributes: ['*','!id'],
    possession: Possession.OWNER}
    ]);
const role2 = RBAC.constructRole('admin2','1',['compute.regions.list']);
const role3 = rbac.squashRoles([role1,role2]);

const exec = async ()=> {
    const permission = await rbac.has(role3,{
        name:'compute.regions.get',
        when:async (possession:Possession)=>{
            return user.id === 1;
        },
        overrideAttributes:async (possession:Possession)=>{
            return ['*'];
        }
    });

    console.log(permission.granted);
    console.log(permission.attributes);
    console.log(JSON.stringify(permission.filter(user)));
};

exec().then();

