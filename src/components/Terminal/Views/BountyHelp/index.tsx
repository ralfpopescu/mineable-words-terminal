import { Line } from "../../../Line";

const Command = ({ children }: any) => <span style={{ color: "yellow" }}>{children}</span>;

export const BountyHelp = () => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <Command>bounties</Command>
    <span>Show all bounties currently offered.</span>
    <Line />
    <Command>bounty-offer [word] [offer]</Command>
    <span>
      Offer a bounty in ETH for finding a word. Anyone who finds your word can claim the bounty, and
      you receive the mword.
    </span>
    <span> *** example: bounty-offer encyclopedia 1.5</span>
    <Line />
    <Command>bounty-claim [word]</Command>
    <span>
      Claim a bounty with an mword that you own. Requires that you have minted the word and that a
      bounty exists for that word.
    </span>
    <span>*** example: bounty-claim encyclopedia</span>
    <Line />
    <Command>bounty-remove-initiate [word]</Command>
    <span>
      Initiate the transaction to get your funds returned from a bounty. After 100 blocks have
      passed, you may use command "bounty-remove-complete" to get your funds. This is to prevent the
      abuse where a bounty can be rescinded when a claim is observed.
    </span>
    <span>*** example: bounty-remove-initate encyclopedia</span>
    <Line />
    <Command>bounty-remove-complete [word]</Command>
    <span>
      Complete the return of your bounty funds after 100 blocks have passed since your initation.
    </span>
    <span>*** example: bounty-remove-complete encyclopedia</span>
  </div>
);
