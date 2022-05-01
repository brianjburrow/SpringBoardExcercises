import {useState} from 'react';
import uuid from "uuid";
import axios from "axios";

const useAxios = (baseUrl) =>{
    const [state, setState] = useState([]);

    const updateState = async (urlAddition = '')=>{
        console.log(urlAddition)
        const url = urlAddition ? `${baseUrl}${urlAddition}` : baseUrl;
        console.log(url)
        const response = await axios.get(url);
        setState(state => [...state, {...response.data, id: uuid()}]);
    }
    return [state, updateState];
}

export default useAxios;