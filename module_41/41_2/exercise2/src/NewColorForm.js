import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const NewColorForm = ({handleAdd})=>{
    // define form state
    const [formData, setFormData] = useState({
        colorName:'',
        hexValue:''
    })

    const navigate = useNavigate(); // for redirects

    // handle form change
    const handleChange = (e)=>{
        setFormData(data=>{
            return{
                ...data,
                [e.target.name]:e.target.value
            }
        })
    }
    // handle submit
    const handleSubmit = (e)=>{
        console.log("FORMDATA", formData)
        e.preventDefault();
        handleAdd({[formData.colorName] : formData.hexValue})
        navigate('/colors');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder="colorName"
                value={FormData.color}
                name="colorName"
                onChange={handleChange}
            />

            <input
                type='text'
                placeholder="hexValue"
                value={formData.color}
                name="hexValue"
                onChange={handleChange}
            />
        <button>Add a new color!</button>
        </form>
    )
}

export default NewColorForm;