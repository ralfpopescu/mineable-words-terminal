import styled from "styled-components";
import { Line } from "../../../Line";

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Question = ({ children }: any) => <span style={{ color: "yellow" }}>{children}</span>;

export const FAQ = () => (
  <Column>
    <br />
    <Question>What are mwords?</Question>
    <span>
      mwords are NFTs that have to be found through mining - they cannot be claimed like "regular"
      NFTs. They take the form of words and are rendered 100% on-chain.
    </span>
    <Line />
    <Question>How do I mine mwords?</Question>
    <span>
      mwords can be mined right here in your browser. Long, specific words will take more processing
      power, requiring GPU mining.
    </span>
    <Line />
    <Question>How long does it take to mine an mword?</Question>
    <span>
      Finding arbitrary words of relatively short length can happen every few seconds. Use the
      "calc" command to see how long it might to find a specific word, which is significantly
      harder.
    </span>
    <Line />
    <Question>Where's the GPU miner?</Question>
    <span>
      The GPU miner development will begin if and when there is community interest. Having made one
      for mpunks already, this should not take long!
    </span>
    <Line />
    <Question>What characters can be in an mword?</Question>
    <span>All letters and . ! @ ? & _</span>
    <Line />
    <Question>Is there a limit to number of mwords that can be minted?</Question>
    <span>Yes, there is a cap depending on the word length. Use command "limits" to see.</span>
    <Line />
    <Question>Is there a fee?</Question>
    <span>Minting an mword cost .02 ETH. However, if you own an mpunk, minting is free!</span>
    <Line />
  </Column>
);
