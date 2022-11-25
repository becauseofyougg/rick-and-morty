import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [characters, setCharacters] = useState(null)
  const [pagesCount, setPagesCount] = useState(null)
  const api = `https://rickandmortyapi.com/api`
  
  useEffect(() => {
    getAllCharacters();
  },[])

  const navigate = useNavigate()

  const getAllCharacters =  async () => {
    const resp = await axios.get(`${api}/character`);
    await setPagesCount(resp.data.info.pages)
    await setCharacters(resp.data.results)
  }
  return (
    <div>
      <div className="flex flex-row gap-5 flex-wrap justify-center">
      {characters && characters.map((character) => {
        return (
          <div key={character.id} onClick={(() => {navigate(`/${character.id}`)})}>
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
