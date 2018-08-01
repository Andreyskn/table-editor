import React, { Component } from 'react';
import './App.css';
import Table from './table';

class App extends Component {
  constructor(props) {
    super(props);

    this.initialGrid = [0, 1, 2];
    this.cellsMap = [];


    this.state = {
      rows: [0, 1, 2],
      columns: [0, 1, 2],
      deletedRow: null,
      deletedColumn: null,
      menuAddress: null,
      cellsMap: [],
    };
  }

  componentDidMount() {
    window.addEventListener('click', (e) => {
      if (this.state.menuAddress) {
        this.setState({
          menuAddress: null
        });
      }
    });
  }

  generateCellsMap = (cellAddress) => {
    this.cellsMap.push(cellAddress);

    this.setState({
      cellsMap: this.cellsMap
    });
  }

  filterCellsMap = (cellAddress) => {
    this.cellsMap = this.cellsMap.filter(el => `${el}` !== cellAddress);

    this.setState({
      cellsMap: this.cellsMap
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

  resetTable = () => {
    this.setState({
      rows: this.initialGrid,
      columns: this.initialGrid,
      deletedColumn: null,
      menuAddress: null
    });
  }

  openContextMenu = (event, cellAddress) => {
    event.preventDefault();

    this.setState({
      menuAddress: cellAddress
    });
  }

  render() {
    console.log(this.state.cellsMap);

    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.addColumn}>Add column</button>
          <button onClick={this.addRow}>Add row</button>
          <button onClick={this.resetTable}>Reset table</button>
          <input type="color"/>
          <input type="color"/>
        </header>
        <main>
          <Table {...this.state}
            onRightClick={this.openContextMenu}
            onDeleteColumn={this.deleteColumn}
            onDeleteRow={this.deleteRow}
            onCellMount={this.generateCellsMap}
            onCellDestroy={this.filterCellsMap}>
          </Table>
        </main>
      </div>
    );
  }
}

export default App;
