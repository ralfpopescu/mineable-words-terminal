import { Line } from "../../../Line";

const Command = ({ children }: any) => <span style={{ color: "yellow" }}>{children}</span>;

export const Help = () => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div>
      mwords (mineable_words) are NFTs that take the form of words. However, these words cannot
      simply be claimed - they must be mined! Any piece of text up to length 16 with letters a-z and
      characters @ ! . _ & ? can be found. You can either mine them yourself right here in the
      browser, or offer a bounty for others to find them for you. Conversely, you can earn rewards
      for finding other people’s bounties. Minting costs .009 ETH, but is free if your wallet owns
      an mpunk <a href="https://www.mpunks.org/faq">(mpunks.org)</a>. Here are a list of commands to
      get you started:
    </div>
    <br />
    <Command>clear</Command>
    <span>Clears console.</span>
    <Line />
    <Command>info</Command>
    <span>
      Get helpful commands for information, like FAQ, links to resources, time-to-mine calculator,
      and mined mwords.
    </span>
    <Line />
    <Command>connect</Command>
    <span>Link your wallet. Needed for most activities.</span>
    <Line />
    <Command>bounty-help</Command>
    <span>Get commands related to creating bounties and earning rewards for finding bounties.</span>
    <Line />
    <Command>mine [commaSeparatedWords] </Command>
    <span>Start mining for words in the browser using your CPU. </span>
    <span>
      If passing a list of words, the miner will only look for those words + bounty words. If you
      don't pass a list of words, the miner will look for any word in the English dictionary with at
      least 6 letters + bounty words.
    </span>
    <br />
    <span>
      *** example: mine //looks for all words in the English dictionary with at least 6 letters and
      all bounty words
    </span>
    <span>
      *** example: mine good,morning,gm //looks for words "good", "morning", "gm", and all bounty
      words
    </span>
    <Line />
    <Command>stop</Command>
    <span>Stop mining. Note that running ANY command will stop the miner.</span>
    <Line />
    <Command>found</Command>
    <span>
      Show all words that you have found. Words are saved to your local storage and persist between
      sessions.
    </span>
    <Line />
    <Command>mint [nonce | word]</Command>
    <span>
      Mints an mword given some nonce, or word if you have found it via the browser miner.
    </span>
    <br />
    <span>*** example: mint 0x7482eb</span>
    <span>*** example: mint cool_word</span>
  </div>
);
