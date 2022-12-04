import React from 'react'
import Button from './button';

type Props = {
    goToPrevPage: () => void;
    goToNextPage: () => void;
    isNext: boolean;
    isPrev: boolean;
}

const Pagination: React.FC<Props> = ({ goToPrevPage, goToNextPage, isNext, isPrev }) => {      
  return (
    <nav aria-label="Page-navigation" className='flex justify-center mb-20'>
        <ul className="flex gap-10">           
            {isPrev &&<Button text={'Previous'} onClick={goToPrevPage} />}
            {isNext &&<Button text={'Next'} onClick={goToNextPage} />}
        </ul>
    </nav>
  )
}
export default Pagination;