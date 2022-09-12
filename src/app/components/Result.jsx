import React from 'react';
import ResultValues from './ResultValues.jsx';

const Result = ({ firstValue, operator, secondValue }) => {
   return (
      <div className='result'>
         <ResultValues
            firstValue={firstValue}
            operator={operator}
            secondValue={secondValue}
         />
      </div>
   );
};

export default Result;
