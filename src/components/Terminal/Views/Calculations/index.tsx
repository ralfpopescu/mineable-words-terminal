import styled from 'styled-components'

const Column = styled.div`
display: flex;
flex-direction: column;
`

export type CalculationsType = {
    calculations: Array<{
        hashRate: number,
        times: Array<{ wordLength: number, time: number }>
    }>
}

const Time = styled.div`
padding-left: 16px;
`


export const Calculations = ({ calculations }: CalculationsType) => (
    <Column>
       {calculations.map(calc => (
           <div>
               <br />
            <div>Hash rate: {calc.hashRate} MH/s</div>
            {calc.times.map(t => <Time>{t.wordLength} characters: {t.time} hours</Time>)}
           </div>
       ))}
    </Column>
)