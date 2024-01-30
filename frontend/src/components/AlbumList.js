import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const AlbumList = () => {

    const [albums, setAlbums] = useState();


    useEffect(() => {
        const fetchAllAlbums = async() => {
            try {
                const res = await axios.get("http://localhost:8800/albums");
                setAlbums(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllAlbums();
    }, [])

    const deleteHandler = async(id) => {
        try {
            await axios.delete("http://localhost:8800/albums/" + id);
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Albums</h1>
            <button className='addHome'> <Link to="/add" className='link-no-decoration'>Add</Link> </button>
            <div className='albums'>
                {albums && albums.map(album => (
                    <div className='album' key={album.id}>
                       <img src={album.cover && album.cover} alt='album cover'/>
                        <h2>{album.title}</h2>
                        <p>{album.desc}</p>
                        <span>{album.rating}/10</span>
                        <button className='delete' onClick={()=>{deleteHandler(album.id)}}>Delete</button>
                        <button className='update'><Link className='link-no-decoration' to={`/Update/${album.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default AlbumList