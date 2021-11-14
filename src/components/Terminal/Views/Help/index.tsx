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
    <Command>connect</Command>
    <span>Link your wallet. Needed for most activities.</span>
    <Line />
    <Command>bounty-help</Command>
    <span>Get commands related to creating bounties and earning rewards for finding bounties.</span>
    <Line />
    <Command>mine [-n numberOfWorkers] [-s startingNonce] [[-w arrayOfWords]]</Command>
    <span>Start mining for words in the browser using your CPU. If you pass an array of words, the miner will only log when it finds those words. To change number of miner workers, pass a number between 1-8 for for the -n flag. Defaults to 4. If you pass a starting nonce, the miner will start at that number - pass r to start at a random nonce. Defaults to 0.</span>
    <span>*** example: mine -s 0x123 -w [hello,goodbye] //starts at nonce 0x123 looking for words "hello" and "goodbye"</span>
    <span>*** example: mine -s r -n 8 //starts at a random nonce, spins up 8 worker threads, and saves all words found.</span>
    <span>*** example: mine //default: starts at a 0, spins up 4 worker threads, and saves all words found.</span>
    <Line />
    <Command>stop</Command>
    <span>Stop mining.</span>
    <Line />
    <Command>found</Command>
    <span>Show all words that you have found. Words are saved to your local storage and persist between sessions.</span>
    <Line />
    <Command>mint [nonce | word]</Command>
    <span>Mints an mword given some nonce, or word if you have found it via the browser miner.</span>
    <span>*** example: mint 0x7482eb</span>
    <span>*** example: mint cool_word</span>
</div>
)