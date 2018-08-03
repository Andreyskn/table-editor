import React, { Component } from 'react';
import Cell from './cell';

export default class Table extends Component {
  render() {
    const {
      rows,
      columns,
      menuAddress,
      onRightClick,
      onDeleteColumn,
      deletedColumn,
      onDeleteRow,
      deletedRow,
      colorMenuAddress,
      onColorMenuOpen,
      colorMenuType,
      cellsStyleMap,
      onStyleChange,
      onColorMenuClose,
      onBackClick,
      addedRow,
      addedColumn,
    } = this.props;

    return (
      <table className='table'>
        <tbody className='table__body'>
          {rows.map((rowId) => 
            <tr key={rowId} className='table__row'>
              {columns.map((columnId) => 
                <Cell 
                  key={columnId}
                  cellAddress={[rowId, columnId]}
                  menuAddress={menuAddress}
                  onRightClick={onRightClick}
                  onDeleteColumn={onDeleteColumn}
                  onDeleteRow={onDeleteRow}
                  colorMenuAddress={colorMenuAddress}
                  onColorMenuOpen={onColorMenuOpen}
                  colorMenuType={colorMenuType}
                  cellsStyleMap={cellsStyleMap}
                  onStyleChange={onStyleChange}
                  onColorMenuClose={onColorMenuClose}
                  onBackClick={onBackClick}
                  deletedColumn={deletedColumn}
                  deletedRow={deletedRow}
                  addedRow={addedRow}
                  addedColumn={addedColumn}
                >
                </Cell>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}