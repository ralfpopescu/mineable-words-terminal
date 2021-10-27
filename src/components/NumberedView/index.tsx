import styled from 'styled-components'

const Column = styled.div`
display: flex;
flex-direction: column;
`

type NumberedViewProps = { options: string[] }

export const NumberedView = ({ options }: NumberedViewProps) => (
    <Column>
        {options.map((option, i) => <div>{i}. {option}</div>)}
    </Column>
)