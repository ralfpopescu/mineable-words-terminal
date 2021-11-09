import { useState } from 'react'
import ReactInterval from 'react-interval';

export const Ellipsis = () => {
    const [ellipses, setEllipses] = useState(1);

    return (
        <><ReactInterval timeout={500} enabled={true}
        callback={() => {
            if(ellipses > 2) setEllipses(0)
            else setEllipses(e => e + 1);
        }} />
        {'.'.repeat(ellipses)}
        </>
    )
}