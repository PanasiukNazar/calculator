import React, { useContext, useState } from 'react';

const ResultValues = ({ firstValue, operator, secondValue }) => {
   return (
      <div className='result-backdown'>
         <div data-value='previouse-operand' className='result-numbers'>
            {firstValue}
         </div>
         <div data-value='operator' className='result-numbers'>
            {operator}
         </div>
         <div data-value='next-operand' className='result-numbers'>
            {secondValue}
         </div>
      </div>
   );
};

export default ResultValues;
