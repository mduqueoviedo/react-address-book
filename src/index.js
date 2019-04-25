import ReactDOM from 'react-dom';
import React from 'react';
import ReactModal from 'react-modal';
import { initFontAwesomeIcons } from './init';
import { App } from './components/App';

initFontAwesomeIcons();

if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#root');
}

ReactDOM.render(<App />, document.getElementById('root'));
