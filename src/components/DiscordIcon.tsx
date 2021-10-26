import styled from 'styled-components'

const Container = styled.div`
display: flex;
flex-direction: column;
width: 100px;
justify-content: center;
align-items: center;
`

const Icon = styled.div`
height: 50px;
width: 50px;
background-color: red;
`

export const DiscordIcon = () => (
    <Container>
        <Icon />
        <div>Discord</div>
    </Container>
) 