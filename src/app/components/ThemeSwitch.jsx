import { useEffect, useState } from 'react';
import React from 'react';

const ThemeSwitch = () => {
   const [theme, setTheme] = useState('theme-dark');

   const setDarkTheme = (event) => {
      setTheme('theme-dark');
   };

   const setLightTheme = () => {
      setTheme('theme-light');
   };

   const setToxicTheme = () => {
      setTheme('theme-toxic');
   };

   useEffect(() => {
      document.body.setAttribute('class', theme);
   }, [theme]);

   return (
      <div className='choice-switch'>
         <p
            className={`choice-first ${
               theme.includes('theme-dark') ? 'active-theme' : ''
            }`}
            onClick={setDarkTheme}
         ></p>
         <p
            className={`choice-second ${
               theme.includes('theme-light') ? 'active-theme' : ''
            }`}
            onClick={setLightTheme}
         ></p>
         <p
            className={`choice-third ${
               theme.includes('theme-toxic') ? 'active-theme' : ''
            }`}
            onClick={setToxicTheme}
         ></p>
      </div>
   );
};

export default ThemeSwitch;
