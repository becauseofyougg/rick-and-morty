import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import urls from '../api-client/urls';
import axios from 'axios';
import Button from '../shared/ui/button';
import { observer } from 'mobx-react';
import { getOneCharacter } from '../api-client/apiReqs';
import { SingleCharacterInfo } from 'types/api';

const CharacterPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [character, setCharacter] = useState<SingleCharacterInfo[] | null>(null);
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetOneCharacter = async () => {
    setLoading(true);
    try {
      if (!id) return;
      const respCharacater: SingleCharacterInfo = await getOneCharacter(id);
      setCharacter([respCharacater]);
      const locationNumber = respCharacater.location.url.substring(
        respCharacater.location.url.indexOf('/location/') + 10
      );
      const respLocation = await axios.get(
        `${urls.RICK_AND_MORTY_URL}/location/${+locationNumber}`
      );
      setLocation(respLocation.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetOneCharacter();
  }, []);

  return (
    <div className="p-5 flex items-center justify-center w-full h-screen bg-gray-200 realtive">
      <div className="absolute top-[30px] left-[30px]" onClick={() => navigate(-1)}>
        <Button text={'Back'} />
      </div>

      {!(character && location && !loading) ? (
        <h2>Loading ...</h2>
      ) : (
        character.map((character: any) => {
          return (
            <div
              key={character.id}
              className="flex flex-col gap-4 text-lg p-10 border-double border-4 border-sky-500 rounded-xl bg-white"
            >
              <div>Name: {character.name}</div>
              <div>Species: {character.species}</div>
              <img src={character.image} alt={character.name} />
              <div>Status: {character.status}</div>
              <div>Location: {character.location.name}</div>
              <div>Location type: {location.type}</div>
              <div>Location dimension: {location.dimension}</div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default observer(CharacterPage);
