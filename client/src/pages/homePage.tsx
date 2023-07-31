import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Pagination from '../components/pagination';
import { observer } from 'mobx-react';
import { getAllCharacters, getPageWithCharacters } from '../api-client/apiReqs';
import { userStore } from '../stores';

const HomePage = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<any>(null);
  const [isPrev, setIsPrev] = useState<string>('');
  const [isNext, setIsNext] = useState<string>('');

  const setPageData = async (resp: any) => {
    await setIsNext(resp.info.next);
    await setIsPrev(resp.info.prev);
    await setCharacters(resp.results);
  };

  const handleGetAllCharacters = async () => {
    try {
      const resp = await getAllCharacters();
      console.log(resp);
      setPageData(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const goToPrevPage = async () => {
    userStore.toggleLoader(true);
    try {
      const resp = await getPageWithCharacters(isPrev);
      setPageData(resp);
    } catch (error) {
      console.log(error);
    } finally {
      userStore.toggleLoader(false);
    }
  };

  const goToNextPage = async () => {
    userStore.toggleLoader(true);
    try {
      const resp = await getPageWithCharacters(isNext);
      setPageData(resp);
    } catch (error) {
      console.log(error);
    } finally {
      userStore.toggleLoader(false);
    }
  };

  useEffect(() => {
    userStore.toggleLoader(true);
    try {
      handleGetAllCharacters();
    } catch (err) {
      console.log(err);
    } finally {
      userStore.toggleLoader(false);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-row gap-5 flex-wrap justify-center py-10">
        {userStore.isLoading ? (
          <h2>Loading ...</h2>
        ) : (
          <>
            {characters &&
              characters.map((character: any) => {
                return (
                  <div
                    key={character.id}
                    className="p-5 rounded-lg border-rose-500 border-2 hover:scale-105"
                    onClick={() => {
                      navigate(`/character/${character.id}`);
                    }}
                  >
                    <div>{character.name}</div>
                    <img src={character.image} alt={character.name} />
                  </div>
                );
              })}
          </>
        )}
      </div>
      {!userStore.isLoading ? (
        <Pagination
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
          isPrev={!!isPrev}
          isNext={!!isNext}
        />
      ) : null}
    </>
  );
};

export default observer(HomePage);
