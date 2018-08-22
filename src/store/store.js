import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const initialState = {
  rows: [0, 1, 2],
  columns: [0, 1, 2],
  deletedRow: null,
  deletedColumn: null,
  addedRow: null,
  addedColumn: null,
  menuAddress: null,
  colorMenuAddress: null,
  colorMenuType: null,
  cellsStyleMap: [],
  highlightRow: null,
  highlightColumn: null,
};

const store = createStore(rootReducer, initialState, window.devToolsExtension && window.devToolsExtension());

export default store;