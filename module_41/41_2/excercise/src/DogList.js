import React from 'react';
import {Link} from "react-router-dom";

const DogList = ({dogs})=>{
    console.log("DogList", dogs)
    const names = dogs.map(dog => {
        return (
        <div key = {dog.name}>
            <Link to={`/dogs/${dog.name}`}> {dog.name}, {dog.age} years </Link>
        </div>
        )
});
console.log(names)
    return names
}

export default DogList;