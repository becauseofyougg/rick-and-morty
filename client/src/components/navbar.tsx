import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiReqs from '../api-client/api-reqs';
import Button from './button';

const Navbar: React.FC = () => {
  const navigate = useNavigate(); 
  const goToSignup =  () => {
    let path = `/auth?page=signup`; 
    navigate(path);
  }
  const goToLogin =  () => {
    let path = `/auth?page=login`; 
    navigate(path);
  }
  const logOut = async () => {
    await apiReqs.logout()
  }

  useEffect(() => {
    sessionStorage.getItem('token')
  },[]) 

  const isAuth = false
  return (
      <nav
        className={`sticky z-40 shadow-md w-full flex justify-center absolute top-0 left-0 select-none bg-white`}
      >
        <div className="w-full md:h-20 py-6 flex md:flex-row flex-col justify-between z-40">
          <div
            className="md:h-full w-full flex justify-between md:justify-end items-center"
          > 
          {!isAuth ? (
            <div className='flex gap-5 mr-10'>
              <Button text={'Signup'} children={undefined} onClick={goToSignup} />
              <Button text={'Login'} children={undefined} onClick={goToLogin} />
            </div>
          ) : (
            <div className='flex gap-5 mr-10 items-center'>
              <p>qweqwewqewq</p>
              <Button text={'Logout'} children={undefined} onClick={logOut} />
            </div>
                
          )}
          </div>
         
          </div>
            <>
              <div
                className="hidden md:flex justify-between 
                   relative right-[104px]"
                   >
                  <div>
                    <div className="md:pt-0 md:pb-0 w-full md:h-full items-center flex md:flex-row flex-col justify-between md:justify-end md:flex">
                    </div>
                  </div>
              </div>
              <div className="md:hidden">                
                  <div className="md:pt-0 md:pb-0 w-full md:h-full items-center flex md:flex-row flex-col justify-between md:justify-end md:flex">                    
                      <>
                          <div >About</div>
                          <div className={`lg:mx-[30px] md:mx-[30px]`}>
                            How it works
                          </div>       
                      </>                    
                  </div>
                </div>
              </>
      </nav>
  );
};

export default Navbar;
