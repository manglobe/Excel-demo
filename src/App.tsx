import React from 'react';
import './App.css';
import Cell from './components/Cell';
import Table from './components/Table';
import SortCell from './components/SortCell';
import strEval from './tools/strEval';
import sortGrid from './tools/sortGrid';
type direction = 'up' | 'down' | void
type cellData = { value: String | void, view: String | void }
type State = {
  data: cellData[][],
  sortQueue: {
    type: 'row' | 'column',
    index: number,
    func: (grid: cellData[][]) => cellData[][]
  }[]
}
const createEmptyGrid = () => Array(10).fill('').map(() =>
  Array(10).fill('').map(() => ({
    value: "",
    view: ""
  })))

const sortFuncs = {
  'up': (arr: any[]) => {
    const {
      collect,
      indexCollect
    } = findUnEmpty([...arr]);
    collect.sort((a, b) => a.view - b.view).forEach((ele, index) => {
      arr[indexCollect[index]] = ele
    })
    return arr
  },
  'down': (arr: any[]) => {
    const {
      collect,
      indexCollect
    } = findUnEmpty([...arr]);
    collect.sort((a, b) => b.view - a.view).forEach((ele, index) => {
      arr[indexCollect[index]] = ele
    })
    return arr
  },
}
function findUnEmpty(arr: any[]) {
  const collect: any[] = [];
  const indexCollect: number[] = [];
  arr.forEach((ele, index) => {
    if (ele.view !== "") {
      collect.push(ele)
      indexCollect.push(index)
    }
  })
  return {
    collect,
    indexCollect
  }
}
class App extends React.PureComponent<{}, State> {
  state: State = {
    data: createEmptyGrid(),
    sortQueue: [],
  }

  cellChangeHandle = (rowIndex: number, colIndex: number) => (nextVal: string | void) => {
    this.changeData(rowIndex, colIndex, nextVal || "")
  }
  changeData = (x: number, y: number, val: string) => {
    const { data } = this.state
    data[x][y] = { value: val, view: dealValue2View(val) }
    this.setState({
      data: [...data]
    })
  }
  onSort = (index: number, isRow: boolean) => (direction: direction) => {
    const { sortQueue } = this.state;
    const sortType = isRow ? 'row' : 'column'
    const findedIndex = sortQueue.findIndex(ele => ele.type === sortType && ele.index === index)
    if (!direction) {
      sortQueue.splice(findedIndex, 1)
    } else {
      const nextSortItem = {
        type: sortType as 'row' | 'column',
        index: index,
        func: (grid: any[][]) => sortGrid(grid, index, isRow, sortFuncs[direction as 'up' | 'down'])
      }
      if (findedIndex >= 0) {
        sortQueue[findedIndex] = nextSortItem
      } else {
        sortQueue.push(nextSortItem)
      }
    }
    this.setState({
      sortQueue: [...sortQueue]
    })
  }

  columns = [
    {
      id: 'empty',
      thContent: null,
      tdRender: (rowEle: State["data"][], rowIndex: number) => <SortCell onChange={this.onSort(rowIndex, true)}>{String(rowIndex + 1)}</SortCell>
    },
    ...Array(10).fill(0)
      .map((ele, index) => String.fromCharCode(65 + index))
      .map((word, colIndex) => {
        const tdRender = (rowEle: cellData[], rowIndex: number) =>
          (<Cell
            view={String(rowEle[colIndex].view)}
            value={String(rowEle[colIndex].value)}
            onChange={this.cellChangeHandle(rowIndex, colIndex)}
          />)
        return {
          id: word,
          thContent: <SortCell onChange={this.onSort(colIndex, false)}>{word}</SortCell>,
          tdRender: tdRender
        }
      })
  ]
  get tableData() {
    const { data, sortQueue } = this.state;
    let newData = data
    sortQueue.forEach(({ func }) => {
      newData = func(newData)
    })
    return newData
  }
  render() {
    return <Table data={this.tableData} columns={this.columns} />

  }
}

function dealValue2View(value: string): string {
  if (/^=/.test(value)) {
    try {
      return strEval(value.substr(1))
    } catch (error) {
      console.error(error)
      return value
    }
  }
  return value
}


export default App;

