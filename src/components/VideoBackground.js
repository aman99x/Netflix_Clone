import React from 'react';
import useMovieById from '../hooks/useMovieById';  
import { useSelector } from 'react-redux';

const VideoBackground = ({ movieId, bool }) => {
  const trailerMovie = useSelector(store => store.movie.trailerMovie);

  useMovieById(movieId);

  // Check if trailerMovie exists and has a key before rendering the iframe
  if (trailerMovie && trailerMovie.key) {
    return (
      <div className="w-screen">
        <iframe
          className={`${bool ? "w-[40%] h-[60%]" :  "w-screen aspect-video" } `}
          src={`https://www.youtube.com/embed/${trailerMovie.key}?si=16741tMcTQrgKuGF&autoplay=1&mute=1`}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen></iframe>
      </div>
    );
  } else {
    return null;
  }
};

export default VideoBackground;
