import * as Notation from 'notation';

export class Utils {

    static filter(object: any, attributes: string[]): any {
        if (!Array.isArray(attributes) || attributes.length === 0) {
            return {};
        }
        const notation = new Notation(object);
        return notation.filter(attributes).value;
    }

    static filterAll(arrOrObj: any, attributes: string[]): any {
        if (!Array.isArray(arrOrObj)) {
            return Utils.filter(arrOrObj, attributes);
        }
        return arrOrObj.map(o => {
            return Utils.filter(o, attributes);
        });
    }
}