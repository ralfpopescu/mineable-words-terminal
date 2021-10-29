type Obj = { [key: string]: string }

export const getOptions = <T extends Obj>(input: string): T => {
    //yields: ["command ", "h 100 ", "l 8"]
    //remove first index because it's the command
    const splitOnHyphen = input.split('-').slice(1);
    console.log({ splitOnHyphen })
    if(!splitOnHyphen.length) return {} as T;
    const values = splitOnHyphen.map(v => {
        //yields ["h", "100"]
        const splitOnSpaces = v.split(" ");
        return { [splitOnSpaces[0]] : splitOnSpaces[1] }
    })

    return values.reduce((acc, curr) => ({ ...acc, ...curr })) as T;
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