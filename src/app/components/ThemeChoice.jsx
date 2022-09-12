import React from 'react';
import ThemeSwitch from './ThemeSwitch.jsx';

const ThemeChoice = () => {
   return (
      <div className='theme-choice'>
         <div className='choice-number'>
            <span>1</span>
            <span>2</span>
            <span>3</span>
         </div>
         <ThemeSwitch />
      </div>
   );
};

export default ThemeChoice;
