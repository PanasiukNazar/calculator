import { AVILABLE_THEME } from './constants.js';

export const bindDom = (state) => {
   setupListeners(state);
   setupRenderers(state);
};

const $choiceSwitch = document.querySelector('.choice-switch');
const $result = document.querySelector('.result');
const $smallButtons = document.querySelector('.buttons-small');
const $equal = document.querySelector('.word-equal');
const $delete = document.querySelector('.word-delete');
const $reset = document.querySelector('.word-reset');

// Listeners

const setupListeners = (state) => {
   $choiceSwitch.addEventListener('click', (event) => {
      choiceTheme(event, state);
   });

   $smallButtons.addEventListener('click', (event) => {
      setSigns(event, state);
   });

   $equal.addEventListener('click', () => {
      equalResult(state);
   });

   $reset.addEventListener('click', () => state.cleanAll());

   $delete.addEventListener('click', () => state.sliceOneSign());
};

const choiceTheme = (event, state) => {
   if (event.target.hasAttribute('data-theme')) {
      state.setCurrentTheme(event.target.getAttribute('data-theme'));
   }
};

const setSigns = (event, state) => {
   if (event.target.hasAttribute('data-number')) {
      state.setOperand(event.target.getAttribute('data-number'));
   }
   if (event.target.hasAttribute('data-operator')) {
      state.setOperator(event.target.getAttribute('data-operator'));
   }
};

const equalResult = (state) => {
   state.equalResult();
   state.cleanOperands();
};

// Renderers

const setupRenderers = (state) => {
   state.onChange(renderTheme);
   state.onChange(renderResult);

   function renderTheme(state) {
      document.body.classList = state.current.theme;
      $choiceSwitch.innerHTML = `
            <p class=" choice-first ${
               state.current.theme === AVILABLE_THEME.first
                  ? 'active-theme'
                  : ''
            }" data-theme="${AVILABLE_THEME.first}"></p>
            <p class=" choice-second ${
               state.current.theme === AVILABLE_THEME.second
                  ? 'active-theme'
                  : ''
            }" data-theme="${AVILABLE_THEME.second}"></p>
            <p class=" choice-third ${
               state.current.theme === AVILABLE_THEME.third
                  ? 'active-theme'
                  : ''
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
};
