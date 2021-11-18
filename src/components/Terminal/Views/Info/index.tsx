const Line = () => <span>-------------</span>
const Command = ({ children }: any) => <span style={{ color: 'yellow' }}>{children}</span>

export const Info = () => (
<div style={{ display: 'flex', flexDirection: 'column'}}>
    <Command>faq</Command>
    <span>See frequency asked questions.</span>
    <Line />
    <Command>links</Command>
    <span>Get links to Discord, Twitter, OpenSea, and Etherscan.</span>
    <Line />
    <Command>recent</Command>
    <span>See recently mined mwords.</span>
    <Line />
    <Command>inspect [wallet]</Command>
    <span>Shows mwords owned by some wallet. Pass 'me' to see your own collection.</span>
    <span>*** example: inspect 0x75Dce9FfB3dA7Da232eF2139c7E1d00e8C60DD59</span>
    <span>*** example: inspect me //see your mwords</span>
    <Line />
    <Command>calc [-h hashRate] [-l lengthOfWord]</Command>
    <span>Calculate estimated times to mine words. Pass a hash rate in MH/s to calculate times using that hash rate. Pass a word length to calculate time to find a specific word of that length. Default prints a table of common hash rates and word lengths.</span>
    <span>*** example: calc -h 100 -l 9</span>
</div>
)