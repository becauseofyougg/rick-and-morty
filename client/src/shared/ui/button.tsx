import React from 'react';

type PropsType = {
  text: string | undefined;
  onClick?: (e: any) => void;
  children?: any;
};

const Button: React.FC<PropsType> = ({ text, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-[110px] h-[56px] text-lg md:text-xl rounded-xl bg-blue-400 justify-center text-white bg-gradient-to-r hover:from-blue-400 hover:to-blue-800 active:from-blue-800 active:to-blue-800`}
    >
      <span>{text}</span>
      {children}
    </button>
  );
};

export default Button;
