import {useState} from "react";


const useIncrement = (init) => {
    const [count, setCount] = useState(init);

    const setIncrement = () => {
        if (count===null) {
            setCount(0)
        }
        setCount(v => v+1)
    }
    const setDecrement = () => {
        if (count === 0) {
            setCount(null)
            return
        }
        setCount(v => v-1)
    }

    return [count, setIncrement, setDecrement, setCount]
}

export default useIncrement;