import React from 'react';
import {Link} from "react-router-dom";

const NavBar = ({dogs})=>{
    console.log("DogList", dogs)
    const names = dogs.map(dog => {
        return (
        <span key = {dog.name}>
            <Link to={`/dogs/${dog.name}`}> {dog.name} </Link>
        </span>
        )
});
console.log(names)
    return names
}

export default NavBar;