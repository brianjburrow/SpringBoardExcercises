import React, {useState} from "react";

const NewBoxForm = ({addBox})=>{
    const [formData, setFormData] = useState({
        color: "blue",
        width: "400px",
        height: "100px"
    })

    const handleChange = (e)=>{
        setFormData(data=>{
            return {
            ...data,
            [e.target.name]: e.target.value 
            }
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        addBox(formData);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
            type='text' 
            placeholder="color" 
            value = {formData.color} 
            name="color"
            onChange={handleChange}/>

            <input 
            type='text' 
            placeholder="width" 
            name="width"
            value = {formData.width} 
            onChange={handleChange}/>

            <input 
            type='text' 
            placeholder="height" 
            name="height"
            value = {formData.height} 
            onChange={handleChange}/>
            <button>Create a new Box!</button>
        </form>
    )
}

export default NewBoxForm;