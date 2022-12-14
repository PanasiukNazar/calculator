import '../style/main.scss';

import { createState } from './state.js';
import { bindDom } from './dom.js';

const state = createState();

bindDom(state);

state.changed();
