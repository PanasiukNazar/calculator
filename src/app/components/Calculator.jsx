import React, { useState, useContext } from 'react';
import Header from './Header.jsx';
import Result from './Result.jsx';
import Buttons from './Buttons.jsx';

const Calculator = () => {
   const [firstValue, setFirstValue] = useState('');
   const [operator, setOperator] = useState('');
   const [secondValue, setSecondValue] = useState('');

   const firstValueToNumber = parseFloat(firstValue);
   const secondValueToNumber = parseFloat(secondValue);

   const addOperand = (operand) => {
      if (operand == '.' && firstValue.includes('.')) {
         return;
      }
      if (operator === '') {
         setFirstValue(firstValue + operand);
      }

      if (operand == '.' && secondValue.includes('.')) {
         return;
      }
      if (operator !== '') {
         setSecondValue(secondValue + operand);
      }
   };

   const addOperator = (value) => {
      if (firstValue !== '') {
         setOperator(value);
      }
      if (operator !== '') {
         equalResult();
      }
   };

   const removeValue = () => {
      if (secondValue !== '') {
         setSecondValue(secondValue.slice(0, -1));
      }
      if (secondValue === '') {
         setOperator(operator.slice(0, -1));
      }
      if (operator === '') {
         setFirstValue(firstValue.toString().slice(0, -1));
      }
   };

   const cleanAll = () => {
      setFirstValue('');
      setOperator('');
      setSecondValue('');
   };

   const equalResult = () => {
      switch (operator) {
         case '+':
            setFirstValue(firstValueToNumber + secondValueToNumber);
            setSecondValue('');
            setOperator('');
            break;

         case '-':
            setFirstValue(firstValueToNumber - secondValueToNumber);
            setSecondValue('');
            setOperator('');
            break;

         case 'x':
            setFirstValue(firstValueToNumber * secondValueToNumber);
            setSecondValue('');
            setOperator('');
            break;

         case '/':
            setFirstValue(firstValueToNumber / secondValueToNumber);
            setSecondValue('');
            setOperator('');
            break;

         default:
            undefined;
      }
   };

   return (
      <div className='main'>
         <Header />
         <Result
            firstValue={firstValue}
            operator={operator}
            secondValue={secondValue}
         />
         <Buttons
            onAddOperand={addOperand}
            onAddOperator={addOperator}
            removeValue={removeValue}
            cleanAll={cleanAll}
            equalResult={equalResult}
         />
      </div>
   );
};

export default Calculator;
