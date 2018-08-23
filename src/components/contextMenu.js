import React, { Component } from 'react';
import { connect } from 'react-redux';
import iconText from '../svg/text.svg';
import iconBkg from '../svg/background.svg';
import { deleteColumn, deleteRow, highlightDeletion, removeHighlight } from '../store/actions/gridActions';
import { openColorMenu } from '../store/actions/menuActions';

class ContextMenu extends Component {
  render() {
    const cellAddress = this.props.cellAddress;
    const addressArray = cellAddress.split(',')
    const rowId = parseInt(addressArray[0], 10);
    const columnId = parseInt(addressArray[1], 10);
    const dispatch = this.props.dispatch;

    return(
      <div className='context-menu'>
        <button
          onClick={() => deleteColumn(dispatch, columnId)}
          onMouseEnter={() => highlightDeletion(dispatch, 'Column', columnId)}
          onMouseLeave={() => removeHighlight(dispatch, 'Column')}
          >
          Delete column
        </button>
        <button 
          onClick={() => deleteRow(dispatch, rowId)}
          onMouseEnter={() => highlightDeletion(dispatch, 'Row', rowId)}
          onMouseLeave={() => removeHighlight(dispatch, 'Row')}
          >
          Delete row
        </button>
        <div className='context-menu__wrapper'>
          <button
            className='context-menu__color-btn'
            onClick={() => openColorMenu(dispatch, cellAddress, 'text')}>
            <img
              className='context-menu__color-icon'
              src={iconText}
              alt="" />
          </button>
          <button
            className='context-menu__color-btn'
            onClick={() => openColorMenu(dispatch, cellAddress, 'fill')}>
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

export default connect()(ContextMenu)