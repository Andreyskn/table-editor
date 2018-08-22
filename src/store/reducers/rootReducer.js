// import { combineReducers } from 'redux';

// export default combineReducers({
//   reducer1,
//   reducer2,
//   reducer3,
// });

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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COLUMN':
      let lastItem = state.columns.slice(-1);
      const newItem = ++lastItem;

      return {
        ...state,
        addedColumn: newItem,
        columns: [...state.columns, newItem]
      };

    case 'ADD_ROW':  // TODO extract function
      let lastItem1 = state.rows.slice(-1);
      const newItem1 = ++lastItem1;

      return {
        ...state,
        addedRow: newItem1,
        rows: [...state.rows, newItem1]
      };

    case 'RESET_TABLE':
      const lastId = Math.max(...state.rows, ...state.columns);
      const newGrid = [lastId + 1, lastId + 2, lastId + 3];

      return {
        ...initialState,
        rows: newGrid,
        columns: newGrid
      };

    case 'HIGHLIGHT_DELETION':
      const keyName = `highlight${action.payload.type}`;

      return {
        ...state,
        [keyName]: action.payload.index
      };

    case 'REMOVE_HIGHLIGHT':  // TODO extract function
      const keyName1 = `highlight${action.payload.type}`;

      return {
        ...state,
        [keyName1]: null
      };

    case 'OPEN_CONTEXT_MENU':
      return {
        ...state,
        menuAddress: action.payload.address,
        colorMenuAddress: null
      }

    case 'OPEN_COLOR_MENU':
      return {
        ...state,
        colorMenuAddress: action.payload.address,
        colorMenuType: action.payload.type,
        menuAddress: null
      }

    case 'CLOSE_ALL_MENUES':
      return {
        ...state,
        menuAddress: null,
        colorMenuAddress: null
      }

    case 'CLOSE_COLOR_MENU':
      return {
        ...state,
        colorMenuAddress: null
      }

    case 'BACK_FROM_COLOR_MENU':
      return {
        ...state,
        menuAddress: action.payload.address,
        colorMenuAddress: null
      }

    case 'CHANGE_CELL_STYLE':
      const styledCells = state.cellsStyleMap;
      const inArray = styledCells.filter(el => el.address === action.payload.address)[0];

      if (inArray) {
        inArray[action.payload.type] = action.payload.color;

        return {
          ...state,
          cellsStyleMap: [...styledCells.filter(el => el.address !== action.payload.address), inArray],
        };
      } else {
        let newElt = {};
        newElt.address = action.payload.address;
        newElt[action.payload.type] = action.payload.color;

        return {
          ...state,
          cellsStyleMap: [...styledCells, newElt],
        };
      }

    case 'ANIMATE_COLUMN_DELETION':
      return {
        ...state,
        deletedColumn: action.payload.columnId,
        menuAddress: null
      }

    case 'ANIMATE_ROW_DELETION':
      return {
        ...state,
        deletedRow: action.payload.rowId,
        menuAddress: null
      }

    case 'DELETE_COLUMN':
      return {
        ...state,
        columns: state.columns.filter(el => el !== action.payload.columnId)
      }

    case 'DELETE_ROW':
      return {
        ...state,
        rows: state.rows.filter(el => el !== action.payload.rowId)
      }

    default:
      return state;
  }
}