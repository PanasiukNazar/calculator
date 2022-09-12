import React from 'react';

const SmallButtons = ({ onAddOperand, onAddOperator, removeValue }) => {
   const setValue = (event) => {
      if (event.target.hasAttribute('data-number')) {
         onAddOperand(event.target.getAttribute('data-number'));
      }

      if (event.target.hasAttribute('data-operator')) {
         onAddOperator(event.target.getAttribute('data-operator'));
      }
   };

   return (
      <div className='buttons-small' onClick={setValue}>
         <p data-number='7'>7</p>
         <p data-number='8'>8</p>
         <p data-number='9'>9</p>
         <p data-number='4'>4</p>
         <p data-number='5'>5</p>
         <p data-number='6'>6</p>
         <p data-number='1'>1</p>
         <p data-number='2'>2</p>
         <p data-number='3'>3</p>
         <p data-number='0'>0</p>
         <p data-operator='+'>+</p>
         <p data-operator='-'>-</p>
         <p data-operator='/'>/</p>
         <p data-operator='x'>x</p>
         <p data-number='.'>.</p>
         <div className='word-delete' onClick={removeValue}>
            DEL
         </div>
      </div>
   );
};

export default SmallButtons;
