import React from 'react';
import {useParams, Navigate} from 'react-router-dom';

const DogDetails = ({dogs})=>{
    const {name} = useParams();
    for (let i = 0; i<dogs.length; i++){
        if (dogs[i].name === name){
            return (
                <>
                <div>{name}</div>
                <div>{dogs[i].age}</div>
                <div>Facts</div>
                {dogs[i].facts.map(fact => <div key={fact}>{fact}</div>)}
                </>
            
            )
        }
    }
    return <Navigate to='/dogs' replace />
}

export default DogDetails;