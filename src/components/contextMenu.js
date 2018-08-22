import React, { Component } from 'react';
import { connect } from 'react-redux';
import iconText from '../svg/text.svg';
import iconBkg from '../svg/background.svg';
import { deleteColumn, deleteRow } from '../store/actions/actions';

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
          onMouseEnter={() => this.props.dispatch({type: 'HIGHLIGHT_DELETION', payload: {type: 'Column', index: columnId}})}
          onMouseLeave={() => this.props.dispatch({ type: 'REMOVE_HIGHLIGHT', payload: { type: 'Column' } })}
          >
          Delete column
        </button>
        <button 
          onClick={() => deleteRow(dispatch, rowId)}
          onMouseEnter={() => this.props.dispatch({ type: 'HIGHLIGHT_DELETION', payload: { type: 'Row', index: rowId } })}
          onMouseLeave={() => this.props.dispatch({ type: 'REMOVE_HIGHLIGHT', payload: { type: 'Row' } })}
          >
          Delete row
        </button>
        <div className='context-menu__wrapper'>
          <button
            className='context-menu__color-btn'
            onClick={() => this.props.dispatch({ type: 'OPEN_COLOR_MENU', payload: { type: 'text', address: cellAddress }})}>
            <img
              className='context-menu__color-icon'
              src={iconText}
              alt="" />
          </button>
          <button
            className='context-menu__color-btn'
            onClick={() => this.props.dispatch({ type: 'OPEN_COLOR_MENU', payload: { type: 'fill', address: cellAddress } })}>
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