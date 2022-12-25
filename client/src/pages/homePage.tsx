import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Pagination from "../components/pagination";
import apiReqs from "../api-client/api-reqs";
import { observer } from "mobx-react";

const HomePage = () => {
  const navigate = useNavigate()
  const [characters, setCharacters] = useState(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [isPrev, setIsPrev] = useState<string>('')
  const [isNext, setIsNext] = useState<string>('')


  const setPageData = (resp) => {
    setIsNext(resp.data.info.next)
    setIsPrev(resp.data.info.prev)
    setCharacters(resp.data.results)
  }

  const getAllCharacters =  async () => {
    try{
    const resp  = await apiReqs.getAllCharacters()   
    setPageData(resp)
  } catch (error) {
    console.log(error)
  }}

  const goToPrevPage = async () => {
    setLoading(true)
    try{
    const resp  = await apiReqs.getPageWithCharacters(isPrev)
    setPageData(resp)
  } catch (error) {
    console.log(error)
  }finally {
    setLoading(false)
  }
}

  const goToNextPage = async () => {
    setLoading(true)
    try{
    const resp = await apiReqs.getPageWithCharacters(isNext)
    setPageData(resp)
  } catch (error) {
    console.log(error)
  }finally {
    setLoading(false)
  }
}

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
        {loading ? <h2>Loading ...</h2> : (
          <>
            {characters?.map((character) => {
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
      {!loading ?
        <Pagination goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} isPrev={!!isPrev} isNext={!!isNext}/> : null
      }
    </>

  );
}

export default observer(HomePage);
