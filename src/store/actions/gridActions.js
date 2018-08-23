import { ADD_COLUMN, ADD_ROW, DELETE_COLUMN, DELETE_ROW, RESET_TABLE, HIGHLIGHT_DELETION, REMOVE_HIGHLIGHT, CHANGE_CELL_STYLE } from './types';
import { ANIMATE_COLUMN_DELETION, ANIMATE_ROW_DELETION } from './types';

export function addColumn(dispatch) {
  dispatch({
    type: ADD_COLUMN
  });
}

export function addRow(dispatch) {
  dispatch({
    type: ADD_ROW
  });
}

export function resetTable(dispatch) {
  dispatch({
    type: RESET_TABLE
  });
}

export function highlightDeletion(dispatch, type, index) {
  dispatch({
    type: HIGHLIGHT_DELETION,
    payload: { type, index }
  });
}

export function removeHighlight(dispatch, type) {
  dispatch({
    type: REMOVE_HIGHLIGHT,
    payload: { type }
  });
}

export function changeCellStyle(dispatch, address, type, color) {
  dispatch({
    type: CHANGE_CELL_STYLE,
    payload: { address, type, color }
  });
}

export function deleteColumn(dispatch, columnId) {
  dispatch({
    type: ANIMATE_COLUMN_DELETION,
    payload: { columnId }
  });

  setTimeout(() => {
    dispatch({
      type: DELETE_COLUMN,
      payload: { columnId }
    });
  }, 800);
}

export function deleteRow(dispatch, rowId) {
  dispatch({
    type: ANIMATE_ROW_DELETION,
    payload: { rowId }
  });

  setTimeout(() => {
    dispatch({
      type: DELETE_ROW,
      payload: { rowId }
    });
  }, 800);
}