import { OPEN_CONTEXT_MENU, OPEN_COLOR_MENU, CLOSE_ALL_MENUES, CLOSE_COLOR_MENU, BACK_FROM_COLOR_MENU, ANIMATE_COLUMN_DELETION, ANIMATE_ROW_DELETION } from '../actions/types';

const initialState = {
  deletedRow: null,
  deletedColumn: null,
  menuAddress: null,
  colorMenuAddress: null,
  colorMenuType: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case OPEN_CONTEXT_MENU:
      return {
        ...state,
        menuAddress: payload.address,
        colorMenuAddress: null
      }

    case OPEN_COLOR_MENU:
      return {
        ...state,
        colorMenuAddress: payload.address,
        colorMenuType: payload.type,
        menuAddress: null
      }

    case CLOSE_ALL_MENUES:
      return {
        ...state,
        menuAddress: null,
        colorMenuAddress: null
      }

    case CLOSE_COLOR_MENU:
      return {
        ...state,
        colorMenuAddress: null
      }

    case BACK_FROM_COLOR_MENU:
      return {
        ...state,
        menuAddress: payload.address,
        colorMenuAddress: null
      }

    case ANIMATE_COLUMN_DELETION:
      return {
        ...state,
        deletedColumn: payload.columnId,
        menuAddress: null
      }

    case ANIMATE_ROW_DELETION:
      return {
        ...state,
        deletedRow: payload.rowId,
        menuAddress: null
      }

    default:
      return state;
  }
}