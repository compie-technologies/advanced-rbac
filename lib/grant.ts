
export enum Possession {
    OWNER = 'OWNER',
    ANY = 'ANY'
}

export interface Grant {

    readonly name: string;
    readonly possession: Possession;
    readonly attributes: string[];
}

export interface RequiredGrant{

    readonly name: string;
    when?(possession:Possession): Promise<boolean>;
    overrideAttributes?(possession:Possession): Promise<string[]>;
}