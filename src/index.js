import React from 'react';
import ReactDOM from 'react-dom';
import { rootStyle } from './appStyle';

class App extends React.Component {
  render() {
    return (
      <div className={rootStyle}>
        <h1>Hello World from React boilerplate</h1>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
