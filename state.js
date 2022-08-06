import { AVILABLE_THEME, AVILABLE_OPERANDS } from './constants.js';

export const createState = () => ({
   current: {
      previousOperand: '',
      nextOperand: '',
      operator: '',
      theme: AVILABLE_THEME.first,
   },

   _listeners: [],

   onChange(listener) {
      this._listeners.push(listener);
   },

   changed() {
      this._listeners.forEach((listener) => listener(this));
   },

   setCurrentTheme(mode) {
      this.current.theme = mode;
      this.changed();
   },

   setOperand(operand) {
      if (operand === '.' && this.hasPoint()) {
         return;
      }
      if (this.current.operator === '') {
         this.current.previousOperand += operand;
      }
      if (this.current.operator !== '') {
         this.current.nextOperand += operand;
      }
      this.changed();
   },

   hasPoint() {
      const isPreviousOperandPoint =
         state.current.operator == '' &&
         state.current.previousOperand.includes('.');

      const isNextOperandPoint =
         state.current.nextOperand.includes('.') &&
         state.current.operator !== '';

      return isPreviousOperandPoint || isNextOperandPoint;
   },

   setOperator(operator) {
      this.setSecondOperator();

      if (this.current.previousOperand !== '') {
         this.current.operator = operator;
      }
      this.changed();
   },

   setSecondOperator() {
      if (this.current.nextOperand !== '') {
         this.equalResult();
         this.cleanOperands();
      }
      this.changed();
   },

   equalResult() {
      switch (this.current.operator) {
         case AVILABLE_OPERANDS.addition:
            this.current.previousOperand =
               +this.current.previousOperand + +this.current.nextOperand;
            break;
         case AVILABLE_OPERANDS.subtraction:
            this.current.previousOperand =
               this.current.previousOperand - this.current.nextOperand;
            break;
         case AVILABLE_OPERANDS.multiplication:
            this.current.previousOperand =
               this.current.previousOperand * this.current.nextOperand;
            break;
         case AVILABLE_OPERANDS.division:
            this.current.previousOperand =
               this.current.previousOperand / this.current.nextOperand;
            break;
         default:
            return;
      }
      this.changed();
   },

   sliceOneSign() {
      if (this.current.nextOperand !== '') {
         this.current.nextOperand = this.current.nextOperand.slice(0, -1);
      } else if (this.current.operator !== '') {
         this.current.operator = this.current.operator.slice(0, -1);
      } else if (this.current.previousOperand !== '') {
         this.current.previousOperand = this.current.previousOperand
            .toString()
            .slice(0, -1);
      }
      this.changed();
   },

   cleanOperands() {
      this.current.nextOperand = '';
      this.current.operator = '';
      this.changed();
   },

   cleanAll() {
      this.current.previousOperand = '';
      this.cleanOperands();
   },
});
