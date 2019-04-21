import ReactDOM from 'react-dom';
import React from 'react';
import { initFontAwesomeIcons } from './init';
import { App } from './App';

initFontAwesomeIcons();

ReactDOM.render(<App />, document.getElementById('root'));
