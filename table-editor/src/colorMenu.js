import React, { Component } from 'react';

export default class ColorMenu extends Component {
  constructor(props) {
    super(props);

    this.state = this.props;
  }

  onInput = (e) => {
    const value = e.target.value;
    const {
      currentCell,
      colorMenuType,
      onStyleChange,
    } = this.state;

    onStyleChange(currentCell, colorMenuType, value);
  }

  render() {
    const { 
      currentCell,
      colorMenuType,
      onStyleChange,
      onColorMenuClose,
      onBackClick,
    } = this.state;

    return (
      <div className='color-menu'>
        <div className='color-menu__wrapper'>
          <button
            id='back'
            className='color-menu__btn-back'
            onClick={() => onBackClick(currentCell)}>
            <img
              className='color-menu__color-icon'
              src="./svg/back.svg"
              alt=""/>
        </button>
          <button
            className='color-menu__btn-close'
            onClick={onColorMenuClose}>
            <img
              className='color-menu__color-icon'
              src="./svg/close.svg"
              alt="" />
        </button>
        </div>
        <button
          className='color-menu__btn-color'
          onClick={() => onStyleChange(currentCell, colorMenuType, 'red')}
          style={{color: 'red'}}
          >
          Red
        </button>
        <button
          className='color-menu__btn-color'
          onClick={() => onStyleChange(currentCell, colorMenuType, 'green')}
          style={{ color: 'green' }}
          >
          Green
        </button>
        <button
          className='color-menu__btn-color'
          onClick={() => onStyleChange(currentCell, colorMenuType, 'black')}
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