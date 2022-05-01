import {useState} from 'react';

const useToggleState = (defaultState = true) =>{
    const [state, setState] = useState(defaultState);

    const toggleState = ()=>{
        setState(state => !state)
    }
    return [state, toggleState];
}

export default useToggleState;