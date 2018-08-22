import React, { Component } from 'react';
import { connect } from 'react-redux';
import iconBack from '../svg/back.svg';
import iconClose from '../svg/close.svg';

class ColorMenu extends Component {
  onInput = (e) => {
    const color = e.target.value;
    const {
      cellAddress,
      colorMenuType,
      dispatch,
    } = this.props;

    dispatch({
      type: 'CHANGE_CELL_STYLE',
      payload: {
        address: cellAddress,
        type: colorMenuType,
        color
      }
    });
  }

  render() {
    const { 
      cellAddress,
      colorMenuType,
      dispatch,
    } = this.props;

    return (
      <div className='color-menu'>
        <div className='color-menu__wrapper'>
          <button
            id='back'
            className='color-menu__btn-back'
            onClick={() => dispatch({ 
              type: 'BACK_FROM_COLOR_MENU',
              payload: { address: cellAddress } 
            })}>
            <img
              className='color-menu__color-icon'
              src={iconBack}
              alt=""/>
        </button>
          <button
            className='color-menu__btn-close'
            onClick={() => dispatch({ type: 'CLOSE_COLOR_MENU' })}>
            <img
              className='color-menu__color-icon'
              src={iconClose}
              alt="" />
        </button>
        </div>
        <button
          className='color-menu__btn-color'
          onClick={() => dispatch({ 
            type: 'CHANGE_CELL_STYLE',
            payload: { 
              address: cellAddress,
              type: colorMenuType,
              color: 'red'
            } 
          })}
          style={{color: 'red'}}
          >
          Red
        </button>
        <button
          className='color-menu__btn-color'
          onClick={() => dispatch({
            type: 'CHANGE_CELL_STYLE',
            payload: {
              address: cellAddress,
              type: colorMenuType,
              color: 'green'
            }
          })}
          style={{ color: 'green' }}
          >
          Green
        </button>
        <button
          className='color-menu__btn-color'
          onClick={() => dispatch({
            type: 'CHANGE_CELL_STYLE',
            payload: {
              address: cellAddress,
              type: colorMenuType,
              color: 'black'
            }
          })}
          >
          Black
        </button>
        <input 
          type='text'
          placeholder='Your color'
          onInput={this.onInput}
          className='color-menu__input'
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorMenuType: state.colorMenuType,
});

export default connect(mapStateToProps)(ColorMenu)