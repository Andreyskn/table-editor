import React, { Component } from 'react';

export default class ContextMenu extends Component {
  render() {
    const onDeleteColumn = this.props.onDeleteColumn;
    const onDeleteRow = this.props.onDeleteRow;
    const cellAddress = this.props.cellAddress.split(',');

    return(
      <div className='context-menu'>
        <button
          onClick={() => onDeleteColumn(parseInt(cellAddress[1], 10))}>
          Delete column
        </button>
        <button 
          onClick={() => onDeleteRow(parseInt(cellAddress[0], 10))}>
          Delete row
        </button>
      </div>
    );
  }
}