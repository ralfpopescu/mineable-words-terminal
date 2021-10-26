import styled from 'styled-components'

const Container = styled.div`
`

const words = ['very cool', 'awesome', 'mwords']

export const RecentlyMined = () => (
    <Container>
    {words.join(', ')}
    </Container>
)