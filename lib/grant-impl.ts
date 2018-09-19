import {Grant, Possession} from "./grant";

export class GrantImpl implements Grant{

    public readonly domain: string;
    public readonly context: string;
    public readonly action: string;
    public readonly name: string;
    public readonly possession: Possession;
    public readonly attributes: string[];

    constructor(domain: string, context: string, action: string,
                possession:Possession = Possession.ANY, attributes: string[] = ['*']){
        this.action = action;
        this.context = name;
        this.domain = domain;
        this.possession = possession;
        this.attributes = attributes;
        this.name = `${this.domain}.${this.context}.${this.action}`;
    }

}