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

const state = {
   current: {
      previouseOperand: '',
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

   setPreviouseOperand(operand) {
      this.current.previouseOperand += operand;
      this.changed();
   },

   setNextOperand(operand) {
      this.current.nextOperand += operand;
      this.changed();
   },

   setOperator(operator) {
      this.current.operator = operator;
      this.changed();
   },

   equalResult() {
      switch (this.current.operator) {
         case '+':
            this.current.previouseOperand =
               +this.current.previouseOperand + +this.current.nextOperand;
            break;
         case '-':
            this.current.previouseOperand =
               this.current.previouseOperand - this.current.nextOperand;
            break;
         case 'x':
            this.current.previouseOperand =
               this.current.previouseOperand * this.current.nextOperand;
            break;
         case '/':
            this.current.previouseOperand =
               this.current.previouseOperand / this.current.nextOperand;
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
      } else if (this.current.previouseOperand !== '') {
         this.current.previouseOperand = this.current.previouseOperand
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
      this.current.previouseOperand = '';
      this.cleanOperands();
   },
};

state.onChange(renderTheme);
state.onChange(renderResult);

// Listeners

$choiceSwitch.addEventListener('click', (event) => {
   if (event.target.hasAttribute('data-theme')) {
      document.body.classList.remove(state.current.theme);
      state.setCurrentTheme(event.target.getAttribute('data-theme'));
      document.body.classList.add(state.current.theme);
   }
});

$smallButtons.addEventListener('click', (event) => {
   // Set Point Once

   if (
      event.target.getAttribute('data-number') === '.' &&
      state.current.previouseOperand.includes('.') &&
      state.current.operator === ''
   )
      return;

   if (
      event.target.getAttribute('data-number') === '.' &&
      state.current.nextOperand.includes('.') &&
      state.current.operator !== ''
   )
      return;

   //

   // Set Previouse Operand

   if (
      event.target.hasAttribute('data-number') &&
      state.current.operator === ''
   ) {
      state.setPreviouseOperand(event.target.getAttribute('data-number'));
   }
   //

   // Set Next Operand

   if (
      event.target.hasAttribute('data-number') &&
      state.current.operator !== ''
   ) {
      state.setNextOperand(event.target.getAttribute('data-number'));
   }
   //

   // Set Operator

   if (
      event.target.hasAttribute('data-operator') &&
      state.current.nextOperand !== ''
   ) {
      state.equalResult();
      state.cleanOperands();
      state.setOperator(event.target.textContent);
   }

   if (
      event.target.hasAttribute('data-operator') &&
      state.current.previouseOperand !== ''
   ) {
      state.setOperator(event.target.getAttribute('data-operator'));
   }
   //
});

$equal.addEventListener('click', () => {
   state.equalResult();
   state.cleanOperands();
});

$reset.addEventListener('click', () => {
   state.cleanAll();
});

$delete.addEventListener('click', () => {
   state.sliceOneSign();
});

// Renderers

function renderTheme(state) {
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
      <div data-previouse-number="first" class="result-numbers">${state.current.previouseOperand}</div>
      <div data-operator="operator" class="result-numbers">${state.current.operator}</div>
      <div data-next-number="second"  class="result-numbers">${state.current.nextOperand}</div>
   </div>
    `;
}

state.changed();
