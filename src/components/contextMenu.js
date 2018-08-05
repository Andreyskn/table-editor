import React, { Component } from 'react';
import iconText from '../svg/text.svg';
import iconBkg from '../svg/background.svg';

export default class ContextMenu extends Component {
  render() {
    const onDeleteColumn = this.props.onDeleteColumn;
    const onDeleteRow = this.props.onDeleteRow;
    const cellAddress = this.props.cellAddress.split(',');
    const rowId = parseInt(cellAddress[0], 10);
    const columnId = parseInt(cellAddress[1], 10);
    const onColorMenuOpen = this.props.onColorMenuOpen;
    const onDeleteHover = this.props.onDeleteHover;
    const onDeleteHoverEnd = this.props.onDeleteHoverEnd;

    return(
      <div className='context-menu'>
        <button
          onClick={() => onDeleteColumn(columnId)}
          onMouseEnter={() => onDeleteHover('Column', columnId)}
          onMouseLeave={() => onDeleteHoverEnd('Column')}
          >
          Delete column
        </button>
        <button 
          onClick={() => onDeleteRow(rowId)}
          onMouseEnter={() => onDeleteHover('Row', rowId)}
          onMouseLeave={() => onDeleteHoverEnd('Row')}
          >
          Delete row
        </button>
        <div className='context-menu__wrapper'>
          <button
            className='context-menu__color-btn'
            onClick={() => onColorMenuOpen(this.props.cellAddress, 'text')}>
            <img
              className='context-menu__color-icon'
              src={iconText}
              alt="" />
          </button>
          <button
            className='context-menu__color-btn'
            onClick={() => onColorMenuOpen(this.props.cellAddress, 'fill')}>
            <img
              className='context-menu__color-icon'
              src={iconBkg}
              alt="" />
          </button>
        </div>
      </div>
    );
  }
}