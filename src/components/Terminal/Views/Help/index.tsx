import { Line } from '../../../Line'

const Command = ({ children }: any) => <span style={{ color: 'yellow' }}>{children}</span>

export const Help = () => (
<div style={{ display: 'flex', flexDirection: 'column'}}>
    <br />
    <Command>clear</Command>
    <span>Clears console.</span>
    <Line />
    <Command>info</Command>
    <span>Get helpful commands for information, like FAQ, links to resources, time-to-mine calculator, and mined mwords.</span>
    <Line />
    <Command>wallet</Command>
    <span>Link your wallet. Needed for mining, minting, and bounties.</span>
    <Line />
    <Command>mine [-n numberOfWorkers] [-s startingNonce] [-w arrayOfWords]</Command>
    <span>Start mining for words in the browser using your CPU. If you pass an array of words, the miner will only log when it finds those words. If you pass a starting nonce, the miner will start at that number. By default, miner will start at 0 and log every word it finds.</span>
    <span>*** example: mine -s 0x123 -w [hello,goodbye]</span>
    <Line />
    <Command>stop</Command>
    <span>Stop mining.</span>
    <Line />
    <Command>bounty-offer [word] [offer]</Command>
    <span>Offer a bounty in ETH for finding a word. Anyone who finds your word can claim the bounty, and you receive the mword.</span>
    <span> *** example: bounty-offer encyclopedia 1.5</span>
    <Line />
    <Command>bounty-claim [word]</Command>
    <span>Claim a bounty with an mword that you own. Requires that you have minted the word and that a bounty exists for that word.</span>
    <span>*** example: bounty-claim encyclopedia</span>
    <Line />
    <Command>bounty-return [word]</Command>
    <span>Remove your bounty and get your funds returned. Has a delay of 100 blocks to make sure bounty hunters </span>
    <span>*** example: bounty-claim encyclopedia</span>
    <Line />
    <Command>bounty-hunt</Command>
    <span>Start mining for bounty words exclusively.</span>
    <Line />
    <Command>mint [nonce | word]</Command>
    <span>Mints an mword given some nonce, or word if you have found it via the browser miner.</span>
    <span>*** example: mint 0x7482eb</span>
    <span>*** example: mint cool_word</span>
</div>
)