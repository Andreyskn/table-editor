import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContextMenu from './contextMenu';
import ColorMenu from './colorMenu';
import { openContextMenu } from '../store/actions/menuActions';

class Cell extends Component {
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

  onRightClick = (e, address) => {
    e.preventDefault();
    openContextMenu(this.props.dispatch, address);
  }

  render() {
    const cellAddress = `${this.props.cellAddress}`;
    const {
      menuAddress,
      colorMenuAddress,
      deletedRow,
      deletedColumn,
      addedRow,
      addedColumn,
      highlightRow,
      highlightColumn,
      dispatch,
      colorMenuType,
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
          onContextMenu={(e) => this.onRightClick(e, cellAddress)}
          style={this.state.styles ? { color: this.state.styles.text, backgroundColor: this.state.styles.fill} : null}
        />
        {menuAddress === cellAddress &&
          <ContextMenu 
            cellAddress={cellAddress}
            dispatch={dispatch}
          />
        }
        {colorMenuAddress === cellAddress &&
          <ColorMenu 
            cellAddress={cellAddress}
            dispatch={dispatch}
            colorMenuType={colorMenuType}
          />
        }
      </td>
    );
  }
}

const mapStateToProps = state => ({
  highlightRow: state.grid.highlightRow,
  highlightColumn: state.grid.highlightColumn,
  addedRow: state.grid.addedRow,
  addedColumn: state.grid.addedColumn,
  cellsStyleMap: state.grid.cellsStyleMap,
  menuAddress: state.menu.menuAddress,
  colorMenuAddress: state.menu.colorMenuAddress,
  deletedRow: state.menu.deletedRow,
  deletedColumn: state.menu.deletedColumn,
  colorMenuType: state.menu.colorMenuType,
});

export default connect(mapStateToProps)(Cell)