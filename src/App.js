import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Table from './components/table';

class App extends Component {
  componentDidMount() {
    window.addEventListener('click', (e) => {
      const colorMenuClick = e.target.className.includes('color');
      const state = store.getState();
      const menuIsOpen = state.menuAddress || state.colorMenuAddress;

      if (menuIsOpen && !colorMenuClick) {
        store.dispatch({ type: 'CLOSE_ALL_MENUES' });
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <button onClick={() => store.dispatch({ type: 'ADD_COLUMN' })}>Add column</button>
            <button onClick={() => store.dispatch({ type: 'ADD_ROW' })}>Add row</button>
            <button onClick={() => store.dispatch({ type: 'RESET_TABLE' })}>Reset table</button>
          </header>
          <main>
            <Table />
          </main>
        </div>
      </Provider>
    );
  }
}

export default App;
