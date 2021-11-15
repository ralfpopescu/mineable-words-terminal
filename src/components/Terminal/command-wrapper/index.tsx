const errorWrapper = (command: (args: string) => any, stopMining: () => void) => async (args: string) => {
    try {
        stopMining();
        const result = await command(args);
        return <><br/>{result}</>
    } catch(e: any) {
    return `Error encountered: ${e.message}`}
}

export const wrapInErrorWrapper = (commands: { [key: string] : (args: string) => any }, stopMining: () => void) => {
    const commandNames = Object.keys(commands);
    return commandNames.map(commandName => (
        { [commandName]: errorWrapper(commands[commandName], stopMining) })
        ).reduce((acc, curr) => ({ ...acc, ...curr }))
}