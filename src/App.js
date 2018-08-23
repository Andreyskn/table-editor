import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Table from './components/table';
import { addColumn, addRow, resetTable } from './store/actions/gridActions';
import { closeAllMenues } from './store/actions/menuActions';

class App extends Component {
  componentDidMount() {
    window.addEventListener('click', (e) => {
      const colorMenuClick = e.target.className.includes('color');
      const state = store.getState().menu;
      const menuIsOpen = state.menuAddress || state.colorMenuAddress;

      if (menuIsOpen && !colorMenuClick) {
        closeAllMenues(store.dispatch);
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <button onClick={() => addColumn(store.dispatch)}>Add column</button>
            <button onClick={() => addRow(store.dispatch)}>Add row</button>
            <button onClick={() => resetTable(store.dispatch)}>Reset table</button>
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
