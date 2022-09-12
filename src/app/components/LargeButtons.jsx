import React from 'react';

const LargeButtons = ({ cleanAll, equalResult }) => {
   return (
      <div className='buttons-large'>
         <div className='word-reset' onClick={cleanAll}>
            RESET
         </div>
         <div className='word-equal' onClick={equalResult}>
            =
         </div>
      </div>
   );
};

export default LargeButtons;
