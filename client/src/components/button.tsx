import React from 'react';

type PropsType = {
  text: string | undefined;
//   onClick?: OnClickHandler;
  onClick?: any;
  classNameText?: string;
  children: any;
};

const Button: React.FC<PropsType> = ({
  text,
  onClick,
  children,
  classNameText,
}) => {
  
  return (
    <button
          onClick={onClick}
          className={`w-[110px] h-[56px] text-lg md:text-xl rounded-xl bg-blue-400 justify-center text-white bg-gradient-to-r hover:from-blue-400 hover:to-blue-800 active:from-blue-800 active:to-blue-800`}
        >
            <span className={classNameText}>{text}</span>     
          {children}
        </button>    
  );
};

export default Button;
