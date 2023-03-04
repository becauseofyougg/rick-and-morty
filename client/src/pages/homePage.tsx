import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Pagination from '../components/pagination';
import apiReqs from '../api-client/apiReqs';
import { observer } from 'mobx-react';
import { userStore } from 'src/stores';

const HomePage = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState(null);
  const [isPrev, setIsPrev] = useState<string>('');
  const [isNext, setIsNext] = useState<string>('');

  const setPageData = (resp) => {
    setIsNext(resp.data.info.next);
    setIsPrev(resp.data.info.prev);
    setCharacters(resp.data.results);
  };

  const getAllCharacters = async () => {
    try {
      const resp = await apiReqs.getAllCharacters();
      setPageData(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const goToPrevPage = async () => {
    userStore.toggleLoader(true);
    try {
      const resp = await apiReqs.getPageWithCharacters(isPrev);
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
      const resp = await apiReqs.getPageWithCharacters(isNext);
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
      getAllCharacters();
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
            {characters?.map((character) => {
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
