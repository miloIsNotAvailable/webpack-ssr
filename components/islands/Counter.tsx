import { FC, useState } from "react";

const Counter: FC =() => {

    const [ counter, setCounter ] = useState<number>( 0 )

    return (
        <div onClick={ () => setCounter( c => c + 1 ) }>
            { counter }
        </div>
    )
}

export default Counter