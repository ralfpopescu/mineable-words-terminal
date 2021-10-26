import styled from 'styled-components'

const Column = styled.div`
display: flex;
flex-direction: column;
`

export const FAQ = () => (
    <Column>
    <span>1. Are mwords super cool NFTs?</span>
    <span>Yes they are the coolest NFTs.</span>
    <span>2. Should I finish these FAQs?</span>
    <span>Yes.</span>
    </Column>
)