export const CommandWrapper = (command: (args: string) => any) => (args: string) => {
    try {
        return command(args)
    } catch(e) {
    return `Error encountered: ${e.message}`}
}