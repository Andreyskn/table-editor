import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cell from './cell';

class Table extends Component {
  render() {
    const {
      rows,
      columns,
    } = this.props;

    return (
      <table className='table'>
        <tbody className='table__body'>
          {rows.map((rowId) => 
            <tr key={rowId} className='table__row'>
              {columns.map((columnId) => 
                <Cell 
                  key={columnId}
                  cellAddress={[rowId, columnId]}
                />
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  columns: state.grid.columns,
  rows: state.grid.rows
});

export default connect(mapStateToProps)(Table)