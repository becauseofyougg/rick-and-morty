import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../stores';
import Button from './button';
import { observer } from 'mobx-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [showBio, setShowBio] = useState(false);
  const [bio, setBio] = useState('');

  const goToSignup = () => {
    let path = `/auth?page=signup`;
    navigate(path);
  };

  const goToLogin = () => {
    let path = `/auth?page=login`;
    navigate(path);
  };

  const logOut = async () => {
    await userStore.handleLogout();
  };

  useEffect(() => {
    const sesStoreBio = localStorage.getItem('bio');
    sesStoreBio && setBio(sesStoreBio);
  }, []);

  return (
    <nav
      className={`sticky z-40 shadow-md w-full flex justify-center absolute top-0 left-0 select-none bg-white`}
    >
      <div className="w-full md:h-20 py-6 flex md:flex-row flex-col justify-between z-40">
        <div className="md:h-full w-full flex gap-10 justify-between md:justify-end items-center relative">
          {userStore.user?.email != null && (
            <span>Your name is {userStore.user?.email?.split('@')[0]}</span>
          )}
          {localStorage.getItem('bio') !== null && (
            <Button text={'Your bio'} onClick={() => setShowBio((prev) => !prev)}>
              {showBio && (
                <div className="p-6 rounded-lg shadow-lg bg-white absolute top-16 w-[160px] break-words">
                  <span className="text-black">{bio}</span>
                </div>
              )}
            </Button>
          )}

          {!userStore.isAuth ? (
            <div className="flex gap-5 mr-10">
              <Button text={'Signup'} onClick={goToSignup} />
              <Button text={'Login'} onClick={goToLogin} />
            </div>
          ) : (
            <div className="flex gap-5 mr-10 items-center">
              <p>{localStorage.getItem('email')}</p>
              <Button text={'Logout'} onClick={logOut} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default observer(Navbar);
