import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Character = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [location, setLocation] = useState(null)
  const api = `https://rickandmortyapi.com/api`
  
  useEffect(() => {
    getOneCharacter()
  },[])

  const getOneCharacter =  async () => {
    const respCharacater = await axios.get(`${api}/character/${id}`);
    await setCharacter([respCharacater.data])
    const locationNumber = respCharacater.data.location.url.substring(respCharacater.data.location.url.indexOf('/location/') + 10);
    const respLocation = await axios.get(`${api}/location/${+locationNumber}`);
    setLocation(respLocation.data)
  }
  return (
    <div>
      {character && location &&  character.map((character) => {
        return (
          <div key={character.id}>
            <div>Name: {character.name}</div>
            <div>Species: {character.species}</div>
            <img src={character.image} alt={character.name} />
            <div>Status: {character.status}</div>
            <div>Location: {character.location.name}</div>
            <div>Location type: {location.type}</div>
            <div>Location dimension: {location.dimension}</div>
            <div>Created at: {character.created}</div>
          </div>          
        )        
      })}
    </div>
  );
}

export default Character;
