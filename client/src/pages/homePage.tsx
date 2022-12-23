import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Pagination from "../components/pagination";
import apiReqs from "../api-client/api-reqs";

const HomePage = () => {
  const navigate = useNavigate()
  const [characters, setCharacters] = useState(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [isPrev, setIsPrev] = useState<string>('')
  const [isNext, setIsNext] = useState<string>('')


  const setPageData = async (resp) => {
    setIsNext(resp.data.info.next)
    setIsPrev(resp.data.info.prev)
    await setCharacters(resp.data.results)
  }

  const getAllCharacters =  async () => {
    try{
    const resp  = await apiReqs.getAllCharacters()   
    setPageData(resp)
  } catch (error) {
    console.log(error)
  }}

  const goToPrevPage = async () => {
    try{
    const resp  = await apiReqs.getPageWithCharacters(isPrev)
    setPageData(resp)
  } catch (error) {
    console.log(error)
  }}

  const goToNextPage = async () => {
    try{
    const resp = await apiReqs.getPageWithCharacters(isNext)
    setPageData(resp)
  } catch (error) {
    console.log(error)
  }}

  useEffect( () => {
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
    <>
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
        <Pagination goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} isPrev={!!isPrev} isNext={!!isNext}/>
      }
    </>

  );
}

export default HomePage;
