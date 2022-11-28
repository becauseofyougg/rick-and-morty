import React from 'react';
import Button from './button';

const Navbar: React.FC = () => {

  const isAuth = true
  return (
      <nav
        className={`sticky z-40 shadow-md w-full flex justify-center absolute top-0 left-0 select-none bg-white`}
      >
        <div className="w-full md:h-20 py-6 flex md:flex-row flex-col justify-between z-40">
          <div
            className="md:h-full w-full flex justify-between md:justify-end items-center"
          > 
          {isAuth ? (
          <Button text={'Signup'} children={undefined} />
          ) : (
              <>
                <Button text={'Logout'} children={undefined} />
                <Button text={'Logout'} children={undefined} />
              </>
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
