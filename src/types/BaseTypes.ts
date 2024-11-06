import capitilize from "lodash/capitalize"
import startCase from "lodash/startCase"

// @ts-ignore
export enum BooleanYesNo {
    // @ts-ignore
    YES = true,
    // @ts-ignore
    NO = false,
}

export const generateEnumItems = (obj) => {
    // @ts-ignore
    const filterCb = value => obj === BooleanYesNo ? value === 'true' || value === 'false' : true;
    const mapCb = value => obj === BooleanYesNo ? { name: capitilize(startCase(obj[value])), value: value === 'true'  } : { name: capitilize(startCase(obj[value])), value: value };
    return Object.keys(obj).filter(filterCb).map(mapCb);
}