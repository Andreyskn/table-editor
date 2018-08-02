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
    } = this.props;

    return (
      <table className='table'>
        <tbody className='table__body'>
          {rows.map((rowId) => 
            (deletedRow !== rowId) ?
              <tr key={rowId} className='table__row'>
                {columns.map((columnId) => 
                  (deletedColumn !== columnId) ?
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
                    >
                    </Cell>
                  : null
                )}
              </tr>
            : null
          )}
        </tbody>
      </table>
    );
  }
}