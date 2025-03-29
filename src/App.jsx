import { useEffect, useState } from 'react'
import './App.css'
import Search from '../components/Search.jsx'
import Spinner from '../components/spinner.jsx';
import MovieCard from '../components/MovieCard.jsx';
 
const API_BASE_URL='https://api.themoviedb.org/3'

const  API_KEY=import.meta.VITE_TMDB_API_KEY;

const API_OPTIONS={
  method:'GET',
  header:{
    accept:'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
}
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWY3YjVlOTRmOGE0OTNjOGI0MjQyZmNhMmM1ZTU3NyIsIm5iZiI6MTc0MTI2MDA4OS44NDA5OTk4LCJzdWIiOiI2N2M5ODUzOWJhOTczZDlmN2YwY2RkNWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.JlSISIARQbhbmBpnwAKPaPd2QHtwNbT1kTxusd2C66w'
  }
};

const App=()=>{
  const[searchTearm,setSearchTearm]=useState('');
  const[errormessage,setErrormessage]=useState('');
  const[movies,setMovies]=useState([]);
  const[isLoading,setisLoading]=useState(false);
  
   const fetchMovies = async (query= '')=>{
    setisLoading(true);
    setErrormessage('');
    try{

       const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1` 
       :`${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`; 

       const response=await fetch(`https://api.themoviedb.org/3/search/movie?query${query}&include_adult=false&language=en-US&page=1`,API_OPTIONS);
      //alert(response);
       // if we waild to fetch Data
       if(!response.ok){
        throw new Error('Failed to fetch Movies');
       }
       //convert response to data
       const data =await response.json();
           //if we failed to convert data
       if(data.Response === 'false'){
        setErrormessage(  'failed to load data');
        setMovies([]);
        return;
       }
       //   if we succefuly get data 

       setMovies(data.results||[]);





    }catch(error){
          console.log(`Error fethcing Data ${error}`);
          setErrormessage('Error Fetching Movies Pleas try again');
    }finally{
      setisLoading(false);
    }
   }

  useEffect(()=>{
    fetchMovies(searchTearm);
  //   fetch(`https://api.themoviedb.org/3/search/movie?query${searchTearm}&include_adult=false&language=en-US&page=1`, options)
  // .then(res => res.json())
  // .then(res => console.log(res))
  // .catch(err => console.error(err));
   },[searchTearm]);
  return(
    <main>
      <div className='pattern'></div>
      <div className='wrapper'>
            <header>
              <img src="/Hero.png" alt="Hero Banner"></img>
              <h1> Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
              <Search searchTearm={searchTearm} setSearchTearm={setSearchTearm} />
            </header>

            <section className="all-movies">
               <h2 className='mt-[40px]'>All Movies</h2>
               {isLoading ? (
              <Spinner/>
               ):errormessage?(
                <p className='text-red-500'>{errormessage}</p>
               ):(
                <ul>
                  {movies.map((movie)=>(
                   <MovieCard key={movie.id} movie={movie}/>
                  ))}
                </ul>
               )}
            </section>

            
        
      </div>
    </main>
  )
  
}

export default App
