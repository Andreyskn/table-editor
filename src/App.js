import React, { Component } from 'react';
import Table from './components/table';

class App extends Component {
  constructor() {
    super();

    this.initialState = {
      rows: [0, 1, 2],
      columns: [0, 1, 2],
      deletedRow: null,
      deletedColumn: null,
      addedRow: null,
      addedColumn: null,
      menuAddress: null,
      colorMenuAddress: null,
      colorMenuType: null,
      cellsStyleMap: [],
      highlightRow: null,
      highlightColumn: null,
    };

    this.state = this.initialState ;
  }

  componentDidMount() {
    window.addEventListener('click', (e) => {
      const colorMenuClick = e.target.className.includes('color');
      const menuIsOpen = this.state.menuAddress || this.state.colorMenuAddress;

      if (menuIsOpen && !colorMenuClick) {
        this.setState({
          menuAddress: null,
          colorMenuAddress: null
        });
      }
    });
  }

  highlightDeletion = (type, index) => {
    const keyName = `highlight${type}`;

    this.setState({
      [keyName]: index
    });
  }

  removeHighlight = (type) => {
    const keyName = `highlight${type}`;

    this.setState({
      [keyName]: null
    });
  }

  resetTable = () => {
    const lastId = Math.max(...this.state.rows, ...this.state.columns);
    const newGrid = [lastId + 1, lastId + 2, lastId + 3]; 

    this.setState({
      ...this.initialState,
      rows: newGrid,
      columns: newGrid
    });
  }

  addColumn = () => {
    let lastItem = this.state.columns.slice(-1);
    const newItem = ++lastItem;

    this.setState({
      addedColumn: newItem,
      columns: [...this.state.columns, newItem]
    });
  }

  addRow = () => {
    let lastItem = this.state.rows.slice(-1);
    const newItem = ++lastItem;

    this.setState({
      addedRow: newItem,
      rows: [...this.state.rows, newItem]
    });
  }

  deleteColumn = (columnId) => {
    this.setState({
      deletedColumn: columnId,
      menuAddress: null
    });

    setTimeout(() => {
      this.setState({
        columns: this.state.columns.filter(el => el !== columnId)
      });
    }, 800);
  }

  deleteRow = (rowId) => {
    this.setState({
      deletedRow: rowId,
      menuAddress: null
    });

    setTimeout(() => {
      this.setState({
        rows: this.state.rows.filter(el => el !== rowId)
      });
    }, 800);
  }

  openContextMenu = (event, cellAddress) => {
    event.preventDefault();

    this.setState({
      menuAddress: cellAddress,
      colorMenuAddress: null
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

    if (inArray) {
      inArray[type] = color;

      this.setState({
        cellsStyleMap: [...this.state.cellsStyleMap.filter(el => el.address !== cell), inArray],
      });
    } else {
      let newElt = {};
      newElt.address = cell;
      newElt[type] = color;

      this.setState({
        cellsStyleMap: [...this.state.cellsStyleMap, newElt],
      });
    }
  }

  render() {
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
            onDeleteHover={this.highlightDeletion}
            onDeleteHoverEnd={this.removeHighlight}
          >
          </Table>
        </main>
      </div>
    );
  }
}

export default App;
