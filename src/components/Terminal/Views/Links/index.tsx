import styled from "styled-components";

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Links = () => (
  <Column>
    <a href="https://discord.com/invite/EVquaxg9WA">Discord</a>
    <a href="https://twitter.com/mineable_words">Twitter</a>
    <a href="https://opensea.io/collection/mineablewords">OpenSea</a>
    <a href="https://etherscan.io/address/0x05fe017770d0ca164736537177e1d571d16bbade">Contract</a>
  </Column>
);
