import React, { Component } from 'react';

export default class ContextMenu extends Component {
  render() {
    const onDeleteColumn = this.props.onDeleteColumn;
    const onDeleteRow = this.props.onDeleteRow;
    const cellAddress = this.props.cellAddress.split(',');
    const rowId = parseInt(cellAddress[0], 10);
    const columnId = parseInt(cellAddress[1], 10);
    const onColorMenuOpen = this.props.onColorMenuOpen;

    return(
      <div className='context-menu'>
        <button
          onClick={() => onDeleteColumn(columnId)}>
          Delete column
        </button>
        <button 
          onClick={() => onDeleteRow(rowId)}>
          Delete row
        </button>
        <button
          onClick={() => onColorMenuOpen(this.props.cellAddress, 'text')}>
          Color
        </button>
        <button
          onClick={() => onColorMenuOpen(this.props.cellAddress, 'fill')}>
          Fill
        </button>
      </div>
    );
  }
}