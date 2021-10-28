import styled from 'styled-components'

const Column = styled.div`
display: flex;
flex-direction: column;
`


export const Links = () => (
    <Column>
       <a href="https://discord.com/invite/EVquaxg9WA">Discord</a>
       <a href="https://twitter.com/mineable_words">Twitter</a>
       <a href="https://opensea.io/collection/mineablepunks">OpenSea</a>
       <a href="https://etherscan.io/address/0x595a8974c1473717c4b5d456350cd594d9bda687">Contract</a>
    </Column>
)