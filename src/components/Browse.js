import { useEffect } from 'react';
import Header from './Header';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import MainContainer from './MainContainer';
import MovieContainer from './MovieContainer';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import SearchMovie from './SearchMovie';


const Browse = () => {
    const user = useSelector(store => store.app.user);
    const toggle = useSelector(store => store.movie.toggle);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    //my custom hooks
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    useEffect(()=>{
        if(!user){
            navigate('/');
        }
    },[])

    

    return(
        <>
         <Header/>
         <div>
            {
                toggle ? <SearchMovie/> :(
                    <>
                    <MainContainer/>
                    <MovieContainer/>
                    </>
                )
            }        
         </div>
        </>
    )
        
}

export default Browse