import {Grant} from "./grant";

export interface Permission {

    readonly grant: Grant;
    readonly granted: boolean;
    readonly attributes: string[]; // ['*', '!record.id']
    filter(data: any): any;

}
