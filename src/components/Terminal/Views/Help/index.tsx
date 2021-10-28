const Line = () => <span>-------------</span>
const Command = ({ children }: any) => <span style={{ color: 'yellow' }}>{children}</span>

export const Help = () => (
<div style={{ display: 'flex', flexDirection: 'column'}}>
    <br />
    <Command>clear</Command>
    <span>Clears console.</span>
    <Line />
    <Command>faq</Command>
    <span>See frequency asked questions.</span>
    <Line />
    <Command>recent</Command>
    <span>See recently mined mwords.</span>
    <Line />
    <Command>wallet</Command>
    <span>Link your wallet. Only needed for safe-mint.</span>
    <Line />
    <Command>inspect [wallet]</Command>
    <span>Shows mwords owned by some wallet.</span>
    <span>***example: inspect 0x75Dce9FfB3dA7Da232eF2139c7E1d00e8C60DD59</span>
    <Line />
    <Command>calc [-h hashRate] [-l lengthOfWord]</Command>
    <span>Calculate estimated times to mine words. Pass a hash rate in MH/s to calculate times using that hash rate. Pass a word length to calculate time to find a specific word of that length. Default prints a table of common hash rates and word lengths.</span>
    <span>***example: calc -h 100 -l 9</span>
    <Line />
    <Command>mine [-s startingNonce] [-w arrayOfWords]</Command>
    <span>Start mining for words in the browser using your CPU. If you pass an array of words, the miner will only log when it finds those words. If you pass a starting nonce, the miner will start at that number. By default, miner will start at 0 and log every word it finds.</span>
    <span>***example: mine -s 0x123 -w [hello,goodbye]</span>
    <Line />
    <Command>stop</Command>
    <span>Stop mining.</span>
    <Line />
    <Command>bounty-offer [word] [offer]</Command>
    <span>Offer a bounty in ETH for finding a word. Anyone who finds your word can claim the bounty, and you receive the mword.</span>
    <span> ***example: bounty-offer encyclopedia 1.5</span>
    <Line />
    <Command>bounty-claim [word] [nonce]</Command>
    <span>Claim a bounty with a nonce that you found. This requires two transactions to ensure no one can snipe your bounty.</span>
    <span>***example: bounty-claim encyclopedia 0x27abe9</span>
    <Line />
    <Command>mint [nonce]</Command>
    <span>Mints an mword given some nonce. Use at your own risk: it is possible for people to snipe your nonce and mint before you!</span>
    <span>***example: mint 0x7482eb</span>
    <Line />
    <Command>safe-mint [nonce]</Command>
    <span>Mints an word given some nonce using two transactions, guaranteeing that no one can cut in front of you and mint your mword.</span>
    <span>***example: safe-mint 0x729abe</span>
</div>
)