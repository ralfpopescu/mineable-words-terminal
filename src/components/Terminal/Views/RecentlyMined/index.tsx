import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { getAllDecodedMWords } from '../../../../web3-util/methods'
import { Ellipsis } from '../../../Ellipsis'

const Container = styled.div`
`

export const RecentlyMined = () => {
    const { library } = useWeb3React<Web3Provider>();
    const [recentlyMined, setRecentlyMined] = useState<string[] | null>(null);

    useEffect(() => {
        const getMWords = async () => {
            if(library && !recentlyMined) {
                console.log('getting mewords')
                const mwords = await getAllDecodedMWords({ library })
                setRecentlyMined(mwords)
            }
        };

        getMWords();
    },[library, recentlyMined])

    return (
    <Container>
    {!recentlyMined && <>Loading mwords<Ellipsis /></>}
    {recentlyMined && !recentlyMined.length && 'No mwords yet.'}
    {recentlyMined && recentlyMined.length && recentlyMined.join(', ')}
    </Container>
)}