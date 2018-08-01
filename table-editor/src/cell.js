import React, { Component } from 'react';
import ContextMenu from './contextMenu';

export default class Cell extends Component {
  componentWillMount() {
    this.props.onCellMount(this.props.cellAddress);
  }

  componentWillUnmount() {
    this.props.onCellDestroy(`${this.props.cellAddress}`);
  }

  render() {
    const cellAddress = `${this.props.cellAddress}`;
    const menuAddress = this.props.menuAddress;
    const onRightClick = this.props.onRightClick;
    const onDeleteColumn = this.props.onDeleteColumn;
    const onDeleteRow = this.props.onDeleteRow;

    return (
      <td className='table__cell'>
        <input 
          type='text'
          placeholder={cellAddress}
          onContextMenu={(e) => onRightClick(e, cellAddress)}
          onFocus={() => console.log(cellAddress)}
        />
        {menuAddress === cellAddress &&
          <ContextMenu 
            cellAddress={cellAddress}
            onDeleteColumn={onDeleteColumn}
            onDeleteRow={onDeleteRow}>
          </ContextMenu>
        }
      </td>
    );
  }
}