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
const calculateTimeInHours = (hashRate: number, lengthOfWord: number) =>  {
    const result = ((32 ** lengthOfWord) / (hashRate * 1000000)) / 60 / 60;
    return result;
}

export const CalculationsView = ({ calculations }: CalculationsType) => (
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

type CalculationsProps = { hashRate?: number, lengthOfWord?: number }

export const Calculations = ({ hashRate, lengthOfWord }: CalculationsProps) => {
    if(hashRate) {
        if(lengthOfWord) {
            return <>{`It would take you ${calculateTimeInHours(hashRate, lengthOfWord)} hours to mine a word of length ${lengthOfWord} at a hash rate of ${hashRate} MH/s.`}</>
        }
        const wordLengths = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        const times = wordLengths.map(l => ({ wordLength: l, time: calculateTimeInHours(hashRate, l) }))
        const calculations = [{ hashRate, times }]
        return <CalculationsView calculations={calculations} />
    } else {
        if(lengthOfWord) {
            const hashRates = [1, 10, 100, 500, 10000] 
            const calculations = hashRates
            .map(hr => 
                ({ hashRate: hr, times: [
                    { wordLength: lengthOfWord, time: calculateTimeInHours(hr, lengthOfWord) }
                ]}))
            return <CalculationsView calculations={calculations} />
        }
        const wordLengths = [4, 6, 8, 10, 12, 13, 14, 15];
        const hashRates = [10, 100, 500, 10000] 
        const calculations = hashRates.map(hr => {
            return {
                hashRate: hr,
                times: wordLengths.map(wordLength => ({ wordLength, time: calculateTimeInHours(hr, wordLength) }))
            }
        })
        return <CalculationsView calculations={calculations} />
    }
} 