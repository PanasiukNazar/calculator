import React, { useCallback, useState } from 'react';
import SmallButtons from './SmallButtons.jsx';
import LargeButtons from './LargeButtons.jsx';

const Buttons = ({
   onAddOperand,
   onAddOperator,
   removeValue,
   cleanAll,
   equalResult,
}) => {
   return (
      <div className='buttons'>
         <SmallButtons
            onAddOperand={onAddOperand}
            onAddOperator={onAddOperator}
            removeValue={removeValue}
         />
         <LargeButtons cleanAll={cleanAll} equalResult={equalResult} />
      </div>
   );
};

export default Buttons;
