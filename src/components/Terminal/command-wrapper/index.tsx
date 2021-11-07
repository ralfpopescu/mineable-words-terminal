const errorWrapper = (command: (args: string) => any) => (args: string) => {
    try {
        return command(args)
    } catch(e) {
    return `Error encountered: ${e.message}`}
}

export const wrapInErrorWrapper = (commands: { [key: string] : (args: string) => any }) => {
    const commandNames = Object.keys(commands);
    return commandNames.map(commandName => (
        { [commandName]: errorWrapper(commands[commandName]) })
        ).reduce((acc, curr) => ({ ...acc, ...curr }))
}