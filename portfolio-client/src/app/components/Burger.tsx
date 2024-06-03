'use client';

import React, { useState } from 'react';
import Menu from './Menu';

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)} 
        className={`lg:hidden flex flex-col justify-center items-center z-20  ${isOpen ? 'fixed top-8 right-10' : ''}`}
      >
        <span
          className={`bg-steel-500 block transition-all duration-300
            ease-out h-0.5 w-6 rounded-sm bg-textSecondary ${isOpen ? 
            'rotate-45 translate-y-1' : '-translate-y-0.5'
            }`} 
        >
        </span>
        <span
          className={`bg-steel-500 block transition-all duration-300
          ease-out h-0.5 w-6 rounded-sm bg-textSecondary my-0.5 ${isOpen ? 
            'opacity-0' : 'opacity-100'
            }`} >
        </span>
        <span
          className={`bg-steel-500 block transition-all duration-300
            ease-out h-0.5 w-6 rounded-sm bg-textSecondary ${isOpen ? 
            '-rotate-45 -translate-y-1' : 'translate-y-0.5'
            }`} >
        </span>    
    
      </button>
      <Menu isOpen={isOpen} />
    </>
  );
};

export default Burger;