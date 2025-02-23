import { useEffect, useState } from 'react'
import './App.css'
import Search from '../components/Search.jsx'



const App=()=>{
  const[searchTearm,setSearchTearm]=useState('');
  return(
    <main>
      <div className='pattern'></div>
      <div className='wrapper'>
            <header>
              <img src="/Hero.png" alt="Hero Banner"></img>
              <h1> Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
            </header>

            <Search searchTearm={searchTearm} setSearchTearm={setSearchTearm} />
           <h1>{searchTearm}</h1>
      </div>
    </main>
  )
  
}

export default App
