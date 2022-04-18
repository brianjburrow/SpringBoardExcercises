import React, {useState} from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";
import {v4 as uuidv4} from "uuid";
import "./BoxList.css";

function BoxList(){
    let [boxInfo, setBoxInfo] = useState([])

    function removeBox(key){
        let stateCopy = [...boxInfo];
        setBoxInfo(stateCopy.filter(obj => obj.key !== key));
    }
    function addBox(obj){
        const objCopy = {...obj}
        objCopy['key'] = uuidv4();
        setBoxInfo([...boxInfo, objCopy])
    }
    console.log(boxInfo)
    let boxes = boxInfo.map(obj => {
    return <Box 
        key={obj.key} 
        width={`${obj.width}`} 
        height={`${obj.height}`} 
        color={`${obj.color}`}
        delete={()=>removeBox(obj.key)}
        />
    });
    return (
        <div>
        {boxes}
        <NewBoxForm addBox={addBox}/>
        </div>
    )
}

export default BoxList;

/*
WHY : IF I DON'T MAKE A DEEP COPY OF THE STATE, IT GETS IT'S RANDOM KEY OVERWRITTEN
*/