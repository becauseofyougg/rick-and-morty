import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Character = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const api = `https://rickandmortyapi.com/api`
  
  useEffect(() => {
    getOneCharacter()
  },[])

  const getOneCharacter =  async () => {
    const resp = await axios.get(`${api}/character/${id}`);
    await setCharacter([resp.data])
  }
  return (
    <div>
      {character && character.map((character) => {
        return (
          <div key={character.id}>
            <div>{character.name}</div>
            <div>{character.species}</div>
            <img src={character.image} alt={character.name} /> 
          </div>          
        )        
      })}
    </div>
  );
}

export default Character;
