import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

interface Movie {
    id: number;
    title: string;
    director: string;
    release_date: string;
    poster_image: string;
    description: string;
    rating: number;
    lead_Actors: string;
}
interface ADDMovie {
    
    title: string;
    director: string;
    release_date: string;
    poster_image: string;
    description: string;
    rating: number;
    
}

function StarRating({ rating }: { rating: number }) {
    const stars = [];
    for (let i = 0; i < rating / 2; i++) {
        if (i < Math.floor(rating)) {
            stars.push(<span key={i} className="text-yellow-400">&#9733;</span>);
        } else {
            stars.push(<span key={i} className="text-gray-400">&#9734;</span>);
        }
    }
    return <>{stars}</>;
}

function MoviesGhost() {
    const [data, setData] = useState<Movie[]>([]);
    const [addData, setAddData] = useState<ADDMovie[]>([]);
       const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:7000/api2/movies");
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    useEffect(()=>{
        const fetchedDataMovies = async()=>{
            try{
                const response = await axios.get("http://localhost:7000/movie/ghost/all");
                setAddData(response.data);
            }catch(error){
                console.log(error);
            }
        }

        fetchedDataMovies();
    },[]);

    return (
        <>
            <Navbar />
            <p className='pl-24 bg-gray-700 max-h-screen  text-3xl pt-4 text-white font-bold'>Ghost Movies</p>
            <div className='bg-gray-700 min-h-screen  flex flex-wrap justify-center'>
                {data && data.map((movie) => (
                    <div key={movie.id} className='movie-card bg-gray-900 rounded-lg shadow-2xl shadow-sky-900 p-4 m-4 w-80'>
                        <img className='cover rounded-t-lg transition duration-150 ease-in hover:ease-in transform hover:scale-105' src={movie.poster_image} alt='' />

                        <div className="text-white mt-2">
                            <h2 className='text-xl font-semibold'>{movie.title}</h2>
                            <p className='text-sm'><span className='font-bold'>Director:</span> {movie.director}</p>
                            <p className='text-sm'><span className='font-bold'>Release Date:</span> {movie.release_date}</p>
                            <p className='text-sm'><span className='font-bold'>Rating:</span> <StarRating rating={movie.rating} /></p>

                            <p className='text-sm'><span className='font-bold'>Description: </span>{movie.description}</p>
                        </div>
                    </div>
                ))}
                 {addData.map((movie, index) => (
                    <div key={index} className='movie-card bg-gray-900 rounded-lg shadow-2xl shadow-sky-900 p-4 m-4 w-80'>
                        <img className='cover rounded-t-lg transition duration-150 ease-in hover:ease-in transform hover:scale-105' src={movie.poster_image} alt={movie.title} />
                        <div className="text-white mt-2">
                            <h2 className='text-xl font-semibold'>{movie.title}</h2>
                            <p className='text-sm'><span className='font-bold'>Director:</span> {movie.director}</p>
                            <p className='text-sm'><span className='font-bold'>Release Date:</span> {movie.release_date}</p>
                            <p className='text-sm'><span className='font-bold'>Rating:</span> <StarRating rating={movie.rating} /></p>
                            <p className='text-sm'><span className='font-bold'>Description: </span>{movie.description}</p>
                        </div>
                    </div>
                ))}
                
            </div>
            <div className='flex  bg-gray-700 max-h-screen justify-center p-4'>
                <button 
                    onClick={() => navigate('/addghost')} 
                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out'>
                    ADD Ghost Movies
                </button>
            </div> 
        </>
    );
}

export default MoviesGhost;
