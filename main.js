const $choiceSwitch = document.querySelector('.choice-switch');
const $result = document.querySelector('.result');
const $smallButtons = document.querySelector('.buttons-small');
const $equal = document.querySelector('.word-equal');
const $delete = document.querySelector('.word-delete');
const $reset = document.querySelector('.word-reset');

const AVILABLE_THEME = {
   first: 'theme-dark',
   second: 'theme-light',
   third: 'theme-toxic',
};

const AVILABLE_OPERANDS = {
   addition: '+',
   subtraction: '-',
   multiplication: 'x',
   division: '/',
};

const state = {
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
};

state.onChange(renderTheme);
state.onChange(renderResult);

// Listeners

$choiceSwitch.addEventListener('click', (event) => {
   if (event.target.hasAttribute('data-theme')) {
      state.setCurrentTheme(event.target.getAttribute('data-theme'));
   }
});

$smallButtons.addEventListener('click', (event) => {
   if (event.target.hasAttribute('data-number')) {
      state.setOperand(event.target.getAttribute('data-number'));
   }
   if (event.target.hasAttribute('data-operator')) {
      state.setOperator(event.target.getAttribute('data-operator'));
   }
});

$equal.addEventListener('click', () => {
   state.equalResult();
   state.cleanOperands();
});

$reset.addEventListener('click', () => state.cleanAll());

$delete.addEventListener('click', () => state.sliceOneSign());

// Renderers

function renderTheme(state) {
   document.body.classList = state.current.theme;
   $choiceSwitch.innerHTML = `
        <p class=" choice-first ${
           state.current.theme === AVILABLE_THEME.first ? 'active-theme' : ''
        }" data-theme="${AVILABLE_THEME.first}"></p>
        <p class=" choice-second ${
           state.current.theme === AVILABLE_THEME.second ? 'active-theme' : ''
        }" data-theme="${AVILABLE_THEME.second}"></p>
        <p class=" choice-third ${
           state.current.theme === AVILABLE_THEME.third ? 'active-theme' : ''
        }" data-theme="${AVILABLE_THEME.third}"></p>
            `;
}

function renderResult(state) {
   $result.innerHTML = `
   <div class="result-backdown">
      <div data-previouse-number="first" class="result-numbers">${state.current.previousOperand}</div>
      <div data-operator="operator" class="result-numbers">${state.current.operator}</div>
      <div data-next-number="second"  class="result-numbers">${state.current.nextOperand}</div>
   </div>
    `;
}

state.changed();
