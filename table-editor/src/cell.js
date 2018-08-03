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
    const menuAddress = this.props.menuAddress;
    const onRightClick = this.props.onRightClick;
    const onDeleteColumn = this.props.onDeleteColumn;
    const onDeleteRow = this.props.onDeleteRow;
    const colorMenuAddress = this.props.colorMenuAddress;
    const onColorMenuOpen = this.props.onColorMenuOpen;
    const colorMenuType = this.props.colorMenuType;
    const onStyleChange = this.props.onStyleChange;
    const onColorMenuClose = this.props.onColorMenuClose;
    const onBackClick = this.props.onBackClick;
    const deletedRow = this.props.deletedRow;
    const deletedColumn = this.props.deletedColumn;
    const addedRow = this.props.addedRow;
    const addedColumn = this.props.addedColumn;

    const isDeleted = this.props.cellAddress[0] === deletedRow || this.props.cellAddress[1] === deletedColumn;
    const isAdded = this.props.cellAddress[0] === addedRow || this.props.cellAddress[1] === addedColumn;

    return (
      <td className={`table__cell${isDeleted ? ' deleting' : isAdded ? ' adding' : ''}`}>
        <input 
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
            onColorMenuOpen={onColorMenuOpen}>
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