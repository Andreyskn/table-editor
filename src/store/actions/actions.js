export function deleteColumn(dispatch, columnId) {
  dispatch({ type: 'ANIMATE_COLUMN_DELETION', payload: { columnId }});

  setTimeout(() => {
    dispatch({ type: 'DELETE_COLUMN', payload: { columnId } });
  }, 800);
}

export function deleteRow(dispatch, rowId) {
  dispatch({ type: 'ANIMATE_ROW_DELETION', payload: { rowId } });

  setTimeout(() => {
    dispatch({ type: 'DELETE_ROW', payload: { rowId } });
  }, 800);
}
