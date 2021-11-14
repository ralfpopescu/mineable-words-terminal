import * as ethers from 'ethers'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { getCurrentBounties, BountyType } from '../../../../web3-util/methods'
import { Ellipsis } from '../../../Ellipsis'
import { Line } from '../../../Line'

const Container = styled.div`
`

const GridContainer = styled.div`
display: grid;
grid-template-columns: 200px 300px 500px;
grid-template-rows: repeat(auto-fit);
`

export const Bounties = () => {
    const { library } = useWeb3React<Web3Provider>();
    const [bounties, setBounties] = useState<BountyType[] | null>(null);
    console.log({ bounties })

    useEffect(() => {
        const getMWords = async () => {
            if(library && !bounties) {
                console.log('getting mewords')
                const mwords = await getCurrentBounties({ library })
                setBounties(mwords);
            }
        };

        getMWords();
    },[library, bounties])

    return (
    <Container>
    {!bounties && <>Loading current bounties...<Ellipsis /></>}
    {(bounties && bounties.length === 0) ? 'No bounties yet.' : ''}
    {bounties?.length && 
        <GridContainer>
            <div>word</div>
            <div>offer (ETH)</div>
            <div>buyer</div>
            <Line />
            <Line />
            <Line />
            {bounties.map(bounty => (
                <>
                    <div>{bounty.decoded}</div>
                    <div>{ethers.utils.formatEther(bounty.value)}</div>
                    <div>{bounty.buyer}</div>
                </>
            ))}
        </GridContainer>
        }
    </Container>
)}