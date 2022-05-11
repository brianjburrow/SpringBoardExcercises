import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
const Color = ({colors})=>{
    const {name} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!colors[name]){
            console.log(name)
            navigate('/colors/blargh');
        }
    }, [name])
    if (name === 'blargh') return <div>This color does not exist</div>
    return  <div style={{backgroundColor: colors[name], width:"100vw", height:"100vh"}}>{`${name}:${colors[name]}`}</div>
}

export default Color;