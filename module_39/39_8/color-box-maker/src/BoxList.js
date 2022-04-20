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
        // Test 1
        const objCopy = {...obj}
        objCopy['key'] = uuidv4();
        setBoxInfo([...boxInfo, objCopy])
        // Uncomment the next two lines to break it

        // Test 2
        //obj['key'] = uuidv4();
        // console.log(boxInfo, obj)
        // setBoxInfo([...boxInfo, obj])

        // Test 3
        // console.log("INPUT OBJ", obj)
        // console.log("Starting boxInfo", boxInfo)
        // obj['key'] = Math.random() + 10 * Math.random();
        // console.log("Updated OBJ", obj)
        // setBoxInfo([...boxInfo, obj])
        // console.log("UPDATED BOXINFO", boxInfo)
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