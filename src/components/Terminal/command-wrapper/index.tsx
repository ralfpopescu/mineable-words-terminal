const errorWrapper = (command: (args: string) => any, stopMining: () => void) => (args: string) => {
    try {
        stopMining();
        return command(args)
    } catch(e: any) {
    return `Error encountered: ${e.message}`}
}

export const wrapInErrorWrapper = (commands: { [key: string] : (args: string) => any }, stopMining: () => void) => {
    const commandNames = Object.keys(commands);
    return commandNames.map(commandName => (
        { [commandName]: errorWrapper(commands[commandName], stopMining) })
        ).reduce((acc, curr) => ({ ...acc, ...curr }))
}