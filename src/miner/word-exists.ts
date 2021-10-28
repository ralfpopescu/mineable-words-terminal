import axios from 'axios'
export const getExistingWords = async (): Promise<{ [key: string]: boolean }> => {
    const data = await axios.get(
        'https://api.achievemints.io/existing-words',
         { headers: {
             "Access-Control-Allow-Origin": "*",
             'Content-Type': 'application/json',
            }}
        )
    return data.data;
}