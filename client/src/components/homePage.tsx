import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urls from "../api-client/urls";
import Navbar from "./navbar";

const HomePage = () => {
  const [characters, setCharacters] = useState(null)
  const [pagesCount, setPagesCount] = useState(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    getAllCharacters();
  },[])

  const getAllCharacters =  async () => {
    const resp = await axios.get(`${urls.RICK_AND_MORTY_URL}/character`);
    await setPagesCount(resp.data.info.pages)
    await setCharacters(resp.data.results)
  }

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-row gap-5 flex-wrap justify-center py-10">
      {characters && characters.map((character) => {
        return (
          <div key={character.id} className="p-5 rounded-lg border-rose-500 border-2" onClick={(() => {navigate(`/character/${character.id}`)})}>
            <div>{character.name}</div>
            <img src={character.image} alt={character.name} /> 
          </div>          
        )        
      })}
    </div>
    </div>

  );
}

export default HomePage;
