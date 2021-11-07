import styled from 'styled-components'

const Column = styled.div`
display: flex;
flex-direction: column;
`

export const FoundWords = () => {
    const foundWords = localStorage.getItem('found');
    const parsed = foundWords ? JSON.parse(foundWords) : {}

    return (
    <Column>
       {foundWords ? <>{Object.keys(parsed).map(word => <div>{word} -- nonce: {parsed[word]}</div>)}</> : <div>No mwords found. Use command "mine" to find them.</div>}
    </Column>
)}