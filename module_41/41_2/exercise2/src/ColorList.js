import React from 'react';
import {Link} from 'react-router-dom';

const ColorList = (colors)=>{
    let colorDivs = [];
    for (let [key, value] of Object.entries(colors.colors)){
        console.log(`${key}`, value);
        colorDivs.push(<Link key={key} to={`/colors/${key}`}><div>{key}</div></Link>)
    }
    return colorDivs
}

export default ColorList;
