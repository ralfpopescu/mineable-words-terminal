import styled from 'styled-components'

const Container = styled.div`
display: flex;
flex-direction: column;
height: 50px;
justify-content: center;
align-items: left;
background-color: #999999;
`

const Start = styled.div`
display: flex;
height: 20px;
width: 50px;
border: 1px solid black;
border-radius: 4px;
justify-content: center;
align-items: center;
`

export const Bar = () => (
    <Container>
        <Start>Start</Start>
    </Container>
) 