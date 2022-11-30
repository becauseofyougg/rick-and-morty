import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urls from "../api-client/urls";
import Navbar from "./navbar";
import Pagination from "./pagination";

const HomePage = () => {
  const [characters, setCharacters] = useState(null)
  const navigate = useNavigate()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false);

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

  const getAllCharacters =  async () => {
    const resp = await axios.get(`${urls.RICK_AND_MORTY_URL}/character`);
    setData(resp.data.info.count)
    await setCharacters(resp.data.results)
  }

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
           <Pagination/>
          </>
        )}

    </div>
    </div>

  );
}

export default HomePage;
