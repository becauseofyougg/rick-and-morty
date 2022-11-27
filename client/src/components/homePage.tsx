import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RICK_AND_MORTY_URL } from "~/api-client/urls";

const HomePage = () => {
  const [characters, setCharacters] = useState(null)
  const [pagesCount, setPagesCount] = useState(null)   
  
  useEffect(() => {
    getAllCharacters();
  },[])

  const navigate = useNavigate()

  const getAllCharacters =  async () => {
    const resp = await axios.get(`${RICK_AND_MORTY_URL}/character`);
    await setPagesCount(resp.data.info.pages)
    await setCharacters(resp.data.results)
  }
  return (
    <div>
      <div className="flex flex-row gap-5 flex-wrap justify-center">
      {characters && characters.map((character) => {
        return (
          <div key={character.id} onClick={(() => {navigate(`/character/${character.id}`)})}>
            <div>{character.name}</div>
            <div>{character.species}</div>
            <img src={character.image} alt={character.name} /> 
          </div>          
        )        
      })}
    </div>
    </div>

  );
}

export default HomePage;
