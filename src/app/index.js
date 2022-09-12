import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import '../style/main.scss';
import Calculator from './components/Calculator.jsx';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(<Calculator />);
