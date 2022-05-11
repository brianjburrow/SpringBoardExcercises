import {Routes, Route, Navigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import ColorList from './ColorList';
import Color from './Color';
import NewColorForm from './NewColorForm';

const RouteList = ()=>{
    const initialColors = JSON.parse(localStorage.getItem("colors")) || {
        red: "#FF0000",
        blue: '#0000FF', 
        green: "$00FF00"
    };

    const [colors, setColors] = useState(initialColors);

    useEffect(()=>{
        localStorage.setItem("colors", JSON.stringify(colors));
    }, [colors]);

    function handleAdd(newColor){
        setColors(()=>{
            return {...colors, ...newColor}
        })
    }

    return (
        <Routes>
            <Route path='/colors' element={<ColorList colors={colors}/>}></Route>
            <Route path='/colors/new' element = {<NewColorForm handleAdd={handleAdd}/>}></Route>
            <Route path='/colors/:name' element={<Color colors = {colors}/>}></Route>
            <Route path="*" element = {<Navigate to='/colors' replace/>}/>
        </Routes>
    )
}


export default RouteList;