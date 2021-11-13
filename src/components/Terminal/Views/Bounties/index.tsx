import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { getCurrentBounties } from '../../../../web3-util/methods'
import { Ellipsis } from '../../../Ellipsis'
import { getWordFromHash } from '../../../../utils/word-util';

const Container = styled.div`
`

export const Bounties = () => {
    const { library } = useWeb3React<Web3Provider>();
    const [bounties, setBounties] = useState<string[] | null>(null);

    useEffect(() => {
        const getMWords = async () => {
            if(library && !bounties) {
                console.log('getting mewords')
                const mwords = await getCurrentBounties({ library })
                setBounties(mwords.map(mw => getWordFromHash(mw)))
            }
        };

        getMWords();
    },[library, bounties])

    return (
    <Container>
    {!bounties && <>Loading current bounties...<Ellipsis /></>}
    {bounties && !bounties.length && 'No bounties yet.'}
    {bounties && bounties.length && bounties.join(', ')}
    </Container>
)}