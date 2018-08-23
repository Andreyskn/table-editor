import { OPEN_CONTEXT_MENU, OPEN_COLOR_MENU, CLOSE_ALL_MENUES, CLOSE_COLOR_MENU, BACK_FROM_COLOR_MENU, ANIMATE_COLUMN_DELETION, ANIMATE_ROW_DELETION } from './types';

export function openContextMenu(dispatch, address) {
  dispatch({
    type: OPEN_CONTEXT_MENU,
    payload: { address }
  });
}

export function openColorMenu(dispatch, address, type) {
  dispatch({
    type: OPEN_COLOR_MENU,
    payload: { address, type }
  });
}

export function closeAllMenues(dispatch) {
  dispatch({
    type: CLOSE_ALL_MENUES
  });
}

export function closeColorMenu(dispatch) {
  dispatch({
    type: CLOSE_COLOR_MENU
  });
}

export function backFromColorMenu(dispatch, address) {
  dispatch({
    type: BACK_FROM_COLOR_MENU,
    payload: { address }
  });
}

export function animateColumnDeletion(dispatch, columnId) {
  dispatch({
    type: ANIMATE_COLUMN_DELETION,
    payload: { columnId }
  });
}

export function animateRowDeletion(dispatch, rowId) {
  dispatch({
    type: ANIMATE_ROW_DELETION,
    payload: { rowId }
  });
}