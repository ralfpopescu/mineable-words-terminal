type Obj = { [key: string]: string }

export const getOptions = <T extends Obj>(input: string): T => {
    //yields: ["command ", "h 100 ", "l 8"]
    //remove first index because it's the command
    const splitOnHyphen = input.split('-').slice(1);
    if(!splitOnHyphen.length) return {} as T;
    const values = splitOnHyphen.map(v => {
        //yields ["h", "100"]
        const splitOnSpaces = v.split(" ");
        return { [splitOnSpaces[0]] : splitOnSpaces[1] }
    })

    return values.reduce((acc, curr) => ({ ...acc, ...curr })) as T;
}

export const splitOnSpaces = (input: string) => input.split(/\s+/);

export const getWordsFromOptions = (input: string): string[] | null => {
    try {
        //enter [hello,goodbye, hi]
        const splitOnBrackets= input.split('[')[1].split(']')[0];
        const splitOnCommas = splitOnBrackets.split(',');
        return splitOnCommas.map(w => w.replace(/\s/g,''))
    } catch (e) {
        return null
    }
}

export const assertValidOptions = (options: Obj, validOptions: string[]) => {
    const keys = Object.keys(options);
    const invalid: string[] = [];

    keys.forEach(k => {
        if(!validOptions.includes(k)) invalid.push(k)
    })

    if(!invalid.length) return null;

    return `Unrecognized option(s): ${invalid.map(inv => `-${inv}`).join(', ')}`
}

export const getQueryParamsFromSearch = (search: string): { [key: string] : string | number } => {
    if(!search || !search.length) return {}

    const split = search.split('?')[1]
    const splitOnAmp = split.split('&')
    return splitOnAmp.reduce((acc, curr) => {
        const splitKeyValue = curr.split('=')
        const key = splitKeyValue[0]
        const value = splitKeyValue[1]
        return { ...acc, [key]: value }
    }, {});
}

export const getNavigationPathFromParams = (params: { [key: string] : string | number }): string => {
    const keys = Object.keys(params);
    return keys.reduce((navPath: string, key: string, index: number) => {
        const value = params[key]
        if(index) return `${navPath}&${key}=${value}`
        return `${navPath}${key}=${value}`
    }, '?')
}

export const addQueryParamsToNavPath = (params: { [key: string] : string | number }, search: string): string => {
    const currentParams = getQueryParamsFromSearch(search);
    const newParams = { ...currentParams, ...params }
    return getNavigationPathFromParams(newParams);
}

export const concatQueryParams = (search: string, newParam: string) => {
    if(search.length) {
        return `${search}&${newParam}`
    }
    return `?${newParam}`
}
