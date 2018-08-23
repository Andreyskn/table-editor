import { ADD_COLUMN, ADD_ROW, DELETE_COLUMN, DELETE_ROW, RESET_TABLE, HIGHLIGHT_DELETION, REMOVE_HIGHLIGHT, CHANGE_CELL_STYLE } from '../actions/types';

const initialState = {
  rows: [0, 1, 2],
  columns: [0, 1, 2],
  addedRow: null,
  addedColumn: null,
  cellsStyleMap: [],
  highlightRow: null,
  highlightColumn: null,
};

function getNextItem(items) {
  let lastItem = items.slice(-1);

  return ++lastItem;
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_COLUMN: {
      let newItem = getNextItem(state.columns);

      return {
        ...state,
        addedColumn: newItem,
        columns: [...state.columns, newItem]
      };
    }

    case ADD_ROW: {
      let newItem = getNextItem(state.rows);

      return {
        ...state,
        addedRow: newItem,
        rows: [...state.rows, newItem]
      };
    }

    case RESET_TABLE:
      const lastId = Math.max(...state.rows, ...state.columns);
      const newGrid = [lastId + 1, lastId + 2, lastId + 3];

      return {
        ...initialState,
        rows: newGrid,
        columns: newGrid
      };

    case HIGHLIGHT_DELETION:
      return {
        ...state,
        [`highlight${payload.type}`]: payload.index
      };

    case REMOVE_HIGHLIGHT:
      return {
        ...state,
        [`highlight${payload.type}`]: null
      };

    case CHANGE_CELL_STYLE:
      const styledCells = state.cellsStyleMap;
      const inArray = styledCells.filter(el => el.address === payload.address)[0];

      if (inArray) {
        inArray[payload.type] = payload.color;

        return {
          ...state,
          cellsStyleMap: [...styledCells.filter(el => el.address !== payload.address), inArray],
        };
      } else {
        let newElt = {};
        newElt.address = payload.address;
        newElt[payload.type] = payload.color;

        return {
          ...state,
          cellsStyleMap: [...styledCells, newElt],
        };
      }

    case DELETE_COLUMN:
      return {
        ...state,
        columns: state.columns.filter(el => el !== payload.columnId)
      }

    case DELETE_ROW:
      return {
        ...state,
        rows: state.rows.filter(el => el !== payload.rowId)
      }

    default:
      return state;
  }
}