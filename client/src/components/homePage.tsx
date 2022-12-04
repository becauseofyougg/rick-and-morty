import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "./navbar";
import Pagination from "./pagination";

const HomePage = () => {
  const [characters, setCharacters] = useState(null)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [isPrev, setIsPrev] = useState(false)
  const [isNext, setIsNext] = useState(false)

  const [currentPage, setCurrentPage] = React.useState(
    +searchParams.get("page")
  );

  const getAllCharacters =  async () => {
    const resp  = await axios.get(`https://rickandmortyapi.com/api/character/?${searchParams}`)
    if(resp.data.info.next) {
      setIsNext(true)
    }
    if(resp.data.info.prev) {
      setIsPrev(true)
    }
    console.log(resp)
    await setCharacters(resp.data.results)
  }

  const checkSearchParams = () => {
    const prevPage = `page=2`
    if(currentPage === 0) {
      setSearchParams(prevPage)
    } 
  }

  const goToPrevPage = async () => {
      checkSearchParams()
      setCurrentPage(prev => --prev)
      const prevPage = `page=${currentPage}`
      setSearchParams(prevPage)
      await getAllCharacters()
  }
  const goToNextPage = async () => {
      checkSearchParams()
      setCurrentPage(prev => ++prev)
      const nextPage = `page=${currentPage}`
      setSearchParams(nextPage)
      await getAllCharacters()
  }

  useEffect(() => {
    setLoading(true)
    try {      
      getAllCharacters();
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  },[])


  return (
    <div className="">
      <Navbar />
      <div className="flex flex-row gap-5 flex-wrap justify-center py-10">
        {(loading || !characters) ? <h2>Loading ...</h2> : (
          <>

            {characters.map((character) => {
              return (                
                <div key={character.id} className="p-5 rounded-lg border-rose-500 border-2 hover:scale-105" onClick={(() => {navigate(`/character/${character.id}`)})}>
                <div>{character.name}</div>
                <img src={character.image} alt={character.name} /> 
            </div>          
              )        
            })}          
          </>
        )}
        </div>
      {!(loading || !characters) && 
        <Pagination goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} isPrev={isPrev} isNext={isNext}/>
      }
    </div>

  );
}

export default HomePage;
