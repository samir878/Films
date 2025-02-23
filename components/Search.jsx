import React from 'react'

const search = ({searchTearm,setSearchTearm}) => {
  return (
    <div className='search'>
     <div> 
          <img src="/search.svg" alt="search" />
          <input type="text"
           placeholder='Search a Movie'
           value={searchTearm}
           onChange={(e)=>setSearchTearm(e.target.value)} />
     </div>
    </div>
    
  )
}

export default search

