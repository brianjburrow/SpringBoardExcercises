import React from "react";
import "./Box.css";

function Box(props){
    const divStyle = {backgroundColor: props.color,
        width: props.width,
        height: props.height
    }
    return (
    <div className="Box" style={divStyle}><button onClick={props.delete}>X</button></div>
    )
}

export default Box