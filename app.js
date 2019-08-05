import React from 'react';
import styled, { css } from 'styled-components';
import ReactDataSheet from './src/index';


const GRID_DATA = Array(300)
  .fill([{value:  1}, {value:  2}, {value:  3}, {value:  4}])

const App = ()=> {
  const [grid, setGrid] = React.useState(GRID_DATA)

  return (
    <div>
      <h1>ReactDataSheet Performance Test</h1>

      <SpreadsheetWrap>
        <ReactDataSheet
          data={grid}
          valueRenderer={(cell) => cell.value}
          rowRenderer={RowRenderer}
          valueViewer={ValueViewer}
          onCellsChanged={changes => {
            const newGrid = grid.map(row => [...row])
            changes.forEach(({cell, row, col, value}) => {
              newGrid[row][col] = {...grid[row][col], value}
            })

            setGrid(newGrid)
          }}
        />
      </SpreadsheetWrap>
    </div>
  )
}


const RowRenderer = React.memo(({children})=> {
  React.useEffect(()=> {
    console.log("RowRenderer init")
  }, [])
  console.log("RowRenderer render")

  return (
    <tr>
      { children }
    </tr>
  )
}, (a, b)=> {
  const same = a.children.every((child, i)=> (
    Object.keys(child.props).every(key=> {
      const propA = child.props[key]
      const propB = b.children[i].props[key]

      return propA == propB ||
             key   == "valueRenderer" ||
             key   == "forceEdit" &&
             propA == false &&
             propB == true
    })
  ))
  return same
})



const ValueViewer = React.memo(({value})=> {
  React.useEffect(()=> {
    console.log("ValueViewer init")
  }, [])
  console.log("ValueViewer render")

  return (
    value
  )
})



const SpreadsheetWrap = styled.div`
  span.data-grid-container, span.data-grid-container:focus {
    outline: none;
  }

  .data-grid-container .data-grid {
    table-layout: fixed;
    border-collapse: collapse;
  }

  .data-grid-container .data-grid .cell.updated {
      background-color: rgba(0, 145, 253, 0.16);
      transition : background-color 0ms ease ;
  }
  .data-grid-container .data-grid .cell {
    width: 100px;
    height: 17px;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    cursor: cell;
    background-color: unset;
    transition : background-color 500ms ease;
    vertical-align: middle;
    text-align: right;
    border: 1px solid #DDD;
    padding: 0;
  }
  .data-grid-container .data-grid .cell.selected {
    border: 1px double rgb(33, 133, 208);
    transition: none;
    box-shadow: inset 0 -100px 0 rgba(33, 133, 208, 0.15);
  }

  .data-grid-container .data-grid .cell.read-only {
    background: whitesmoke;
    color: #999;
    text-align: center;
  }

  .data-grid-container .data-grid .cell > .text {
    padding: 2px 5px;
    text-overflow: ellipsis;
    overflow: hidden;
  }


  .data-grid-container .data-grid .cell > input {
    outline: none !important;
    border: 2px solid rgb(33, 133, 208);
    text-align:right;
    width: calc(100% - 6px);
    height: 11px;
    background: none;
    display: block;
  }


  .data-grid-container .data-grid .cell {
    vertical-align: bottom;
  }

  .data-grid-container .data-grid .cell,
  .data-grid-container .data-grid.wrap .cell,
  .data-grid-container .data-grid.wrap .cell.wrap,
  .data-grid-container .data-grid .cell.wrap,
  .data-grid-container .data-grid.nowrap .cell.wrap,
  .data-grid-container .data-grid.clip .cell.wrap {
    white-space: normal;
  }

  .data-grid-container .data-grid.nowrap .cell,
  .data-grid-container .data-grid.nowrap .cell.nowrap,
  .data-grid-container .data-grid .cell.nowrap,
  .data-grid-container .data-grid.wrap .cell.nowrap,
  .data-grid-container .data-grid.clip .cell.nowrap {
    white-space: nowrap;
    overflow-x: visible;
  }

  .data-grid-container .data-grid.clip .cell,
  .data-grid-container .data-grid.clip .cell.clip,
  .data-grid-container .data-grid .cell.clip,
  .data-grid-container .data-grid.wrap .cell.clip,
  .data-grid-container .data-grid.nowrap .cell.clip {
    white-space: nowrap;
    overflow-x: hidden;
  }

  .data-grid-container .data-grid .cell .value-viewer, .data-grid-container .data-grid .cell .data-editor {
    display: block;
  }
`

export default App
