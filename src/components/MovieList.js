import React from "react";
import MovieCart from "./MovieCart";

const MovieList = ({title, movies, searchMovie=false}) =>{
    if (!movies) {
        return <div>No movies available</div>;
    }
    return(
        <div className="px-8">
            <h1 className={`${searchMovie? "text-black":"text-white"} text-3xl py-3 text-white`}>{title}</h1>
            <div className="flex overflow-x-auto cursor-pointer">
                <div className="flex items-center">
                    {
                        movies?.map((movie)=>{
                            return(
                                <MovieCart key={movie.id} movieId={movie.id} posterPath={movie.poster_path}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
} 
export default MovieList