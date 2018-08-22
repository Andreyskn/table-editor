import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContextMenu from './contextMenu';
import ColorMenu from './colorMenu';

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
    this.props.dispatch({ type: 'OPEN_CONTEXT_MENU', payload: { address } });
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
          <ContextMenu cellAddress={cellAddress} />
        }
        {colorMenuAddress === cellAddress &&
          <ColorMenu cellAddress={cellAddress} />
        }
      </td>
    );
  }
}

const mapStateToProps = state => ({
  highlightRow: state.highlightRow,
  highlightColumn: state.highlightColumn,
  menuAddress: state.menuAddress,
  colorMenuAddress: state.colorMenuAddress,
  addedRow: state.addedRow,
  addedColumn: state.addedColumn,
  cellsStyleMap: state.cellsStyleMap,
  deletedRow: state.deletedRow,
  deletedColumn: state.deletedColumn,
});

export default connect(mapStateToProps)(Cell)