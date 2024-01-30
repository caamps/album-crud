import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {

    const navigate = useNavigate();
    const location = useLocation();


    const albumId = location.pathname.split('/')[2]

    const [input, setInput] = useState({
        title:"",
        desc:"",
        rating: null,
        cover: ""
    });

    console.log(input)

    useEffect(() => {
        const fetchAlbum = async() => {
            try {
                const res = await axios.get("http://localhost:8800/albums/" + albumId);
                setInput(res.data[0])
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAlbum();
    }, [albumId])


    const handleChange = (event) => {
        setInput((prev) => ({...prev, [event.target.name]: event.target.value}))
    };

    const clickHandler = async(event) => {
        event.preventDefault();
        try{
            await axios.put("http://localhost:8800/albums/" + albumId, input);
            navigate("/");
        }catch (err) {
            console.log(err)
        }
    }


    return (
    <>
    {input.rating && <div className='form'>
            <h1>Update album</h1>
            <input type='text' placeholder='title' onChange={handleChange} name='title' defaultValue={input.title}/>
            <input type='text' placeholder='desc' onChange={handleChange} name='desc' defaultValue={input.desc}/>
            <input type='number' placeholder='rating from 0-10' onChange={handleChange} name='rating' defaultValue={input.rating}/>
            <input type='text' placeholder='cover' onChange={handleChange} name='cover' defaultValue={input.cover}/>
            <button className='formButton' onClick={clickHandler}>Update</button>
        </div>}
    </>
    )

}

export default Update;