import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {

    const navigate = useNavigate();

    const [input, setInput] = useState({
        title:"",
        desc:"",
        rating: null,
        cover: ""
    });

    const handleChange = (event) => {
        setInput((prev) => ({...prev, [event.target.name]: event.target.value}))
    };

    const clickHandler = async(event) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:8800/albums", input);
            navigate("/");
        }catch (err) {
            console.log(err)
        }
    }


    return (
        <div className='form'>
            <h1>Rate new album</h1>
            <input type='text' placeholder='title' onChange={handleChange} name='title'/>
            <input type='text' placeholder='desc' onChange={handleChange} name='desc'/>
            <input type='number' placeholder='rating from 0-10' onChange={handleChange} name='rating'/>
            <input type='text' placeholder='cover' onChange={handleChange} name='cover'/>
            <button className='formButton' onClick={clickHandler}>Add</button>
        </div>
    )
}

export default Add;