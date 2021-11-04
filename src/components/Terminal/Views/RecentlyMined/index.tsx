import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { getAllDecodedMWords } from '../../../../web3-util/methods'

const Container = styled.div`
`

export const RecentlyMined = () => {
    const { library } = useWeb3React<Web3Provider>();
    const [recentlyMined, setRecentlyMined] = useState<string[]>([]);

    useEffect(() => {
        const getMWords = async () => {
            if(library) {
                const mwords = await getAllDecodedMWords({ library })
                setRecentlyMined(mwords)
            }
        };

        getMWords();
    },[library])
    return (
    <Container>
    {recentlyMined.length ? recentlyMined.join(', ') : 'No mwords yet.'}
    </Container>
)}