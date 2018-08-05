import React, { Component } from 'react';
import ContextMenu from './contextMenu';
import ColorMenu from './colorMenu';

export default class Cell extends Component {
  constructor(props) {
    super(props);

    const cellsStyleMap = this.props.cellsStyleMap;
    this.styles = cellsStyleMap.filter(cell => cell.address === `${this.props.cellAddress}`)[0];

    this.state = {
      styles: this.styles
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cellsStyleMap.length !== this.props.cellsStyleMap.length) {
      const cellsStyleMap = nextProps.cellsStyleMap;
      this.styles = cellsStyleMap.filter(cell => cell.address === `${this.props.cellAddress}`)[0];

      if (`${this.styles}` !== `${this.state.styles}`) {
        this.setState({ styles: this.styles });
      }
    }
  }

  render() {
    const cellAddress = `${this.props.cellAddress}`;
    const {
      menuAddress,
      onRightClick,
      onDeleteColumn,
      onDeleteRow,
      colorMenuAddress,
      onColorMenuOpen,
      colorMenuType,
      onStyleChange,
      onColorMenuClose,
      onBackClick,
      deletedRow,
      deletedColumn,
      addedRow,
      addedColumn,
      onDeleteHover,
      onDeleteHoverEnd,
      highlightRow,
      highlightColumn,
    } = this.props;

    const cellAddressArr = this.props.cellAddress;
    const isDeleted = cellAddressArr[0] === deletedRow || cellAddressArr[1] === deletedColumn;
    const isAdded = cellAddressArr[0] === addedRow || cellAddressArr[1] === addedColumn;
    const isHighlighted = cellAddressArr[0] === highlightRow || cellAddressArr[1] === highlightColumn;

    return (
      <td className={`table__cell${isDeleted ? ' deleting' : isAdded ? ' adding' : ''}`}>
        <input 
          className={isHighlighted ? 'highlighted' : null}
          type='text'
          // placeholder={cellAddress}
          onContextMenu={(e) => onRightClick(e, cellAddress)}
          style={this.state.styles ? { color: this.state.styles.text, backgroundColor: this.state.styles.fill} : null}
        />
        {menuAddress === cellAddress &&
          <ContextMenu 
            cellAddress={cellAddress}
            onDeleteColumn={onDeleteColumn}
            onDeleteRow={onDeleteRow}
            onColorMenuOpen={onColorMenuOpen}
            onDeleteHover={onDeleteHover}
            onDeleteHoverEnd={onDeleteHoverEnd}
            >
          </ContextMenu>
        }
        {colorMenuAddress === cellAddress &&
          <ColorMenu
            currentCell={cellAddress}
            colorMenuType={colorMenuType}
            onStyleChange={onStyleChange}
            onColorMenuClose={onColorMenuClose}
            onBackClick={onBackClick}
            >
          </ColorMenu>
        }
      </td>
    );
  }
}