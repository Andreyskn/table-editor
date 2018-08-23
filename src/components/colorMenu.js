import React, { Component } from 'react';
import iconBack from '../svg/back.svg';
import iconClose from '../svg/close.svg';
import { changeCellStyle } from '../store/actions/gridActions';
import { backFromColorMenu, closeColorMenu } from '../store/actions/menuActions';

export default class ColorMenu extends Component {
  onInput = (e) => {
    const color = e.target.value;
    const {
      cellAddress,
      colorMenuType,
      dispatch,
    } = this.props;

    changeCellStyle(dispatch, cellAddress, colorMenuType, color);
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
            onClick={() => backFromColorMenu(dispatch, cellAddress)}>
            <img
              className='color-menu__color-icon'
              src={iconBack}
              alt=""/>
        </button>
          <button
            className='color-menu__btn-close'
            onClick={() => closeColorMenu(dispatch)}>
            <img
              className='color-menu__color-icon'
              src={iconClose}
              alt="" />
        </button>
        </div>
        <button
          className='color-menu__btn-color'
          onClick={() => changeCellStyle(dispatch, cellAddress, colorMenuType, 'red')}
          style={{color: 'red'}}
          >
          Red
        </button>
        <button
          className='color-menu__btn-color'
          onClick={() => changeCellStyle(dispatch, cellAddress, colorMenuType, 'green')}
          style={{ color: 'green' }}
          >
          Green
        </button>
        <button
          className='color-menu__btn-color'
          onClick={() => changeCellStyle(dispatch, cellAddress, colorMenuType, 'black')}
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