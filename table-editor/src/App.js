import React, { Component } from 'react';
import './App.css';
import Table from './table';

class App extends Component {
  constructor() {
    super();

    this.initialGrid = [0, 1, 2];

    this.state = {
      rows: [0, 1, 2],
      columns: [0, 1, 2],
      deletedRow: null,
      deletedColumn: null,
      menuAddress: null,
      colorMenuAddress: null,
      colorMenuType: null,
      cellsStyleMap: [],
    };
  }

  componentDidMount() {
    window.addEventListener('click', (e) => {
      if (this.state.menuAddress && e.target.id !== 'back') {
        this.setState({
          menuAddress: null
        });
      }
    });
  }

  resetTable = () => {
    this.setState({
      rows: this.initialGrid,
      columns: this.initialGrid,
      deletedRow: null,
      deletedColumn: null,
      menuAddress: null,
      colorMenuAddress: null,
      colorMenuType: null,
      cellsStyleMap: [],
    });
  }

  addColumn = () => {
    let lastItem = this.state.columns.slice(-1);

    this.setState({
      columns: [...this.state.columns, ++lastItem]
    });
  }

  addRow = () => {
    let lastItem = this.state.rows.slice(-1);

    this.setState({
      rows: [...this.state.rows, ++lastItem]
    });
  }

  deleteColumn = (columnId) => {
    this.setState({
      columns: this.state.columns.filter(el => el !== columnId),
      menuAddress: null
    });
  }

  deleteRow = (rowId) => {
    this.setState({
      rows: this.state.rows.filter(el => el !== rowId),
      menuAddress: null
    });
  }

  openContextMenu = (event, cellAddress) => {
    event.preventDefault();

    this.setState({
      menuAddress: cellAddress
    });
  }

  openColorMenu = (address, type) => {
    this.setState({
      colorMenuAddress: address,
      colorMenuType: type,
      menuAddress: null
    });
  }

  closeColorMenu = () => {
    this.setState({ colorMenuAddress: null });
  }

  backFromColorMenu = (address) => {
    this.setState({ 
      menuAddress: address,
      colorMenuAddress: null
    });
  }

  changeCellStyle = (cell, type, color) => {
    const styledCells = this.state.cellsStyleMap;
    const inArray = styledCells.filter(el => el.address === cell)[0];
    let newElt = {};

    if (inArray) {
      inArray[type] = color;

      this.setState({
        cellsStyleMap: [...this.state.cellsStyleMap.filter(el => el.address !== cell), inArray],
      });
    } else {
      newElt.address = cell;
      newElt[type] = color;

      this.setState({
        cellsStyleMap: [...this.state.cellsStyleMap, newElt],
      });
    }
  }


  render() {
    // console.log(this.state.menuAddress);

    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.addColumn}>Add column</button>
          <button onClick={this.addRow}>Add row</button>
          <button onClick={this.resetTable}>Reset table</button>
        </header>
        <main>
          <Table {...this.state}
            onRightClick={this.openContextMenu}
            onDeleteColumn={this.deleteColumn}
            onDeleteRow={this.deleteRow}
            onCellMount={this.generateCellsMap}
            onCellDestroy={this.filterCellsMap}
            onColorMenuOpen={this.openColorMenu}
            onStyleChange={this.changeCellStyle}
            onColorMenuClose={this.closeColorMenu}
            onBackClick={this.backFromColorMenu}
          >
          </Table>
        </main>
      </div>
    );
  }
}

export default App;
