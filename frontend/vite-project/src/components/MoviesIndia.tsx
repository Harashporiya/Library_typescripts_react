import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

interface Movie {
    id: number;
    Title: string;
    Director: string;
    Release_Date: string;
    Poster_Image: string;
    Description: string;
    Rating: number;
    Lead_Actors: string;
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

function MoviesIndia() {
    const [data, setData] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:7000/api/movies");
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <p className='pl-24 text-3xl pt-4 bg-gray-700 max-h-screen text-white font-bold'>Indian Movies</p>
            <div className='bg-gray-700 min-h-screen flex flex-wrap justify-center'>
                {data && data.map((movie) => (
                    <div key={movie.id} className='movie-card bg-gray-900 rounded-lg shadow-2xl shadow-sky-900 p-4 m-4 w-80'>
                        <img className='cover rounded-t-lg transition duration-150 ease-in hover:ease-in transform hover:scale-105' src={movie.Poster_Image} alt='' />

                        <div className="text-white mt-2">
                            <h2 className='text-xl font-semibold'>{movie.Title}</h2>
                            <p className='text-sm'><span className='font-bold'>Director:</span> {movie.Director}</p>
                            <p className='text-sm'><span className='font-bold'>Release Date:</span> {movie.Release_Date}</p>
                            <p className='text-sm'><span className='font-bold'>Rating:</span> <StarRating rating={movie.Rating} /></p>

                            <p className='text-sm'><span className='font-bold'>Description: </span>{movie.Description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MoviesIndia;
